"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuthStorage } from "@/hooks/useAuthStorage"
import { api } from "@/lib/api"
import { getToken } from "@/lib/authStorage"

interface Event {
    id: string
    title: string
    time: string
    date: string
    type: "meeting" | "class" | "exam" | "assignment" | string
    location?: string
    description?: string
    sourceId?: number | string
    startAt?: string
    endAt?: string
    meta?: any
}

interface DayEvents {
    [date: string]: Event[]
}

const eventsData: DayEvents = {
    "2024-08-07": [
        { id: "evento1", title: "Asamblea Escolar", time: "10:00 AM", date: "2024-08-07", type: "meeting", location: "Auditorio Principal", description: "Asamblea general de inicio de año escolar con presentación de directivos" }
    ],
    "2024-08-25": [
        { id: "evento2", title: "Feria de Ciencias", time: "09:00 AM", date: "2024-08-25", type: "exam", location: "Gimnasio", description: "Presentación de proyectos científicos de los estudiantes" }
    ],
    "2024-09-14": [
        { id: "evento3", title: "Taller de Estudio", time: "03:00 PM", date: "2024-09-14", type: "class", location: "Biblioteca", description: "Técnicas de estudio efectivas para el nuevo semestre" }
    ],
    "2024-09-15": [
        { id: "evento4", title: "Reunión de Padres", time: "06:00 PM", date: "2024-09-15", type: "meeting", location: "Salón de Actos", description: "Reunión trimestral con padres de familia para coordinación académica" }
    ],
    "2024-09-28": [
        { id: "evento5", title: "Parcial de Matemáticas", time: "08:00 AM", date: "2024-09-28", type: "exam", location: "Aula 201", description: "Evaluación de álgebra y geometría" }
    ],
    "2024-10-25": [
        { id: "evento6", title: "Reunión de Padres y Maestros", time: "06:00 PM", date: "2024-10-25", type: "meeting", location: "Auditorio Principal", description: "Reunión trimestral obligatoria para discutir el progreso académico del primer periodo, entrega de boletas y coordinación de los próximos eventos extracurriculares del año escolar 2024-2025." }
    ],
}

const tasksData = [
    { id: "tarea1", title: "Proyecto de Ciencias", dueIn: "2 horas", type: "urgent" },
    { id: "tarea2", title: "Ensayo de Historia", dueIn: "mañana", type: "normal" },
    { id: "tarea3", title: "Ejercicios de Cálculo", dueIn: "3 días", type: "normal" },
]

const examsData = [
    { id: "exam1", title: "Examen de Matemáticas", date: "Mañana", topic: "Álgebra Avanzada", urgency: "high" },
    { id: "exam2", title: "Parcial de Literatura", date: "Viernes", topic: "Análisis de Textos", urgency: "normal" },
]

export default function eventosAlumnos() {
    // Inicializar con la fecha actual para que el calendario muestre el mes actual + siguiente
    const _now = new Date()
    const _todayYMD = `${_now.getFullYear()}-${String(_now.getMonth() + 1).padStart(2, '0')}-${String(_now.getDate()).padStart(2, '0')}`

    const [selectedEvent, setSelectedEvent] = useState<string | null>(null)
    const [selectedDate, setSelectedDate] = useState<string | null>(_todayYMD)
    const [currentMonth, setCurrentMonth] = useState(() => ({
        year: _now.getFullYear(),
        month: _now.getMonth() + 1
    }))

    // unified events state (fetched from API; local sample data kept as fallback)
    const [events, setEvents] = useState<Event[]>([])
    const [loadingEvents, setLoadingEvents] = useState(false)
    const [eventsError, setEventsError] = useState<string | null>(null)
    const session = useAuthStorage((s) => s.user)

    // utilitario: fecha local en formato YYYY-MM-DD (evita desfases por UTC)
    const formatYMD = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

    useEffect(() => {
        const fetchEvents = async () => {
            setLoadingEvents(true)
            setEventsError(null)
            try {
                // range: first day of *previous* month -> last day of next month (cubre las celdas visibles prev/cur/next)
                const prevMonth = currentMonth.month === 1 ? 12 : currentMonth.month - 1
                const prevMonthYear = currentMonth.month === 1 ? currentMonth.year - 1 : currentMonth.year
                const start = `${prevMonthYear}-${String(prevMonth).padStart(2, '0')}-01`
                const nextMonthYear = currentMonth.month === 12 ? currentMonth.year + 1 : currentMonth.year
                const nextMonth = currentMonth.month === 12 ? 1 : currentMonth.month + 1
                const end = `${nextMonthYear}-${String(nextMonth).padStart(2, '0')}-${String(getDaysInMonth(nextMonthYear, nextMonth)).padStart(2, '0')}`

                // no session -> keep local demo data
                if (!session?.id) {
                    const fromEventsData: Event[] = Object.values(eventsData).flat()
                    const fromTasks: Event[] = tasksData.map(t => ({
                        id: t.id,
                        title: t.title,
                        time: t.dueIn,
                        date: formatYMD(new Date()),
                        type: 'assignment' as const,
                        description: `Tarea pendiente — vencimiento: ${t.dueIn}`
                    }))
                    const fromExams: Event[] = examsData.map(e => ({
                        id: e.id,
                        title: e.title,
                        time: e.date,
                        date: formatYMD(new Date()),
                        type: 'exam' as const,
                        description: `Tema: ${e.topic}`
                    }))
                    setEvents([...fromEventsData, ...fromTasks, ...fromExams])
                    setLoadingEvents(false)
                    return
                }

                const token = getToken()
                const urlParams = new URLSearchParams(window.location.search)
                const seccionFromUrl = urlParams.get('seccionId')
                const seccionFromSession = (session as any)?.datosPersonales?.seccionId || (session as any)?.seccionId || null
                const seccionToUse = seccionFromUrl || seccionFromSession
                const paramsObj: Record<string, string> = { start, end }
                if (seccionToUse) paramsObj.seccionId = String(seccionToUse)
                else paramsObj.userId = String(session.id)
                const params = new URLSearchParams(paramsObj)
                const res = await fetch(`${api.baseUrl}/eventos/search?${params.toString()}`, {
                    headers: token ? { Authorization: `Bearer ${token}` } : undefined
                })
                if (!res.ok) throw new Error('Error fetching events')
                const json = await res.json()
                const fetched = (json.events || []).map((ev: any) => ({
                    id: ev.id,
                    title: ev.title,
                    time: ev.time || (ev.startAt ? ev.startAt.split('T')[1] : ''),
                    date: ev.date,
                    type: ev.type as any,
                    location: ev.location,
                    description: ev.description,
                    sourceId: ev.sourceId,
                    startAt: ev.startAt,
                    endAt: ev.endAt,
                    meta: ev.meta
                }))

                const fromTasks: Event[] = tasksData.map(t => ({
                    id: t.id,
                    title: t.title,
                    time: t.dueIn,
                    date: formatYMD(new Date()),
                    type: 'assignment' as const,
                    description: `Tarea pendiente — vencimiento: ${t.dueIn}`
                }))
                const fromExams: Event[] = examsData.map(e => ({
                    id: e.id,
                    title: e.title,
                    time: e.date,
                    date: formatYMD(new Date()),
                    type: 'exam' as const,
                    description: `Tema: ${e.topic}`
                }))

                setEvents([...fetched, ...fromTasks, ...fromExams])
            } catch (err) {
                console.error('Failed to load events', err)
                setEventsError('No fue posible cargar eventos')
                // fallback to local data
                const fromEventsData: Event[] = Object.values(eventsData).flat()
                const fromTasks: Event[] = tasksData.map(t => ({
                    id: t.id,
                    title: t.title,
                    time: t.dueIn,
                    date: formatYMD(new Date()),
                    type: 'assignment' as const,
                    description: `Tarea pendiente — vencimiento: ${t.dueIn}`
                }))
                const fromExams: Event[] = examsData.map(e => ({
                    id: e.id,
                    title: e.title,
                    time: e.date,
                    date: formatYMD(new Date()),
                    type: 'exam' as const,
                    description: `Tema: ${e.topic}`
                }))
                setEvents([...fromEventsData, ...fromTasks, ...fromExams])
            } finally {
                setLoadingEvents(false)
            }
        }

        fetchEvents()
    }, [currentMonth.year, currentMonth.month, session?.id])

    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    const weekDays = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"]

    const getNextMonth = () => {
        setCurrentMonth(prev => ({
            year: prev.month === 12 ? prev.year + 1 : prev.year,
            month: prev.month === 12 ? 1 : prev.month + 1
        }))
    }

    const getPreviousMonth = () => {
        setCurrentMonth(prev => ({
            year: prev.month === 1 ? prev.year - 1 : prev.year,
            month: prev.month === 1 ? 12 : prev.month - 1
        }))
    }

    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month, 0).getDate()
    }

    const getFirstDayOfMonth = (year: number, month: number) => {
        return new Date(year, month - 1, 1).getDay()
    }

    const getDaysForCalendar = (year: number, month: number) => {
        const daysInMonth = getDaysInMonth(year, month)
        const firstDay = getFirstDayOfMonth(year, month)
        const days = []

        // Previous month days
        const prevMonth = month === 1 ? 12 : month - 1
        const prevYear = month === 1 ? year - 1 : year
        const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth)

        for (let i = firstDay - 1; i >= 0; i--) {
            days.push({
                day: daysInPrevMonth - i,
                isCurrentMonth: false,
                date: `${prevYear}-${String(prevMonth).padStart(2, '0')}-${String(daysInPrevMonth - i).padStart(2, '0')}`
            })
        }

        // Current month days
        for (let i = 1; i <= daysInMonth; i++) {
            days.push({
                day: i,
                isCurrentMonth: true,
                date: `${year}-${String(month).padStart(2, '0')}-${String(i).padStart(2, '0')}`
            })
        }

        // Next month days
        const nextMonth = month === 12 ? 1 : month + 1
        const nextYear = month === 12 ? year + 1 : year
        const remainingDays = 42 - days.length

        for (let i = 1; i <= remainingDays; i++) {
            days.push({
                day: i,
                isCurrentMonth: false,
                date: `${nextYear}-${String(nextMonth).padStart(2, '0')}-${String(i).padStart(2, '0')}`
            })
        }

        return days
    }

    const handleDateClick = (date: string) => {
        setSelectedDate(date)
        setSelectedEvent(null) // Reset event selection when date changes
    }

    const getSelectedDateInfo = () => {
        if (!selectedDate) return null

        const date = new Date(selectedDate + 'T00:00:00')
        return {
            formatted: date.toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            events: events.filter(e => e.date === selectedDate)
        }
    }

    const getTodayEvents = () => {
        const today = formatYMD(new Date())
        return events.filter(e => e.date === today)
    }

    const getSelectedDateEvents = () => {
        if (!selectedDate) return []
        return events.filter(e => e.date === selectedDate)
    }

    const Calendar = ({ year, month, isMain = false }: { year: number, month: number, isMain?: boolean }) => {
        const days = getDaysForCalendar(year, month)

        return (
            <Card>
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-center gap-6 text-white w-full">
                        {isMain ? (
                            <>
                                <div className="flex justify-between w-[90%] text-white mb-1">
                                    <Button className="bg-transparent hover:bg-white/10 flex items-center gap-05 p-4 text-sm text-[#717171] hover:text-white transition-colors" onClick={getPreviousMonth} aria-label="Mes anterior">
                                        <span className="material-symbols-outlined text-lg">chevron_left</span>
                                        Mes anterior
                                    </Button>
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-2xl text-white">calendar_month</span>
                                        <CardTitle className="text-lg font-semibold">
                                            {monthNames[month - 1]} {year}
                                        </CardTitle>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex justify-between w-[90%] text-white mb-1">                                    
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-2xl text-white">calendar_month</span>
                                        <CardTitle className="text-lg font-semibold">
                                            {monthNames[month - 1]} {year}
                                        </CardTitle>
                                    </div>
                                    <Button className="flex items-cente justify-end bg-transparent hover:bg-white/10 gap-05 p-4 text-sm text-[#717171] hover:text-white transition-colors" onClick={getNextMonth} aria-label="Mes siguiente">
                                        Mes Siguiente
                                        <span className="material-symbols-outlined text-lg">chevron_right</span>
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-text-dark-secondary uppercase tracking-wider mb-2">
                        {weekDays.map(day => <div key={day}>{day}</div>)}
                    </div>
                    <div className="calendar-grid grid grid-cols-7 gap-1 text-center text-sm text-white">
                        {days.map((dayInfo, index) => {
                            const foundEvent = events.find(e => e.date === dayInfo.date)
                            const hasEvents = !!foundEvent
                            const isSelected = dayInfo.date === selectedDate
                            const isToday = dayInfo.date === formatYMD(new Date())

                            // El contenedor del día (no solo el número) recibe fondo azul + texto blanco para hoy y para la fecha seleccionada.
                            // No usamos bordes para evitar deformaciones del grid.
                            // Usamos un azul explícito para garantizar contraste en modo claro y oscuro.
                            const containerClass = isSelected || isToday ? 'bg-blue-600 text-white dark:bg-blue-500 dark:text-white' : ''
                            const numberClass = isSelected || isToday ? 'text-white font-bold' : ''

                            return (
                                <div
                                    key={index}
                                    className={`relative cursor-pointer transition-colors ${!dayInfo.isCurrentMonth ? 'text-text-dark-secondary/30' : ''} ${containerClass} ${dayInfo.isCurrentMonth && !isSelected && !isToday ? 'hover:bg-white/10' : ''}`}
                                    onClick={() => handleDateClick(dayInfo.date)}
                                >
                                    <span className={numberClass}>
                                        {dayInfo.day}
                                    </span>
                                    {hasEvents && dayInfo.isCurrentMonth && (
                                        <div className={`absolute bottom-1 left-1/2 -translate-x-1/2 size-1 rounded-full ${foundEvent!.type === 'meeting' ? 'bg-yellow-400' :
                                            foundEvent!.type === 'exam' ? 'bg-red-400' :
                                                foundEvent!.type === 'class' ? 'bg-blue-400' :
                                                    'bg-green-400'
                                            }`} />
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>
        )
    }

    const SelectedDateInfo = () => {
        const dateInfo = getSelectedDateInfo()
        if (!dateInfo) return null

        return (
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-primary">calendar_today</span>
                    <h3 className="text-lg font-semibold text-white">
                        {dateInfo.formatted}
                    </h3>
                </div>
                {dateInfo.events.length > 0 && (
                    <div className="space-y-2">
                        <p className="text-sm text-text-dark-secondary">Eventos para este día:</p>
                        {dateInfo.events.map(event => (
                            <div
                                key={event.id}
                                className={`p-3 rounded-lg border-l-4 cursor-pointer transition-colors ${selectedEvent === event.id
                                    ? "bg-blue-400/20 border-blue-400"
                                    : `bg-${event.type === 'meeting' ? 'primary/10 border-primary' :
                                        event.type === 'exam' ? 'red-400/10 border-red-400' :
                                            event.type === 'class' ? 'blue-400/10 border-blue-400' :
                                                'green-400/10 border-green-400'
                                    } hover:bg-${event.type === 'meeting' ? 'primary/20' :
                                        event.type === 'exam' ? 'red-400/20' :
                                            event.type === 'class' ? 'blue-400/20' :
                                                'green-400/20'
                                    }`
                                    }`}
                                onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
                            >
                                <h4 className="text-sm font-semibold text-white truncate">{event.title}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="material-symbols-outlined text-[14px] text-text-dark-secondary">schedule</span>
                                    <span className="text-xs text-text-dark-secondary">{event.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        )
    }

    const EventDetails = () => {
        let selectedEventData: Event | null = null

        if (selectedEvent) {
            // Prefer events from the unified `events` state (API) first
            selectedEventData = events.find(e => e.id === selectedEvent) || null

            // fallback to legacy local lists
            if (!selectedEventData) {
                for (const date in eventsData) {
                    const event = eventsData[date].find(e => e.id === selectedEvent)
                    if (event) {
                        selectedEventData = event
                        break
                    }
                }
            }

            if (!selectedEventData) {
                const task = tasksData.find(t => t.id === selectedEvent)
                if (task) {
                    selectedEventData = {
                        id: task.id,
                        title: task.title,
                        time: task.dueIn,
                        date: formatYMD(new Date()),
                        type: 'assignment',
                        description: `Tarea pendiente — vencimiento: ${task.dueIn}`
                    }
                }
            }

            if (!selectedEventData) {
                const exam = examsData.find(e => e.id === selectedEvent)
                if (exam) {
                    selectedEventData = {
                        id: exam.id,
                        title: exam.title,
                        time: exam.date,
                        date: formatYMD(new Date()),
                        type: 'exam',
                        description: `Tema: ${exam.topic}`
                    }
                }
            }

            if (!selectedEventData && selectedEvent === 'clase-refuerzo') {
                selectedEventData = {
                    id: 'clase-refuerzo',
                    title: 'Clase de Refuerzo',
                    time: '16:30 PM',
                    date: formatYMD(new Date()),
                    type: 'class',
                    description: 'Sesión de refuerzo programada para el grupo.'
                }
            }
        } else if (selectedDate) {
            // prefer events from state, then fallback to local eventsData
            const ev = events.find(e => e.date === selectedDate)
            if (ev) selectedEventData = ev
            else if (eventsData[selectedDate]?.length > 0) selectedEventData = eventsData[selectedDate][0]
        }

        if (!selectedEventData) {
            return (
                <div className="text-center py-12">
                    <span className="material-symbols-outlined text-6xl text-text-dark-secondary/50">event_available</span>
                    <h3 className="text-xl font-semibold text-white mt-4">Selecciona un evento</h3>
                    <p className="text-text-dark-secondary mt-2">Haz clic en un evento del calendario o en las cards para ver los detalles</p>
                </div>
            )
        }

        const eventTypeLabel = {
            meeting: "Institucional",
            exam: "Evaluación",
            class: "Académico",
            assignment: "Tarea"
        }

        return (
            <div className="w-full">
                <div className="mb-6">
                    <Badge variant="secondary" className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-primary/20 text-primary border border-primary/30">
                        {eventTypeLabel[selectedEventData.type]}
                    </Badge>
                    <h4 className="text-3xl font-bold text-white mt-4">{selectedEventData.title}</h4>
                    {selectedEventData.description && (
                        <p className="mt-4 text-text-dark-secondary leading-relaxed text-lg">
                            {selectedEventData.description}
                        </p>
                    )}
                </div>
                <div className="grid grid-cols-1 max-sm:grid-cols-1 sm:grid-cols-2 gap-8 mt-10">
                    <div className="space-y-6">
                        <div className="flex items-start">
                            <div className="bg-white/5 p-2 rounded-lg mr-4">
                                <span className="material-symbols-outlined text-primary text-2xl">calendar_today</span>
                            </div>
                            <div>
                                <p className="text-xs uppercase font-bold text-text-dark-secondary tracking-widest">Fecha y Hora</p>
                                <p className="text-white font-medium text-lg">
                                    {new Date(selectedEventData.date + 'T00:00:00').toLocaleDateString('es-ES', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </p>
                                <p className="text-text-dark-secondary">{selectedEventData.time}</p>
                            </div>
                        </div>
                        {selectedEventData.location && (
                            <div className="flex items-start">
                                <div className="bg-white/5 p-2 rounded-lg mr-4">
                                    <span className="material-symbols-outlined text-primary text-2xl">location_on</span>
                                </div>
                                <div>
                                    <p className="text-xs uppercase font-bold text-text-dark-secondary tracking-widest">Ubicación</p>
                                    <p className="text-white font-medium text-lg">{selectedEventData.location}</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-start">
                            <div className="bg-white/5 p-2 rounded-lg mr-4">
                                <span className="material-symbols-outlined text-primary text-2xl">groups</span>
                            </div>
                            <div>
                                <p className="text-xs uppercase font-bold text-text-dark-secondary tracking-widest">Público Objetivo</p>
                                <p className="text-white font-medium text-lg">Estudiantes</p>
                                <p className="text-text-dark-secondary">Todos los niveles</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="bg-white/5 p-2 rounded-lg mr-4">
                                <span className="material-symbols-outlined text-primary text-2xl">verified</span>
                            </div>
                            <div>
                                <p className="text-xs uppercase font-bold text-text-dark-secondary tracking-widest">Estado</p>
                                <div className="flex items-center gap-2">
                                    <div className="size-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <p className="text-green-500 font-bold">Confirmado</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-12 p-6 rounded-xl bg-primary/5 border border-primary/20">
                    <h5 className="font-bold text-white mb-3 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">info</span>
                        Notas adicionales
                    </h5>
                    <p className="text-sm text-text-dark-secondary leading-relaxed">
                        Se recomienda llegar 15 minutos antes para el registro. El estacionamiento del ala norte estará disponible sin costo para los asistentes.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <main className="flex-1 p-8 overflow-y-auto">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col gap-2 mb-8">
                    <h1 className="text-white text-3xl font-bold tracking-tight">Calendario Escolar</h1>
                    <p className="text-[#92aec9] text-base font-normal">Consulta tus eventos próximos y tareas pendientes.</p>
                </div>
                <div className="grid grid-cols-1 gap-6 max-sm:grid-cols-1 mb-8 sm:grid-cols-2">
                    <Calendar year={currentMonth.year} month={currentMonth.month} isMain={true} />
                    <Calendar
                        year={currentMonth.month === 12 ? currentMonth.year + 1 : currentMonth.year}
                        month={currentMonth.month === 12 ? 1 : currentMonth.month + 1}
                        isMain={false}
                    />
                </div>
                <div className="events-layout grid grid-cols-[1fr_2fr] gap-4 items-start max-[300px]:grid-cols-1">
                    <div className="events-left min-w-0 flex flex-col gap-6">
                        {selectedDate && getSelectedDateEvents().length > 0 && <SelectedDateInfo />}

                        <Card>
                            <CardHeader className="px-4 py-1 bg-white/5 border-b">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 flex-shrink-0">
                                        <span className="material-symbols-outlined text-blue-400 text-lg">event_upcoming</span>
                                        {selectedDate ? 'Eventos del día' : 'Eventos hoy'}
                                        {loadingEvents && <span className="text-[10px] text-text-dark-secondary ml-2">Cargando...</span>}
                                    </CardTitle>
                                    <Badge variant="secondary" className="text-[9px] bg-blue-400/20 text-blue-400 px-2 py-0.5 rounded-full font-bold whitespace-nowrap">
                                        {(selectedDate ? getSelectedDateEvents() : getTodayEvents()).length} EVENTOS
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-3 space-y-3">
                                {(selectedDate ? getSelectedDateEvents() : getTodayEvents()).map(event => (
                                    <div
                                        key={event.id}
                                        className={`p-3 rounded-lg border-l-4 cursor-pointer transition-colors ${selectedEvent === event.id
                                            ? "bg-blue-400/20 border-blue-400"
                                            : event.type === 'meeting' ? "bg-primary/10 border-primary hover:bg-primary/20" :
                                                event.type === 'exam' ? "bg-red-400/10 border-red-400 hover:bg-red-400/20" :
                                                    event.type === 'class' ? "bg-blue-400/10 border-blue-400 hover:bg-blue-400/20" :
                                                        "bg-green-400/10 border-green-400 hover:bg-green-400/20"
                                            }`}
                                        onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
                                    >
                                        <h4 className="text-sm font-semibold text-white truncate">{event.title}</h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="material-symbols-outlined text-[14px] text-text-dark-secondary">schedule</span>
                                            <span className="text-xs text-text-dark-secondary">{event.time}</span>
                                        </div>
                                    </div>
                                ))}
                                {(selectedDate ? getSelectedDateEvents() : getTodayEvents()).length === 0 && (
                                    <p className="text-center text-text-dark-secondary py-4">
                                        {selectedDate ? 'No hay eventos para esta fecha' : 'No hay eventos hoy'}
                                    </p>
                                )}
                                {eventsError && <p className="text-xs text-red-400 mt-2 text-center">{eventsError}</p>}
                                <div
                                    className={`p-3 rounded-lg border-l-4 cursor-pointer transition-colors ${selectedEvent === "clase-refuerzo"
                                        ? "bg-blue-400/20 border-blue-400"
                                        : "bg-white/5 border-gray-500 hover:bg-white/10"
                                        }`}
                                    onClick={() => setSelectedEvent(selectedEvent === "clase-refuerzo" ? null : "clase-refuerzo")}
                                >
                                    <h4 className="text-sm font-semibold text-white truncate">Clase de Refuerzo</h4>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="material-symbols-outlined text-[14px] text-text-dark-secondary">schedule</span>
                                        <span className="text-xs text-text-dark-secondary">16:30 PM</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="px-4 py-1 bg-white/5 border-b">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 flex-shrink-0">
                                        <span className="material-symbols-outlined text-yellow-400 text-lg">assignment_late</span>
                                        Tareas Pendientes
                                    </CardTitle>
                                    <Badge variant="secondary" className="text-[9px] bg-yellow-400/20 text-yellow-400 px-2 py-0.5 rounded-full font-bold whitespace-nowrap">{tasksData.length} HOY</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-3 space-y-2">
                                {events.filter(e => e.type === 'assignment').map(task => (
                                    <div key={task.id} onClick={() => { setSelectedEvent(task.id); setSelectedDate(null); }} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                                        <span className="material-symbols-outlined text-text-dark-secondary group-hover:text-primary">check_box_outline_blank</span>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-white truncate">{task.title}</p>
                                            <p className={`text-[10px] font-medium ${task.time.includes('hora') || task.time.includes('mañana') ? 'text-red-400' : 'text-text-dark-secondary'
                                                }`}>{task.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="px-3 py-1 bg-white/5 border-b">
                                <div className="flex items-center justify-between gap-2">
                                    <CardTitle className="text-[11px] font-bold text-white uppercase tracking-tight flex items-center gap-1.5 flex-1 min-w-0">
                                        <span className="material-symbols-outlined text-red-400 text-[18px] flex-shrink-0">school</span>
                                        <span className="truncate">Próximos Exámenes</span>
                                    </CardTitle>
                                    <Badge variant="destructive" className="text-[9px] bg-red-400/20 text-red-400 px-2 py-0.5 rounded-full font-extrabold whitespace-nowrap flex-shrink-0">{examsData.length} PRONTO</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-3 space-y-3">
                                {events.filter(e => e.type === 'exam').map(exam => (
                                    <div
                                        key={exam.id}
                                        onClick={() => { setSelectedEvent(exam.id); setSelectedDate(null); }}
                                        className={`p-3 rounded-lg cursor-pointer hover:bg-white/10 transition-colors ${exam.time.includes('Mañana') || exam.time.includes('high') ? 'bg-red-400/10 border border-red-400/30 hover:bg-red-400/20' : 'bg-white/5 border border-border-dark'}`}
                                    >
                                        <h4 className="text-sm font-semibold text-white truncate">{exam.title}</h4>
                                        <p className={`text-[10px] mt-1 ${exam.time.includes('Mañana') ? 'text-red-400' : 'text-text-dark-secondary'}`}>{exam.time} {exam.description ? `- ${exam.description.replace('Tema: ', '')}` : ''}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                    <div className="events-right min-w-0">
                        <Card className="flex flex-col h-full min-h-[500px]">
                            <CardHeader className="p-6 border-b">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-primary/20 p-3 rounded-xl">
                                            <span className="material-symbols-outlined text-primary text-3xl">event_available</span>
                                        </div>
                                        <div>
                                            <CardTitle className="text-2xl font-bold text-white">Detalles del Evento</CardTitle>
                                            <p className="text-sm text-text-dark-secondary">Información completa del elemento seleccionado</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="icon" className="h-10 w-10 border-border-dark hover:bg-white/5 text-text-dark-secondary">
                                            <span className="material-symbols-outlined text-xl">share</span>
                                        </Button>
                                        <Button variant="outline" size="icon" className="h-10 w-10 border-border-dark hover:bg-white/5 text-text-dark-secondary">
                                            <span className="material-symbols-outlined text-xl">bookmark</span>
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 sm:p-8 flex-1">
                                <EventDetails />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    )
}       
