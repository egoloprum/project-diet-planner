'use client'

import { FC } from 'react'
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts'

import { WeightTracker } from '@/src/entities/weightTracker'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/src/shared/ui/chart'

interface WeightChartProps {
  weights: WeightTracker[]
}

const chartConfig = {
  weight: {
    label: 'Weight',
    color: 'oklch(62.7% 0.265 303.9)'
  }
} satisfies ChartConfig

export const WeightChart: FC<WeightChartProps> = ({ weights }) => {
  const processedData = weights
    .map(weight => {
      const date = new Date(weight.date)
      const day = date.toLocaleDateString('en-US', { weekday: 'short' })
      return { day, weight: weight.weight }
    })
    .reverse()

  return (
    <div className="flex flex-col gap-4 overflow-x-auto sm:max-w-[350px]">
      <p className="text-lg sm:text-xl md:text-2xl underline underline-offset-2 decoration-green-300 select-none">
        Weight tracker
      </p>
      <span className="text-gray-500 text-sm sm:text-base">
        Tracker is only for last 7 days instances. The days user skipped
        automatically get filled as last day&apos;s value.
      </span>
      <ChartContainer
        config={chartConfig}
        className="min-h-[200px] max-h-[300px] w-full aspect-square sm:aspect-video sm:max-w-[350px]">
        <BarChart
          accessibilityLayer
          data={processedData}
          margin={{
            top: 20
          }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 12 }}
            interval={0}
            angle={-45}
            textAnchor="end"
          />
          <ChartTooltip
            content={<ChartTooltipContent labelKey="day" nameKey="weight" />}
          />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="weight" fill="var(--color-weight)" radius={4}>
            <LabelList
              position="top"
              offset={12}
              className="fill-foreground"
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  )
}
