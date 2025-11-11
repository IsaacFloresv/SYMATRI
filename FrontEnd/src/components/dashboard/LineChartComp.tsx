"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type {
  ChartConfig
} from "@/components/ui/chart"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A line chart with a label"

const chartData = [
  { year: "2020", inicio: 103, durante: 10 },
  { year: "2021", inicio: 120, durante: 20 },
  { year: "2022", inicio: 137, durante: 35 },
  { year: "2023", inicio: 187, durante: 50 },
  { year: "2024", inicio: 209, durante: 38 },
  { year: "2025", inicio: 214, durante: 42 }
]

const chartDataL = [
  { chartTitle: "Totales de Matricula" },
  { periodo: "2020 - 2025" },
  { noteTitle: "Aunmento de Matricula sostenible" },
  { noteDescription: "Mostrando total de matriculas en los ultimos 6 años al inicio y durante el periodo lectivo." }
]


const chartConfig = {
  inicio: {
    label: "inicio",
    color: "var(--chart-1)",
  },
  durante: {
    label: "durante",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export default function LineChartComp() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{chartDataL[0].chartTitle}</CardTitle>
        <CardDescription>{chartDataL[1].periodo}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 13,
              right: 13,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 4)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="inicio"
              type="natural"
              stroke="var(--color-inicio)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-desktop)",
              }}
              activeDot={{
                r: 6,
              }}
            >

              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
            <Line
              dataKey="durante"
              type="natural"
              stroke="var(--color-durante)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-desktop)",
              }}
              activeDot={{
                r: 6,
              }}
            >

              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          {chartDataL[2].noteTitle} <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          {chartDataL[3].noteDescription}
        </div>
      </CardFooter>
    </Card>
  )
}
