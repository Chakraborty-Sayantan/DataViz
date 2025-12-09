'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot } from 'lucide-react';

const steps = [
    { role: 'user', text: "Show me the user growth for Q4." },
    { role: 'ai', text: "Here is the growth trajectory for Q4 based on current metrics.", graph: true },
    { role: 'user', text: "Forecast revenue for 2026." },
    { role: 'ai', text: "Projecting a 15% increase in ARR based on the new pricing model.", graph: true },
];

export const LiveDemo = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [visibleMessages, setVisibleMessages] = useState<any[]>([]);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        const processStep = (index: number) => {
            if (index >= steps.length) {
                // Reset loop
                timeout = setTimeout(() => {
                    setVisibleMessages([]);
                    setCurrentStep(0);
                }, 3000);
                return;
            }

            const step = steps[index];

            // Add message
            timeout = setTimeout(() => {
                setVisibleMessages(prev => [...prev, step]);
                setCurrentStep(index + 1);
            }, index === 0 ? 1000 : 2500); // Initial delay vs between messages delay
        };

        processStep(currentStep);

        return () => clearTimeout(timeout);
    }, [currentStep]);

    return (
        <div className="relative overflow-hidden py-24">
            <div className="container mx-auto max-w-6xl px-4">
                <div className="rounded-3xl border border-white/10 bg-black/40 p-2 shadow-2xl backdrop-blur-xl md:p-4">
                    <div className="flex h-[600px] flex-col rounded-2xl bg-deep-slate md:flex-row overflow-hidden">

                        {/* Fake Sidebar */}
                        <div className="hidden w-64 border-r border-white/5 bg-white/[0.02] p-4 md:block">
                            <div className="mb-4 h-8 w-24 rounded bg-white/10" />
                            <div className="space-y-2">
                                <div className="h-4 w-full rounded bg-white/5" />
                                <div className="h-4 w-3/4 rounded bg-white/5" />
                                <div className="h-4 w-5/6 rounded bg-white/5" />
                            </div>
                        </div>

                        {/* Chat Area */}
                        <div className="flex-1 flex flex-col relative">
                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                <AnimatePresence mode='popLayout'>
                                    {visibleMessages.map((msg, idx) => (
                                        <motion.div
                                            key={`${idx}-${msg.text}`}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                                        >
                                            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${msg.role === 'ai' ? 'bg-neon-indigo' : 'bg-white/10'}`}>
                                                {msg.role === 'ai' ? <Bot size={16} /> : <User size={16} />}
                                            </div>
                                            <div className={`max-w-[80%] rounded-2xl p-4 ${msg.role === 'ai' ? 'bg-white/5' : 'bg-neon-violet/20'}`}>
                                                <p className="text-sm text-slate-200">{msg.text}</p>
                                                {msg.graph && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 150, opacity: 1 }}
                                                        transition={{ duration: 0.8, delay: 0.2 }}
                                                        className="mt-4 w-full rounded-lg bg-black/20 p-2 relative overflow-hidden flex items-end justify-between gap-1"
                                                    >
                                                        {/* Fake Graph Bars */}
                                                        {[...Array(10)].map((_, i) => (
                                                            <motion.div
                                                                key={i}
                                                                initial={{ height: "10%" }}
                                                                animate={{ height: `${Math.random() * 60 + 30}%` }}
                                                                transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", delay: i * 0.1 }}
                                                                className="w-full bg-gradient-to-t from-neon-indigo to-neon-violet rounded-sm opacity-80"
                                                            />
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {/* Input Area */}
                            <div className="p-4 border-t border-white/5 bg-white/[0.02]">
                                <div className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-3">
                                    <div className="h-2 w-2 animate-pulse rounded-full bg-neon-indigo" />
                                    <span className="text-sm text-slate-500">AI is thinking...</span>
                                    <Send className="ml-auto h-4 w-4 text-slate-500" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-indigo/20 blur-[100px]" />
        </div>
    );
};
