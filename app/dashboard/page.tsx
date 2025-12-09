'use client'

import React, { useState } from 'react'
import { FileUploader } from '@/components/FileUploader'
import { ChartRenderer } from '@/components/ChartRenderer'
import { ChatInterface } from '@/components/ChatInterface'
import { DataTable } from '@/components/DataTable'
import { SmartInsights } from '@/components/SmartInsights'
import { useAgent } from '@/hooks/useAgent'
import { cn } from '@/lib/utils'
import { BackgroundSpotlight } from '@/components/Spotlight'
import Link from 'next/link'

export default function Dashboard() {
    const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart')
    const {
        file,
        data,
        messages,
        input,
        chartConfig,
        isThinking,
        handleInputChange,
        handleFileUpload,
        handleSubmit,
        resetSession
    } = useAgent()

    return (
        <main className="flex h-screen bg-deep-slate overflow-hidden relative font-sans text-white selection:bg-neon-indigo/30">
            {/* Spotlight Effect */}
            <BackgroundSpotlight />

            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-neon-indigo/5 blur-[100px] pointer-events-none" />

            {/* Main Dashboard Area */}
            <div className="flex-1 flex flex-col p-6 gap-6 overflow-y-auto relative z-10 scrollbar-thin">
                <header className="flex items-center justify-between pb-4 border-b border-white/10">
                    <Link href="/" className="group">
                        <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-neon-indigo to-neon-violet bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">DataViz Dashboard</h1>
                        <p className="text-slate-400 text-sm">AI-Powered Insights</p>
                    </Link>
                    {file && (
                        <button
                            onClick={resetSession}
                            className="text-xs font-medium text-red-400 hover:bg-red-400/10 px-3 py-1.5 rounded-full transition-colors border border-transparent hover:border-red-400/20"
                        >
                            Reset Session
                        </button>
                    )}
                </header>

                {!file && (
                    <div className="flex-1 flex flex-col items-center justify-center gap-8">
                        <div className="w-full max-w-xl animate-in zoom-in-95 duration-500">
                            <div className="p-1 rounded-3xl bg-gradient-to-br from-neon-indigo/20 to-neon-violet/20 border border-white/10">
                                <div className="bg-black/40 backdrop-blur-xl rounded-[22px] p-6">
                                    <FileUploader onFileUpload={handleFileUpload} />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                            <p className="text-sm text-slate-400">Or try asking me directly:</p>
                            <div className="flex flex-wrap items-center justify-center gap-2 max-w-lg">
                                {[
                                    "Analyze sales trends Q1 selling items",
                                    "Forecast next month's revenue",
                                    "Compare 2024 vs 2023 growth"
                                ].map((q) => (
                                    <button
                                        key={q}
                                        onClick={() => handleInputChange({ target: { value: q } } as any)}
                                        className="text-xs bg-white/5 hover:bg-neon-indigo/20 hover:text-neon-indigo border border-white/10 hover:border-neon-indigo/50 px-3 py-1.5 rounded-full transition-all text-slate-300"
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="max-w-md text-center space-y-2 opacity-50 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 text-slate-500">
                            <p className="text-sm">Supported formats: CSV, Excel, JSON</p>
                            <p className="text-xs">Your data remains local and secure.</p>
                        </div>
                    </div>
                )}

                {file && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 flex-1 flex flex-col min-h-0">
                        <div className="flex items-center justify-between flex-shrink-0">
                            <div className="flex items-center gap-4">
                                <div className="bg-neon-indigo/10 text-neon-indigo px-4 py-2 rounded-lg text-sm font-medium border border-neon-indigo/20 flex items-center gap-2">
                                    <span className="text-lg">📊</span> {file.name}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-400 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_theme(colors.green.500)]" />
                                    {data?.length} records loaded
                                </div>
                            </div>

                            {/* View Toggle */}
                            <div className="bg-black/20 border border-white/10 rounded-lg p-1 flex gap-1">
                                <button
                                    onClick={() => setViewMode('chart')}
                                    className={cn("px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-300", viewMode === 'chart' ? "bg-neon-indigo text-white shadow-lg shadow-neon-indigo/25" : "text-slate-400 hover:bg-white/5 hover:text-white")}
                                >
                                    Chart View
                                </button>
                                <button
                                    onClick={() => setViewMode('table')}
                                    className={cn("px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-300", viewMode === 'table' ? "bg-neon-indigo text-white shadow-lg shadow-neon-indigo/25" : "text-slate-400 hover:bg-white/5 hover:text-white")}
                                >
                                    Data Grid
                                </button>
                            </div>
                        </div>

                        {/* Main Content Area */}
                        <div className="flex-1 bg-white/5 rounded-3xl border border-white/10 p-1 relative overflow-hidden flex flex-col min-h-0 backdrop-blur-sm shadow-2xl">
                            {viewMode === 'chart' ? (
                                <div className="w-full h-full flex flex-col md:flex-row gap-4 p-4">
                                    {chartConfig ? (
                                        <>
                                            <div className="flex-1 min-h-[400px] min-w-0">
                                                <ChartRenderer config={chartConfig} data={data || []} className="w-full h-full border-none shadow-none bg-transparent" />
                                            </div>
                                            {/* Insights Panel */}
                                            <div className="w-full md:w-[280px] flex-shrink-0 animate-in fade-in slide-in-from-right-4 duration-700 overflow-y-auto scrollbar-thin">
                                                <SmartInsights data={data || []} />
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex-1 flex flex-col items-center justify-center text-slate-500 opacity-50">
                                            <p>Ask a question to generate a chart</p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="p-4 h-full overflow-hidden">
                                    <DataTable data={data || []} />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Chat Sidebar */}
            <aside className="w-[400px] flex-shrink-0 border-l border-white/10 bg-deep-slate/50 backdrop-blur-2xl relative z-20 shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.5)]">
                <ChatInterface
                    messages={messages}
                    input={input}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                    isLoading={isThinking}
                />
            </aside>
        </main>
    )
}
