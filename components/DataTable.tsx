'use client'

import React, { useState } from 'react'
import { ChevronDown, ChevronUp, Search, SlidersHorizontal } from 'lucide-react'

interface DataTableProps {
    data: any[]
}

export function DataTable({ data }: DataTableProps) {
    const [sortCol, setSortCol] = useState<string | null>(null)
    const [sortAsc, setSortAsc] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')

    if (!data || data.length === 0) return null

    const columns = Object.keys(data[0])

    // Filter
    const filteredData = data.filter(row =>
        columns.some(col => String(row[col]).toLowerCase().includes(searchTerm.toLowerCase()))
    )

    // Sort
    const sortedData = [...filteredData].sort((a, b) => {
        if (!sortCol) return 0
        const valA = a[sortCol]
        const valB = b[sortCol]

        if (valA < valB) return sortAsc ? -1 : 1
        if (valA > valB) return sortAsc ? 1 : -1
        return 0
    })

    const handleSort = (col: string) => {
        if (sortCol === col) {
            setSortAsc(!sortAsc)
        } else {
            setSortCol(col)
            setSortAsc(true)
        }
    }

    return (
        <div className="w-full h-full flex flex-col bg-transparent rounded-xl overflow-hidden">
            {/* Table Toolbar */}
            <div className="flex items-center justify-between p-3 border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                    <SlidersHorizontal className="w-4 h-4" />
                    <span className="font-medium text-neon-indigo">{filteredData.length} rows</span>
                </div>
                <div className="relative">
                    <Search className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="h-8 pl-8 pr-3 text-xs bg-black/20 border border-white/10 rounded-lg text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-neon-indigo w-48 transition-all"
                    />
                </div>
            </div>

            {/* Table Content */}
            <div className="flex-1 overflow-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                <table className="w-full text-sm text-left border-collapse">
                    <thead className="text-xs uppercase bg-black/40 text-slate-500 sticky top-0 backdrop-blur-md z-10 tracking-wider">
                        <tr>
                            {columns.map(col => (
                                <th
                                    key={col}
                                    className="px-4 py-3 font-semibold cursor-pointer hover:text-white transition-colors select-none whitespace-nowrap"
                                    onClick={() => handleSort(col)}
                                >
                                    <div className="flex items-center gap-1">
                                        {col}
                                        {sortCol === col && (
                                            sortAsc ? <ChevronUp className="w-3 h-3 text-neon-indigo" /> : <ChevronDown className="w-3 h-3 text-neon-indigo" />
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="">
                        {sortedData.slice(0, 100).map((row, i) => (
                            <tr key={i} className="hover:bg-white/5 transition-colors group border-b border-white/5 last:border-0">
                                {columns.map(col => (
                                    <td key={`${i}-${col}`} className="px-4 py-3 truncate max-w-[200px] text-slate-400 group-hover:text-slate-200">
                                        {row[col]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {sortedData.length > 100 && (
                    <div className="p-4 text-center text-xs text-slate-600 border-t border-white/5">
                        Showing first 100 rows of {sortedData.length}
                    </div>
                )}
            </div>
        </div>
    )
}
