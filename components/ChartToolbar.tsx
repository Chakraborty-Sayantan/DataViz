'use client'

import React from 'react'
import { BarChart2, LineChart, PieChart, Activity, Grid3X3, Type, Download, ScatterChart } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChartToolbarProps {
    chartType: 'bar' | 'line' | 'area' | 'pie' | 'scatter'
    onTypeChange: (type: 'bar' | 'line' | 'area' | 'pie' | 'scatter') => void
    showGrid: boolean
    onToggleGrid: () => void
    onExport?: () => void
}

export function ChartToolbar({ chartType, onTypeChange, showGrid, onToggleGrid, onExport }: ChartToolbarProps) {
    return (
        <div className="flex items-center gap-2 p-1.5 bg-card/60 border border-border/50 rounded-lg shadow-sm backdrop-blur-sm">
            {/* Chart Types */}
            <div className="flex items-center gap-1 pr-2 border-r border-border/50">
                <button
                    onClick={() => onTypeChange('bar')}
                    className={cn("p-1.5 rounded-md transition-all hover:bg-muted focus:outline-none", chartType === 'bar' ? "bg-primary/20 text-primary shadow-sm" : "text-muted-foreground")}
                    title="Bar Chart"
                >
                    <BarChart2 className="w-4 h-4" />
                </button>
                <button
                    onClick={() => onTypeChange('line')}
                    className={cn("p-1.5 rounded-md transition-all hover:bg-muted focus:outline-none", chartType === 'line' ? "bg-primary/20 text-primary shadow-sm" : "text-muted-foreground")}
                    title="Line Chart"
                >
                    <LineChart className="w-4 h-4" />
                </button>
                <button
                    onClick={() => onTypeChange('area')}
                    className={cn("p-1.5 rounded-md transition-all hover:bg-muted focus:outline-none", chartType === 'area' ? "bg-primary/20 text-primary shadow-sm" : "text-muted-foreground")}
                    title="Area Chart"
                >
                    <Activity className="w-4 h-4" />
                </button>
                <button
                    onClick={() => onTypeChange('pie')}
                    className={cn("p-1.5 rounded-md transition-all hover:bg-muted focus:outline-none", chartType === 'pie' ? "bg-primary/20 text-primary shadow-sm" : "text-muted-foreground")}
                    title="Pie Chart"
                >
                    <PieChart className="w-4 h-4" />
                </button>
                <button
                    onClick={() => onTypeChange('scatter')}
                    className={cn("p-1.5 rounded-md transition-all hover:bg-muted focus:outline-none", chartType === 'scatter' ? "bg-primary/20 text-primary shadow-sm" : "text-muted-foreground")}
                    title="Scatter Plot"
                >
                    <ScatterChart className="w-4 h-4" />
                </button>
            </div>

            {/* Options */}
            <div className="flex items-center gap-1">
                <button
                    onClick={onToggleGrid}
                    className={cn("p-1.5 rounded-md transition-all hover:bg-muted focus:outline-none", showGrid ? "bg-white/10 text-foreground" : "text-muted-foreground")}
                    title="Toggle Grid"
                >
                    <Grid3X3 className="w-4 h-4" />
                </button>
                <div className="w-[1px] h-4 bg-border/50 mx-1" />
                <button
                    className="p-1.5 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-all focus:outline-none"
                    title="Export Image"
                    onClick={onExport}
                >
                    <Download className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}
