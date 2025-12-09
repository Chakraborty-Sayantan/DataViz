'use client'

import React from 'react'
import {
    LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, ScatterChart, Scatter,
    XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'

import { cn } from '@/lib/utils'

export type ChartType = 'line' | 'bar' | 'area' | 'pie' | 'scatter'

export interface ChartConfig {
    type: ChartType
    title: string
    description?: string
    xAxisKey: string
    series: Array<{
        key: string
        color: string
        name?: string
    }>
}

interface ChartRendererProps {
    data: any[]
    config: ChartConfig
    className?: string
}

import { ChartToolbar } from './ChartToolbar'
import { useState, useEffect } from 'react'

interface ChartRendererProps {
    data: any[]
    config: ChartConfig
    className?: string
    role?: string
}

import html2canvas from 'html2canvas'
import { useRef } from 'react'

export function ChartRenderer({ data, config, className }: ChartRendererProps) {
    const { title, description, xAxisKey, series } = config
    const [chartType, setChartType] = useState<ChartType>(config.type)
    const [showGrid, setShowGrid] = useState(true)
    const chartRef = useRef<HTMLDivElement>(null)

    // Sync initial config type
    useEffect(() => {
        if (config.type) setChartType(config.type)
    }, [config.type])

    const handleExport = async () => {
        if (chartRef.current) {
            const canvas = await html2canvas(chartRef.current, { backgroundColor: '#1e1e1e' }) // Force dark bg
            const link = document.createElement('a')
            link.download = `${title.replace(/\s+/g, '_').toLowerCase()}_chart.png`
            link.href = canvas.toDataURL()
            link.click()
        }
    }

    const renderChart = () => {
        const NEON_PALETTE = ['#6366f1', '#8b5cf6', '#d946ef', '#06b6d4', '#10b981', '#f59e0b']

        const CommonAxis = () => (
            <>
                {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.08)" />}
                <XAxis
                    dataKey={xAxisKey}
                    className="text-xs text-slate-300 font-medium"
                    tick={{ fill: '#cbd5e1' }}
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                />
                {!chartType.includes('pie') && (
                    <YAxis
                        className="text-xs text-slate-300 font-medium"
                        tick={{ fill: '#cbd5e1' }}
                        tickLine={false}
                        axisLine={false}
                        dx={-10}
                    />
                )}
                <Tooltip
                    contentStyle={{
                        backgroundColor: 'rgba(15, 23, 42, 0.9)',
                        borderColor: 'rgba(255,255,255,0.1)',
                        borderRadius: '12px',
                        backdropFilter: 'blur(8px)',
                        boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)',
                        color: '#f8fafc'
                    }}
                    itemStyle={{ color: '#e2e8f0' }}
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                />
                <Legend
                    wrapperStyle={{ paddingTop: '20px' }}
                    formatter={(value) => <span style={{ color: '#cbd5e1' }}>{value}</span>}
                />
            </>
        )

        switch (chartType) {
            case 'line':
                return (
                    <LineChart data={data}>
                        <CommonAxis />
                        {series.map((s, i) => (
                            <Line
                                key={s.key}
                                type="monotone"
                                dataKey={s.key}
                                stroke={s.color || NEON_PALETTE[i % NEON_PALETTE.length]}
                                strokeWidth={3}
                                dot={false}
                                activeDot={{ r: 6, fill: '#fff', strokeWidth: 0 }}
                                name={s.name || s.key}
                            />
                        ))}
                    </LineChart>
                )
            case 'bar':
                return (
                    <BarChart data={data} barGap={4}>
                        <CommonAxis />
                        {series.map((s, i) => (
                            <Bar
                                key={s.key}
                                dataKey={s.key}
                                fill={s.color || NEON_PALETTE[i % NEON_PALETTE.length]}
                                radius={[4, 4, 0, 0]}
                                name={s.name || s.key}
                                maxBarSize={60}
                            />
                        ))}
                    </BarChart>
                )
            case 'area':
                return (
                    <AreaChart data={data}>
                        <defs>
                            {series.map((s, i) => {
                                const color = s.color || NEON_PALETTE[i % NEON_PALETTE.length]
                                return (
                                    <linearGradient key={s.key} id={`gradient-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                                        <stop offset="95%" stopColor={color} stopOpacity={0} />
                                    </linearGradient>
                                )
                            })}
                        </defs>
                        <CommonAxis />
                        {series.map((s, i) => {
                            const color = s.color || NEON_PALETTE[i % NEON_PALETTE.length]
                            return (
                                <Area
                                    key={s.key}
                                    type="monotone"
                                    dataKey={s.key}
                                    stroke={color}
                                    fill={`url(#gradient-${s.key})`}
                                    strokeWidth={3}
                                    name={s.name || s.key}
                                />
                            )
                        })}
                    </AreaChart>
                )
            case 'pie':
                const pieKey = series[0].key
                return (
                    <PieChart>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#0f172a',
                                borderColor: 'rgba(255,255,255,0.1)',
                                borderRadius: '12px',
                                color: '#f8fafc'
                            }}
                            itemStyle={{ color: '#e2e8f0' }}
                        />
                        <Legend
                            wrapperStyle={{ paddingTop: '20px' }}
                            formatter={(value) => <span style={{ color: '#94a3b8' }}>{value}</span>}
                        />
                        <Pie
                            data={data}
                            dataKey={pieKey}
                            nameKey={xAxisKey}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={series[index % series.length]?.color || NEON_PALETTE[index % NEON_PALETTE.length]}
                                />
                            ))}
                        </Pie>
                    </PieChart>
                )
            case 'scatter':
                return (
                    <ScatterChart>
                        <CommonAxis />
                        <ZAxis type="number" range={[50, 400]} />
                        {series.map((s, i) => (
                            <Scatter
                                key={s.key}
                                name={s.name || s.key}
                                data={data.map(d => ({
                                    ...d,
                                    x: d[xAxisKey],
                                    y: d[s.key],
                                    [xAxisKey]: d[xAxisKey] // Ensure xKey exists for Axis
                                }))}
                                fill={s.color || NEON_PALETTE[i % NEON_PALETTE.length]}
                                line
                                lineType="fitting"
                                shape="circle"
                            />
                        ))}
                    </ScatterChart>
                )
            default:
                return null
        }
    }

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return <div className="p-6 flex items-center justify-center h-[300px] text-muted-foreground">Loading chart...</div>

    return (
        <div ref={chartRef} className={cn("rounded-xl border-none bg-transparent text-white shadow-none w-full p-6 flex flex-col", className)}>
            <div className="flex justify-between items-start mb-6">
                <div className="flex flex-col space-y-1.5">
                    <h3 className="font-semibold leading-none tracking-tight">{title}</h3>
                    {description && <p className="text-sm text-muted-foreground">{description}</p>}
                </div>
                <ChartToolbar
                    chartType={chartType}
                    onTypeChange={setChartType}
                    showGrid={showGrid}
                    onToggleGrid={() => setShowGrid(!showGrid)}
                    onExport={handleExport}
                />
            </div>

            <div className="flex-1 w-full min-h-[300px] min-w-0">
                <ResponsiveContainer width="100%" height="100%">
                    {renderChart()}
                </ResponsiveContainer>
            </div>
        </div>
    )
}
