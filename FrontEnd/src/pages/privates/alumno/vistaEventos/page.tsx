"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Event {
    id: string
    title: string
    time: string
    date: string
    type: "meeting" | "class" | "exam" | "assignment"
    location?: string
    description?: string
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
    const [selectedEvent, setSelectedEvent] = useState<string | null>(null)
    const [selectedDate, setSelectedDate] = useState<string | null>(null)
    const [currentMonth, setCurrentMonth] = useState({
        year: 2024,
        month: 8 // Agosto
    })

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

    const handleDateClick = (date: string, isCurrentMonth: boolean) => {
        if (isCurrentMonth) {
            setSelectedDate(date)
            setSelectedEvent(null) // Reset event selection when date changes
        }
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
            events: eventsData[selectedDate] || []
        }
    }

    const getTodayEvents = () => {
        const today = new Date().toISOString().split('T')[0]
        return eventsData[today] || []
    }

    const getSelectedDateEvents = () => {
        if (!selectedDate) return []
        return eventsData[selectedDate] || []
    }

    const Calendar = ({ year, month, isMain = false }: { year: number, month: number, isMain?: boolean }) => {
        const days = getDaysForCalendar(year, month)

        return (
            <Card>
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between text-white">
                        <CardTitle className="text-lg font-semibold flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">event</span>
                            {monthNames[month - 1]} {year}
                        </CardTitle>
                        <div className="flex gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="p-1 hover:bg-white/10 rounded"
                                onClick={() => isMain ? getPreviousMonth() : null}
                                disabled={!isMain}
                            >
                                <span className="material-symbols-outlined">chevron_left</span>
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="p-1 hover:bg-white/10 rounded"
                                onClick={() => isMain ? getNextMonth() : null}
                                disabled={!isMain}
                            >
                                <span className="material-symbols-outlined">chevron_right</span>
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-text-dark-secondary uppercase tracking-wider mb-2">
                        {weekDays.map(day => <div key={day}>{day}</div>)}
                    </div>
                    <div className="calendar-grid grid grid-cols-7 gap-1 text-center text-sm text-white">
                        {days.map((dayInfo, index) => {
                            const hasEvents = eventsData[dayInfo.date] && eventsData[dayInfo.date].length > 0
                            const isSelected = dayInfo.date === selectedDate
                            const isToday = dayInfo.date === new Date().toISOString().split('T')[0]

                            return (
                                <div
                                    key={index}
                                    className={`relative cursor-pointer transition-colors ${!dayInfo.isCurrentMonth ? 'text-text-dark-secondary/30' : ''
                                        } ${isSelected ? 'bg-primary text-white' : ''} ${isToday ? 'bg-primary/20 text-primary font-bold' : ''
                                        } ${dayInfo.isCurrentMonth && !isSelected && !isToday ? 'hover:bg-white/10' : ''}`}
                                    onClick={() => handleDateClick(dayInfo.date, dayInfo.isCurrentMonth)}
                                >
                                    <span className={isToday && !isSelected ? 'bg-primary rounded-full size-8 flex items-center justify-center' : ''}>
                                        {dayInfo.day}
                                    </span>
                                    {hasEvents && dayInfo.isCurrentMonth && (
                                        <div className={`absolute bottom-1 left-1/2 -translate-x-1/2 size-1 rounded-full ${eventsData[dayInfo.date]![0].type === 'meeting' ? 'bg-yellow-400' :
                                                eventsData[dayInfo.date]![0].type === 'exam' ? 'bg-red-400' :
                                                    eventsData[dayInfo.date]![0].type === 'class' ? 'bg-blue-400' :
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
            // Find event by id
            for (const date in eventsData) {
                const event = eventsData[date].find(e => e.id === selectedEvent)
                if (event) {
                    selectedEventData = event
                    break
                }
            }
        } else if (selectedDate && eventsData[selectedDate]?.length > 0) {
            // Show first event of selected date
            selectedEventData = eventsData[selectedDate][0]
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
            <div className="max-w-3xl">
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
                <div className="grid grid-cols-1 gap-4 max-sm:grid-cols-1 sm:grid-cols-12">
                    <div className="sm:col-span-4 flex flex-col gap-6">
                        {selectedDate && getSelectedDateEvents().length > 0 && <SelectedDateInfo />}
                        
                        <Card>
                            <CardHeader className="px-4 py-1 bg-white/5 border-b">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 flex-shrink-0">
                                        <span className="material-symbols-outlined text-blue-400 text-lg">event_upcoming</span>
                                        {selectedDate ? 'Eventos del día' : 'Eventos hoy'}
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
                                        className={`p-3 rounded-lg border-l-4 cursor-pointer transition-colors ${
                                            selectedEvent === event.id 
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
                                {(!selectedDate ? getTodayEvents() : getSelectedDateEvents()).length === 0 && (
                                    <p className="text-center text-text-dark-secondary py-4">
                                        {selectedDate ? 'No hay eventos para esta fecha' : 'No hay eventos hoy'}
                                    </p>
                                )}
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
                                {tasksData.map(task => (
                                    <div key={task.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                                        <span className="material-symbols-outlined text-text-dark-secondary group-hover:text-primary">check_box_outline_blank</span>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-white truncate">{task.title}</p>
                                            <p className={`text-[10px] font-medium ${
                                                task.type === 'urgent' ? 'text-red-400' : 'text-text-dark-secondary'
                                            }`}>{task.dueIn}</p>
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
                                {examsData.map(exam => (
                                    <div 
                                        key={exam.id}
                                        className={`p-3 rounded-lg cursor-pointer hover:bg-white/10 transition-colors ${
                                            exam.urgency === 'high' 
                                                ? 'bg-red-400/10 border border-red-400/30 hover:bg-red-400/20' 
                                                : 'bg-white/5 border border-border-dark'
                                        }`}
                                    >
                                        <h4 className="text-sm font-semibold text-white truncate">{exam.title}</h4>
                                        <p className={`text-[10px] mt-1 ${
                                            exam.urgency === 'high' ? 'text-red-400' : 'text-text-dark-secondary'
                                        }`}>{exam.date} - {exam.topic}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                                </div>
                                <div 
                                    className={`p-3 rounded-lg border-l-4 cursor-pointer transition-colors ${
                                        selectedEvent === "clase-refuerzo" 
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
                        <Card className="py-0">
                            <CardHeader className="px-4 py-5 bg-white/5 border-b">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-xs font-bold text-white tracking-wider flex items-center gap-2 flex-shrink-0">
                                        <span className="material-symbols-outlined text-yellow-400 text-lg">assignment_late</span>
                                        Tareas Pendientes
                                    </CardTitle>
                                    <Badge variant="secondary" className="text-[9px] bg-yellow-400/20 text-yellow-400 px-2 py-0.5 rounded-full font-bold whitespace-nowrap">3 HOY</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-3 space-y-2">
                                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                                    <span className="material-symbols-outlined text-text-dark-secondary group-hover:text-primary">check_box_outline_blank</span>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-white truncate">Proyecto de Ciencias</p>
                                        <p className="text-[10px] text-red-400 font-medium">Vence en 2 horas</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                                    <span className="material-symbols-outlined text-text-dark-secondary group-hover:text-primary">check_box_outline_blank</span>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-white truncate">Ensayo de Historia</p>
                                        <p className="text-[10px] text-text-dark-secondary">Vence mañana</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                                    <span className="material-symbols-outlined text-text-dark-secondary group-hover:text-primary">check_box_outline_blank</span>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-white truncate">Ejercicios de Cálculo</p>
                                        <p className="text-[10px] text-text-dark-secondary">Vence en 3 días</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="py-0">
                            <CardHeader className="px-4 py-5 bg-white/5 border-b">
                                <div className="flex items-center justify-between gap-2">
                                    <CardTitle className="text-[11px] font-bold text-white tracking-tight flex items-center gap-1.5 flex-1 min-w-0">
                                        <span className="material-symbols-outlined text-red-400 text-[18px] flex-shrink-0">school</span>
                                        <span className="truncate">Próximos Exámenes</span>
                                    </CardTitle>
                                    <Badge variant="destructive" className="text-[9px] bg-red-400/20 text-red-400 px-2 py-0.5 rounded-full font-extrabold whitespace-nowrap flex-shrink-0">2 PRONTO</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-3 space-y-3">
                                <div className="p-3 rounded-lg bg-red-400/10 border border-red-400/30 cursor-pointer hover:bg-red-400/20 transition-colors">
                                    <h4 className="text-sm font-semibold text-white truncate">Examen de Matemáticas</h4>
                                    <p className="text-[10px] text-red-400 font-medium mt-1">Mañana - Álgebra Avanzada</p>
                                </div>
                                <div className="p-3 rounded-lg bg-white/5 border border-border-dark cursor-pointer hover:bg-white/10 transition-colors">
                                    <h4 className="text-sm font-semibold text-white truncate">Parcial de Literatura</h4>
                                    <p className="text-[10px] text-text-dark-secondary mt-1">Viernes - Análisis de Textos</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div >
        <div className="sm:col-span-8">
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
                <CardContent className="p-8 flex-1">
                    <EventDetails />
                </CardContent>
            </Card>
        </div>
                </div >
            </div >
        </main >
    )
}       
