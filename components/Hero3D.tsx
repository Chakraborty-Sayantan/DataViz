'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Users, Activity, BarChart3, PieChart } from 'lucide-react'

// Simulated Glass Card Component
const GlassCard = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay, ease: "easeOut" }}
        className={`bg-deep-slate/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl relative overflow-hidden ${className}`}
    >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
        {children}
    </motion.div>
)

// Animated Bar Chart Component
const AnimatedBarChart = () => {
    const bars = [40, 70, 50, 90, 60, 80]
    return (
        <div className="flex items-end justify-between h-32 gap-2 pt-4">
            {bars.map((height, i) => (
                <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 1.5, delay: 0.5 + i * 0.1, ease: "circOut" }}
                    className="w-full bg-gradient-to-t from-neon-indigo/50 to-neon-cyan/80 rounded-t-sm relative group"
                >
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-white font-mono">
                        {height}%
                    </div>
                </motion.div>
            ))}
        </div>
    )
}

// Animated Donut Component
const AnimatedDonut = () => {
    return (
        <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.1)" strokeWidth="10" fill="transparent" />
                <motion.circle
                    cx="50" cy="50" r="40"
                    stroke="#8b5cf6"
                    strokeWidth="10"
                    fill="transparent"
                    strokeDasharray="251.2"
                    strokeDashoffset="251.2"
                    initial={{ strokeDashoffset: 251.2 }}
                    animate={{ strokeDashoffset: 251.2 - (251.2 * 0.75) }} // 75%
                    transition={{ duration: 2, delay: 1, ease: "easeOut" }}
                    strokeLinecap="round"
                />
            </svg>
            <div className="absolute text-center">
                <div className="text-xl font-bold text-white">75%</div>
                <div className="text-[10px] text-slate-400">Growth</div>
            </div>
        </div>
    )
}

export const Hero3D = () => {
    return (
        <div className="h-full w-full flex items-center justify-center relative perspective-1000">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-indigo/20 blur-[120px] rounded-full pointer-events-none" />

            {/* Main Floating Dashboard Card */}
            <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 w-[380px] md:w-[450px]"
            >
                <GlassCard className="w-full">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-neon-indigo/20 rounded-lg">
                                <BarChart3 className="w-5 h-5 text-neon-indigo" />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold text-sm">Revenue Flow</h3>
                                <p className="text-xs text-slate-400">Monthly Analytics</p>
                            </div>
                        </div>
                        <span className="text-xs font-mono text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">+12.5%</span>
                    </div>

                    <AnimatedBarChart />

                    <div className="flex justify-between mt-4 text-[10px] text-slate-500 font-mono uppercase">
                        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
                    </div>
                </GlassCard>

                {/* Floating Widget: Users (Top Right) */}
                <motion.div
                    animate={{ y: [15, -15, 15] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute -right-12 -top-12 z-20"
                >
                    <GlassCard className="w-40 p-3" delay={0.2}>
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-xs text-slate-300 font-medium">Active Users</div>
                            <Users className="w-3 h-3 text-neon-cyan" />
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">2,840</div>
                        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '80%' }}
                                transition={{ duration: 1.5, delay: 1 }}
                                className="h-full bg-neon-cyan"
                            />
                        </div>
                    </GlassCard>
                </motion.div>

                {/* Floating Widget: Stats (Bottom Left) */}
                <motion.div
                    animate={{ y: [-20, 5, -20] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -left-16 -bottom-8 z-30"
                >
                    <GlassCard className="w-auto p-4 flex flex-col items-center" delay={0.4}>
                        <AnimatedDonut />
                        <div className="mt-2 text-xs text-slate-300 font-medium flex items-center gap-1">
                            <Activity className="w-3 h-3 text-neon-violet" /> Target Met
                        </div>
                    </GlassCard>
                </motion.div>
            </motion.div>
        </div>
    );
};
