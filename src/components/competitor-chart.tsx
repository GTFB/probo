'use client'

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from 'recharts'

interface ChartData {
  name: string
  'Дюжина': number
  'WalletFactory': number
  'OSMI Cards': number
  'CardPR': number
}

interface CompetitorChartProps {
  data: ChartData[]
}

export function CompetitorChart({ data }: CompetitorChartProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <RadarChart data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" />
        <PolarRadiusAxis angle={30} domain={[0, 5]} />
        <Radar
          name="Дюжина"
          dataKey="Дюжина"
          stroke="hsl(var(--primary))"
          fill="hsl(var(--primary))"
          fillOpacity={0.2}
        />
        <Radar
          name="WalletFactory"
          dataKey="WalletFactory"
          stroke="hsl(var(--muted-foreground))"
          fill="hsl(var(--muted-foreground))"
          fillOpacity={0.2}
        />
        <Radar
          name="OSMI Cards"
          dataKey="OSMI Cards"
          stroke="hsl(var(--secondary-foreground))"
          fill="hsl(var(--secondary-foreground))"
          fillOpacity={0.2}
        />
        <Radar
          name="CardPR"
          dataKey="CardPR"
          stroke="hsl(var(--accent-foreground))"
          fill="hsl(var(--accent-foreground))"
          fillOpacity={0.2}
        />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  )
}
