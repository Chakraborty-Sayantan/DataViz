'use client'

import React, { useRef, useEffect } from 'react'
import { Send, Bot, User, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface Message {
    id: string
    role: 'user' | 'assistant'
    content: string
}

interface ChatInterfaceProps {
    messages: Message[]
    input: string
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleSubmit: (e: React.FormEvent) => void
    isLoading?: boolean
}

export function ChatInterface({
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading
}: ChatInterfaceProps) {
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    return (
        <div className="flex flex-col h-full w-full max-w-md bg-transparent relative">
            <div className="p-4 border-b border-white/5 flex items-center gap-2 bg-deep-slate/50 backdrop-blur-md sticky top-0 z-10">
                <Bot className="w-5 h-5 text-neon-indigo" />
                <h2 className="font-semibold text-sm text-white">AI Analyst</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {messages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-center opacity-40 p-8 text-slate-400">
                        <Bot className="w-12 h-12 mb-4 text-slate-500" />
                        <p className="text-sm">Ask me to analyze your data, create charts, or find insights.</p>
                    </div>
                )}
                {messages.map((m) => (
                    <div
                        key={m.id}
                        className={cn(
                            "flex gap-3 text-sm",
                            m.role === 'user' ? "flex-row-reverse" : "flex-row"
                        )}
                    >
                        <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                            m.role === 'user' ? "bg-neon-indigo text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]" : "bg-white/10 text-slate-300"
                        )}>
                            {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                        </div>
                        <div className={cn(
                            "rounded-2xl px-4 py-2 max-w-[85%]",
                            m.role === 'user'
                                ? "bg-neon-indigo/20 text-white border border-neon-indigo/50 rounded-tr-none"
                                : "bg-white/5 text-slate-200 border border-white/10 rounded-tl-none"
                        )}>
                            {m.content}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex gap-3 text-sm">
                        <div className="w-8 h-8 rounded-full bg-white/10 text-slate-300 flex items-center justify-center flex-shrink-0">
                            <Bot className="w-4 h-4" />
                        </div>
                        <div className="bg-white/5 text-slate-200 border border-white/10 rounded-2xl rounded-tl-none px-4 py-2 flex items-center gap-2">
                            <Loader2 className="w-3 h-3 animate-spin text-neon-indigo" />
                            Thinking...
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-white/5 bg-deep-slate/50 backdrop-blur-md">
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-neon-indigo transition-all placeholder:text-slate-500"
                        placeholder="Describe the chart you want..."
                        value={input}
                        onChange={handleInputChange}
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="bg-neon-indigo text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-neon-indigo/80 hover:scale-105 active:scale-95 transition-all shadow-[0_0_10px_rgba(99,102,241,0.5)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </form>
            </div>
        </div>
    )
}
