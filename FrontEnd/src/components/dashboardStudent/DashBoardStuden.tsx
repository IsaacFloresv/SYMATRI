"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function StudentDashBoard() {
  return (
    <main className="flex-1 p-8">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-white font-display">
          Panel de Control del Estudiante
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna izquierda */}
        <div className="lg:col-span-2 space-y-8">
          {/* Progreso */}
          <Card className="bg-card text-white">
            <CardHeader>
              <CardTitle className="text-2xl font-bold mb-4">Progreso General</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold mb-2">
                Progreso en el Curso: 75%
              </p>
              <Progress value={75} className="h-4" />
            </CardContent>
          </Card>

          {/* Resumen de Tareas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-white">Resumen de Tareas</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="divide-y divide-border-dark">
                <li className="p-4 flex items-center gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-lg">
                    📘
                  </div>
                  <div className="text-white">
                    <p className="font-semibold">
                      Completar el cuestionario de álgebra
                    </p>
                    <p className="text-sm">
                      Matemáticas - Fecha de entrega: 15 de mayo
                    </p>
                  </div>
                  <Badge className="ml-auto bg-green-500">Completado</Badge>
                </li>
                <li className="p-4 flex items-center gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-lg">
                    📖
                  </div>
                  <div>
                    <p className="font-semibold text-text-light">
                      Investigar sobre la Revolución Francesa
                    </p>
                    <p className="text-sm text-text-dark">
                      Historia - Fecha de entrega: 18 de mayo
                    </p>
                  </div>
                  <Badge className="ml-auto bg-yellow-500">Pendiente</Badge>
                </li>
                <li className="p-4 flex items-center gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-lg">
                    🌌
                  </div>
                  <div>
                    <p className="font-semibold text-text-light">
                      Preparar presentación sobre el sistema solar
                    </p>
                    <p className="text-sm text-text-dark">
                      Ciencias - Fecha de entrega: 20 de mayo
                    </p>
                  </div>
                  <Badge className="ml-auto bg-red-500">Cancelado</Badge>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Columna derecha */}
        <div className="space-y-8">
          {/* Logros */}
          <Card>
            <CardHeader>
              <CardTitle className="text-white">Logros y Badges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-white text-3xl mb-2">
                    🏆
                  </div>
                  <p className="text-sm text-text-light font-semibold">
                    Estudiante del Mes
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl mb-2">
                    🌟
                  </div>
                  <p className="text-sm text-text-light font-semibold">
                    10 Tareas Completadas
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white text-3xl mb-2">
                    🧠
                  </div>
                  <p className="text-sm text-text-light font-semibold">
                    Genio Matemático
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Próximos Eventos */}
          <Card>
            <CardHeader>
              <CardTitle className="text-white">Próximos Eventos</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="divide-y divide-border-dark">
                <li className="p-4 flex items-start gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-lg mt-1">
                    📅
                  </div>
                  <div>
                    <p className="font-semibold text-text-light">
                      Examen parcial de Matemáticas
                    </p>
                    <p className="text-sm text-text-dark">
                      16 de mayo, 10:00 AM
                    </p>
                  </div>
                </li>
                <li className="p-4 flex items-start gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-lg mt-1">
                    👨‍👩‍👧‍👦
                  </div>
                  <div>
                    <p className="font-semibold text-text-light">
                      Reunión de padres y maestros
                    </p>
                    <p className="text-sm text-text-dark">
                      19 de mayo, 2:00 PM
                    </p>
                  </div>
                </li>
                <li className="p-4 flex items-start gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-lg mt-1">
                    🔬
                  </div>
                  <div>
                    <p className="font-semibold text-text-light">
                      Presentación de proyectos de Ciencias
                    </p>
                    <p className="text-sm text-text-dark">
                      22 de mayo, 9:00 AM
                    </p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Acceso Rápido */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="flex-1">Ver Calificaciones</Button>
            <Button variant="outline" className="flex-1">
              Ver Horario de Clases
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}