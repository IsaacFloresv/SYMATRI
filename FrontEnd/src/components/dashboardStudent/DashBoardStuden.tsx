"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuthStorage } from "@/hooks/useAuthStorage"
import { useNavigate } from "react-router-dom"

interface Subject {
  id: number
  name: string
  currentAverage: number
  previousAverage: number
  change: number
  trend: number[]
}

interface Event {
  id: number
  title: string
  date: string
  location: string
  type: "Próximo" | "Feriado"
}

interface Message {
  id: number
  sender: string
  preview: string
  time: string
}

const subjects: Subject[] = [
  { id: 1, name: "Matemáticas", currentAverage: 93.5, previousAverage: 92.0, change: 1.63, trend: [90, 92, 93.5] },
  { id: 2, name: "Lengua Española", currentAverage: 89.0, previousAverage: 90.0, change: -1.11, trend: [91, 90, 89] },
  { id: 3, name: "Ciencias Naturales", currentAverage: 80.5, previousAverage: 81.0, change: -0.62, trend: [78, 81, 80.5] },
  { id: 4, name: "Educación Física", currentAverage: 75.0, previousAverage: 68.0, change: 10.29, trend: [72, 68, 75] },
  { id: 5, name: "Historia", currentAverage: 64.5, previousAverage: 65.0, change: -0.77, trend: [62, 65, 64.5] },
]

const events: Event[] = [
  { id: 1, title: "Feria de Ciencias", date: "18 Nov", location: "Gimnasio, 09:00 - 15:00", type: "Próximo" },
  { id: 2, title: "Día Festivo", date: "20 Nov", location: "Sin actividades escolares", type: "Feriado" },
  { id: 3, title: "Torneo de Fútbol", date: "22 Nov", location: "Campo Principal, 16:00", type: "Próximo" },
]

const messages: Message[] = [
  { id: 1, sender: "Prof. Martínez", preview: "Material para el examen final...", time: "Hace 1h" },
  { id: 2, sender: "Coordinación", preview: "Nuevas reglas de laboratorio", time: "Ayer" },
  { id: 3, sender: "Bibliotecaria", preview: "Libro pendiente de entrega", time: "2 días" },
]

// Datos de ausencias para cálculo dinámico
const absenceData = {
  weekly: 1,
  monthly: 2,
  previousWeek: 0.5,
  previousMonth: 1.5,
}

function AbsenceTrend() {
  const weeklyIncrease = absenceData.weekly > absenceData.previousWeek
  const monthlyIncrease = absenceData.monthly > absenceData.previousMonth
  const trendUp = weeklyIncrease || monthlyIncrease
  
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t border-border/30">
      <span className={`material-symbols-outlined text-lg ${trendUp ? "text-red-500" : "text-green-500"}`}>
        {trendUp ? "trending_up" : "trending_down"}
      </span>
      <p>
        Tendencia: <span className={trendUp ? "text-red-500" : "text-green-500"}>
          {trendUp ? "En aumento" : "En disminución"}
        </span>
      </p>
    </div>
  )
}

function TrendBar({ values }: { values: number[] }) {
  const maxValue = Math.max(...values, 100) // Asegurar que el máximo sea al menos 100 para proporción correcta
  
  return (
    <div className="flex items-end h-8 w-16 gap-1">
      {values.map((value, index) => {
        const heightPercentage = (value / maxValue) * 100
        let color = "bg-red-500"
        
        if (value >= 80 && value <= 100) {
          color = "bg-green-500"
        } else if (value >= 65 && value < 80) {
          color = "bg-yellow-500"
        } else if (value < 65) {
          color = "bg-red-500"
        }
        
        return (
          <div
            key={index}
            className={`w-1/3 rounded-sm ${color}`}
            style={{ height: `${heightPercentage}%` }}
          />
        )
      })}
    </div>
  )
}

function EventIcon({ type }: { type: string }) {
  const iconMap: Record<string, string> = {
    "Feria de Ciencias": "event",
    "Día Festivo": "school",
    "Torneo de Fútbol": "sports_soccer",
  }
  
  return (
    <span className="material-symbols-outlined text-lg">
      {iconMap[type] || "event"}
    </span>
  )
}

function MessageIcon({ sender }: { sender: string }) {
  const iconMap: Record<string, string> = {
    "Prof. Martínez": "mail",
    "Coordinación": "campaign",
    "Bibliotecaria": "edit_note",
  }
  
  return (
    <span className="material-symbols-outlined text-lg">
      {iconMap[sender] || "mail"}
    </span>
  )
}

export default function StudentDashBoard() {
  const navigate = useNavigate();
  const user = useAuthStorage((state) => state.user)
  const userName = user?.datosPersonales?.firstName || "Usuario"

  return (
    <main className="flex-1 px-16 py-4 bg-background">
      <header className="mb-8 text-left">
        <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">
          Resumen Académico, {userName}
        </h1>
      </header>
      
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
            <div className="px-1 flex justify-start">
              <h2 className="text-2xl font-bold text-foreground">Tabla de Rendimiento Académico</h2>
            </div>
          <div className="bg-card border rounded-xl overflow-hidden">
            <CardContent className="p-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-base font-semibold min-w-[100px] px-3">Materia</TableHead>
                      <TableHead className="text-base font-semibold min-w-[60px] px-2 hidden sm:table-cell">
                        <div className="space-y-1">
                          <div>Promedio</div>
                          <div>Actual</div>
                        </div>
                      </TableHead>
                      <TableHead className="text-base font-semibold min-w-[60px] px-2 hidden md:table-cell">
                        <div className="space-y-1">
                          <div>Promedio</div>
                          <div>Anterior</div>
                        </div>
                      </TableHead>
                      <TableHead className="text-base font-semibold min-w-[50px] px-2">
                        <div className="space-y-1">
                          <div>Cambio</div>
                          <div>(%)</div>
                        </div>
                      </TableHead>
                      <TableHead className="text-base font-semibold min-w-[50px] px-2">Tendencia</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subjects.map((subject, index) => (
                      <TableRow
                    key={index}
                    className="cursor-pointer hover:bg-card-dark/40"
                    onClick={() => navigate(`/alumno/calificaciones?materiaId=${subject.id}`)}
                  >
                        <TableCell className="text-white font-medium px-3">
                          <div className="sm:hidden">
                            <div className="text-white font-medium">{subject.name}</div>
                            <div className="text-white/70 text-xs mt-1">
                              {subject.currentAverage} ({subject.change > 0 ? "+" : ""}{subject.change}%)
                            </div>
                          </div>
                          <span className="hidden sm:inline text-white">{subject.name}</span>
                        </TableCell>
                        <TableCell className="text-white font-bold hidden sm:table-cell px-2">{subject.currentAverage}</TableCell>
                        <TableCell className="text-white/60 hidden md:table-cell px-2">{subject.previousAverage}</TableCell>
                        <TableCell className={`${subject.change > 0 ? "text-green-500" : "text-red-500"} font-medium px-2`}>
                          <span className="hidden sm:inline">{subject.change > 0 ? "+" : ""}{subject.change}%</span>
                          <span className="sm:hidden">
                            {subject.change > 0 ? "↑" : "↓"} {Math.abs(subject.change)}%
                          </span>
                        </TableCell>
                        <TableCell className="px-2">
                          <TrendBar values={subject.trend} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Mis Ausencias</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-2xl text-yellow-500">event_note</span>
                    <p className="text-base text-foreground">Semanal:</p>
                  </div>
                  <p className="text-xl font-semibold text-foreground">{absenceData.weekly}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-2xl text-yellow-500">calendar_month</span>
                    <p className="text-base text-foreground">Mensual:</p>
                  </div>
                  <p className="text-xl font-semibold text-foreground">{absenceData.monthly}</p>
                </div>
                <AbsenceTrend />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mi Conducta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-foreground">
                  <span className="material-symbols-outlined text-2xl text-green-500">sentiment_satisfied</span>
                  <p className="text-base">Estado: <span className="font-semibold text-green-500">Excelente</span></p>
                </div>
                <p className="text-sm text-muted-foreground">Has mantenido un comportamiento ejemplar en todas tus clases. ¡Sigue así, Sofía!</p>
                <Button variant="link" className="p-0 h-auto text-primary">
                  Ver méritos y deméritos
                  <span className="material-symbols-outlined text-lg ml-1">arrow_right_alt</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="lg:col-span-1 flex flex-col space-y-4 pt-12">
          <Card>
            <CardHeader>
              <CardTitle>Próximos Eventos</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[350px] overflow-y-auto">
                <ul className="divide-y divide-border-dark">
                  {events.map((event) => (
                    <li key={event.id} className="p-4 flex items-center justify-between hover:bg-card-dark/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/20 text-primary rounded-full size-8 flex items-center justify-center">
                          <EventIcon type={event.title} />
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-sm">{event.date}: {event.title}</p>
                          <p className="text-xs text-muted-foreground">{event.location}</p>
                        </div>
                      </div>
                      <Badge 
                        variant={event.type === "Próximo" ? "default" : "secondary"}
                        className="text-[10px]"
                      >
                        {event.type}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mensajes No Leídos</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[350px] overflow-y-auto">
                <ul className="divide-y divide-border-dark">
                  {messages.map((message) => (
                    <li
                      key={message.id}
                      className="p-4 flex items-center gap-3 hover:bg-card-dark/50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/alumno/comunicaciones?id=${message.id}`)}
                    >
                      <div className="bg-primary/20 text-primary rounded-full size-8 flex items-center justify-center flex-shrink-0">
                        <MessageIcon sender={message.sender} />
                      </div>
                      <div className="overflow-hidden flex-1">
                        <p className="font-medium text-foreground text-sm truncate">{message.sender}</p>
                        <p className="text-xs text-muted-foreground truncate">{message.preview}</p>
                      </div>
                      <span className="ml-auto text-[10px] text-muted-foreground whitespace-nowrap">{message.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
