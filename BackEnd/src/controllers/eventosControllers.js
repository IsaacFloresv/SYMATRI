const { actividades, horarios, user, dataUser, secciones, seccionAlumnos, materiaProfesor, materias } = require('../database/models')
const { Op, fn, col, where: sqWhere } = require('sequelize')

const parseISODate = (s) => s ? new Date(s + 'T00:00:00') : null
const formatDate = (d) => d.toISOString().split('T')[0]

// fast lookup for Spanish day names (accepts first 3 letters)
const _dayMap = { dom: 0, lun: 1, mar: 2, mie: 3, jue: 4, vie: 5, sab: 6 }
/**
 * Convert Spanish weekday name (full or abbreviated) into numeric weekday (0 = Sunday).
 * Examples: 'Lunes' -> 1, 'mar' -> 2, 'mié' -> 3. Returns null when not recognized.
 */
const dayNameToIndex = (name) => {
  if (!name) return null
  const key = String(name).trim().toLowerCase().slice(0, 3)
  return _dayMap[key] ?? null
} 

/**
 * Return an array of Date objects for each day between startDate and endDate (inclusive).
 * Both arguments must be Date instances (time portion is ignored).
 */
const eachDateInRange = (startDate, endDate) => {
  const dates = []
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) dates.push(new Date(d))
  return dates
} 

/**
 * Normalize an `actividades` DB row into the calendar event shape for a given date.
 * Returns an object with `id`, `title`, `date`, optional `startAt`/`endAt` and `meta`.
 */
const makeActividadEvent = (a, d) => ({
  id: `actividad-${a.id}-${formatDate(d)}`,
  sourceId: a.id,
  title: a.name,
  type: 'meeting',
  date: formatDate(d),
  time: a.horaInicio ?? '',
  startAt: a.horaInicio ? `${formatDate(d)}T${a.horaInicio}` : undefined,
  endAt: a.horaFinal ? `${formatDate(d)}T${a.horaFinal}` : undefined,
  location: a.ubicacion,
  description: a.descripcion ?? '',
  meta: { objetivo: a.objetivo }
}) 

/**
 * Normalize a `horarios` DB row into the calendar event shape for a specific date.
 * Extracts professor and materia names safely (optional nested relations).
 */
const makeHorarioEvent = (h, d) => {
  const profName = `${h.profesor?.datosPersonales?.firstName ?? ''} ${h.profesor?.datosPersonales?.lastName ?? ''}`.trim()
  const materia = h.profesor?.profesorAsignado?.materia?.name ?? ''
  return {
    id: `horario-${h.id}-${formatDate(d)}`,
    sourceId: h.id,
    title: materia ? `Clase - ${materia}` : 'Clase programada',
    type: 'class',
    date: formatDate(d),
    time: h.inicio ?? '',
    startAt: h.inicio ? `${formatDate(d)}T${h.inicio}` : undefined,
    endAt: h.final ? `${formatDate(d)}T${h.final}` : undefined,
    location: h.seccion ? `Sección ${h.seccion.id}` : undefined,
    description: profName ? `Profesor: ${profName}` : undefined,
    meta: { seccionId: h.seccionId }
  }
} 

/**
 * GET /eventos/all
 * Query params:
 *  - seccionId (optional): filter horarios by section
 *  - start, end (optional): date range in 'YYYY-MM-DD' (defaults to today..today+30)
 *
 * Response: { meta: { count }, events: [ { id, title, date, startAt?, endAt?, meta? } ] }
 */
const getAll = async (req, res) => {
  try {
    const { seccionId, start, end } = req.query
    const today = new Date()
    const startDate = parseISODate(start) || new Date(today)
    const endDate = parseISODate(end) || new Date(new Date(today).setDate(today.getDate() + 30))

    const actividadesWhere = {
      [Op.and]: [
        { fechaInicio: { [Op.lte]: formatDate(endDate) } },
        { fechaFinal: { [Op.gte]: formatDate(startDate) } }
      ]
    }

    const horariosWhere = seccionId ? { seccionId } : {}

    // run DB queries in parallel
    const [actividadRows, horarioRows] = await Promise.all([
      actividades.findAll({
        where: actividadesWhere,
        attributes: ['id', 'name', 'descripcion', 'fechaInicio', 'fechaFinal', 'horaInicio', 'horaFinal', 'ubicacion', 'objetivo', 'periodo']
      }),
      horarios.findAll({
        where: horariosWhere,
        include: [
          { model: secciones, as: 'seccion', attributes: ['id', 'name'] },
          {
            model: user,
            as: 'profesor',
            attributes: ['id'],
            include: [
              { model: dataUser, as: 'datosPersonales', attributes: ['firstName', 'lastName'] },
              { model: materiaProfesor, as: 'profesorAsignado', include: [{ model: materias, as: 'materia', attributes: ['name'] }] }
            ]
          }
        ]
      })
    ])

    const actividadEvents = actividadRows.flatMap(a => {
      const from = parseISODate(formatDate(new Date(a.fechaInicio)))
      const to = parseISODate(formatDate(new Date(a.fechaFinal || a.fechaInicio)))
      const overlapStart = from > startDate ? from : startDate
      const overlapEnd = to < endDate ? to : endDate
      if (overlapStart > overlapEnd) return []
      return eachDateInRange(overlapStart, overlapEnd).map(d => makeActividadEvent(a, d))
    })

    const allDates = eachDateInRange(startDate, endDate)

    const horarioEvents = horarioRows.flatMap(h => {
      const weekday = dayNameToIndex(h.dia)
      if (weekday === null) return []
      return allDates.filter(d => d.getDay() === weekday).map(d => makeHorarioEvent(h, d))
    })

    let combined = [...actividadEvents, ...horarioEvents]

    if (seccionId) {
      combined = combined.filter(ev => (ev.meta?.seccionId ? String(ev.meta.seccionId) === String(seccionId) : true))
    }

    res.json({ meta: { count: combined.length }, events: combined })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'No fue posible obtener eventos', res: false })
  }
}

/**
 * Search events (expanded) by userId OR seccionId.
 * - Query params: userId, seccionId, start, end
 * - Returns the same expanded event shape as `getAll` but filtered.
 */
const search = async (req, res) => {
  try {
    const { userId, seccionId, start, end } = req.query
    if (!userId && !seccionId) return res.status(400).json({ message: 'Se requiere userId o seccionId', res: false })

    const today = new Date()
    const startDate = parseISODate(start) || new Date(today)
    const endDate = parseISODate(end) || new Date(new Date(today).setDate(today.getDate() + 30))

    // ACTIVIDADES: date overlap + (userId OR seccion match via JSON seccionesId)
    const actividadesWhere = {
      [Op.and]: [
        { fechaInicio: { [Op.lte]: formatDate(endDate) } },
        { fechaFinal: { [Op.gte]: formatDate(startDate) } }
      ]
    }

    const actOr = []

    // Try to resolve whether the provided userId is a student and if so, collect their section(s).
    let resolvedSeccionIds = []
    if (userId) {
      actOr.push({ userId: Number(userId) })
      const seccionAlumnosRows = await seccionAlumnos.findAll({ where: { alumnoId: Number(userId) }, attributes: ['seccionId'], raw: true })
      resolvedSeccionIds = seccionAlumnosRows.map(r => r.seccionId).filter(Boolean)
    }

    if (seccionId) resolvedSeccionIds.push(Number(seccionId))

    if (resolvedSeccionIds.length) {
      const seccionesRows = await secciones.findAll({ where: { id: resolvedSeccionIds }, attributes: ['id', 'name'], raw: true })
      seccionesRows.forEach(sec => {
        if (!sec) return
        // Try matching both the stored section name (old format) and numeric section id (new format)
        actOr.push(sqWhere(fn('JSON_CONTAINS', col('seccionesId'), JSON.stringify(sec.name)), 1))
        actOr.push(sqWhere(fn('JSON_CONTAINS', col('seccionesId'), JSON.stringify(sec.id)), 1))
      })
    }

    if (actOr.length) actividadesWhere[Op.and].push({ [Op.or]: actOr })

    // HORARIOS: filter where seccionId OR profesorId matches (OR logic)
    const horarioWhere = {}
    const horOr = []
    if (userId) horOr.push({ profesorId: Number(userId) })
    if (resolvedSeccionIds.length) horOr.push({ seccionId: { [Op.in]: resolvedSeccionIds } })
    if (horOr.length) horarioWhere[Op.or] = horOr

    const [actividadRows, horarioRows] = await Promise.all([
      actividades.findAll({ where: actividadesWhere, attributes: ['id', 'name', 'descripcion', 'fechaInicio', 'fechaFinal', 'horaInicio', 'horaFinal', 'ubicacion', 'objetivo', 'periodo', 'seccionesId', 'userId'] }),
      horarios.findAll({
        where: horarioWhere,
        include: [
          { model: secciones, as: 'seccion', attributes: ['id', 'name'] },
          {
            model: user,
            as: 'profesor',
            attributes: ['id'],
            include: [
              { model: dataUser, as: 'datosPersonales', attributes: ['firstName', 'lastName'] },
              { model: materiaProfesor, as: 'profesorAsignado', include: [{ model: materias, as: 'materia', attributes: ['name'] }] }
            ]
          }
        ]
      })
    ])

    const actividadEvents = actividadRows.flatMap(a => {
      const from = parseISODate(formatDate(new Date(a.fechaInicio)))
      const to = parseISODate(formatDate(new Date(a.fechaFinal || a.fechaInicio)))
      const overlapStart = from > startDate ? from : startDate
      const overlapEnd = to < endDate ? to : endDate
      if (overlapStart > overlapEnd) return []
      return eachDateInRange(overlapStart, overlapEnd).map(d => makeActividadEvent(a, d))
    })

    const allDates = eachDateInRange(startDate, endDate)
    const horarioEvents = horarioRows.flatMap(h => {
      const weekday = dayNameToIndex(h.dia)
      if (weekday === null) return []
      return allDates.filter(d => d.getDay() === weekday).map(d => makeHorarioEvent(h, d))
    })

    const combined = [...actividadEvents, ...horarioEvents]
    res.json({ meta: { count: combined.length }, events: combined })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'No fue posible buscar eventos', res: false })
  }
}

module.exports = { getAll, search }

