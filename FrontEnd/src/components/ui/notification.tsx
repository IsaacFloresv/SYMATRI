import { Card, CardContent } from "@/components/ui/card"

export function AchievementToast() {
  return (
    <Card className="fixed bottom-8 right-8 bg-blue-600 text-white shadow-lg animate-bounce">
      <CardContent className="flex items-center gap-3 p-4">
        {/* Icono */}
        <span className="material-symbols-outlined text-3xl">celebration</span>

        {/* Texto */}
        <div>
          <p className="font-bold text-lg">¡Nuevo Logro Desbloqueado!</p>
          <p className="text-sm">
            "¡Estudiante del Mes!" por tu excelente desempeño.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}