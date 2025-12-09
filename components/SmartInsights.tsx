'use client'

import React, { useMemo } from 'react'
import { TrendingUp, TrendingDown, Minus, Calculator } from 'lucide-react'

interface SmartInsightsProps {
    data: any[]
}

export function SmartInsights({ data }: SmartInsightsProps) {
    const insights = useMemo(() => {
        if (!data || data.length === 0) return []

        const columns = Object.keys(data[0])
        const numericColumns = columns.filter(col =>
            data.every(row => !isNaN(parseFloat(row[col])) && isFinite(row[col]))
        )

        return numericColumns.map(col => {
            const values = data.map(row => parseFloat(row[col]))
            const sum = values.reduce((a, b) => a + b, 0)
            const avg = sum / values.length
            const min = Math.min(...values)
            const max = Math.max(...values)

            return {
                column: col,
                sum,
                avg,
                min,
                max
            }
        })
    }, [data])

    if (insights.length === 0) return null

    return (
        <div className="space-y-4">
            <h3 className="text-xs font-bold flex items-center gap-2 text-neon-indigo uppercase tracking-widest mb-4">
                <Calculator className="w-4 h-4" /> Smart Insights
            </h3>

            <div className="grid grid-cols-1 gap-4">
                {insights.map((stat) => (
                    <div key={stat.column} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors backdrop-blur-sm">
                        <h4 className="font-semibold text-sm mb-3 text-white border-b border-white/10 pb-2">{stat.column}</h4>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-400">Total</span>
                                <span className="font-mono text-neon-indigo font-bold text-sm shadow-[0_0_10px_rgba(99,102,241,0.2)]">{stat.sum.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-400">Average</span>
                                <span className="font-mono text-slate-200">{stat.avg.toLocaleString(undefined, { maximumFractionDigits: 1 })}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs pt-2 border-t border-white/5">
                                <span className="text-slate-500 flex items-center gap-1"><TrendingDown className="w-3 h-3 text-pink-500" /> Min</span>
                                <span className="font-mono text-slate-300">{stat.min.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-500 flex items-center gap-1"><TrendingUp className="w-3 h-3 text-emerald-400" /> Max</span>
                                <span className="font-mono text-slate-300">{stat.max.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
