'use client'

import React, { useEffect, useState } from 'react'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts'

export function LandingChart() {
    const [data, setData] = useState([
        { name: '00:00', value: 4000, baseline: 2400 },
        { name: '04:00', value: 3000, baseline: 1398 },
        { name: '08:00', value: 2000, baseline: 9800 },
        { name: '12:00', value: 2780, baseline: 3908 },
        { name: '16:00', value: 1890, baseline: 4800 },
        { name: '20:00', value: 2390, baseline: 3800 },
        { name: '23:59', value: 3490, baseline: 4300 },
    ])

    useEffect(() => {
        const interval = setInterval(() => {
            setData(currentData => {
                const newData = [...currentData];
                const lastItem = newData[newData.length - 1];
                // Simulate realistic sensor/metric drift
                const nextValue = Math.max(1000, Math.min(5000, lastItem.value + (Math.random() - 0.5) * 800));
                const nextBaseline = Math.max(1000, Math.min(5000, lastItem.baseline + (Math.random() - 0.5) * 500));

                newData.shift();
                newData.push({
                    name: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    value: nextValue,
                    baseline: nextBaseline
                });
                return newData;
            });
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-full bg-background/50 rounded-xl overflow-hidden p-4 relative">
            {/* Subtle grid pattern background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_14px] pointer-events-none" />

            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorBaseline" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <XAxis dataKey="name" hide />
                    <YAxis hide domain={[0, 6000]} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#111119',
                            border: '1px solid #ffffff10',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                        }}
                        itemStyle={{ fontSize: '12px', fontWeight: 500 }}
                        labelStyle={{ color: '#aaa', fontSize: '10px', marginBottom: '4px' }}
                    />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#8b5cf6"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorValue)"
                        isAnimationActive={true}
                        animationDuration={1000}
                        animationEasing="ease-in-out"
                    />
                    <Area
                        type="monotone"
                        dataKey="baseline"
                        stroke="#10b981"
                        strokeWidth={2}
                        strokeDasharray="4 4"
                        fillOpacity={1}
                        fill="url(#colorBaseline)"
                        isAnimationActive={true}
                        animationDuration={1000}
                    />
                </AreaChart>
            </ResponsiveContainer>

            {/* Live Indicator overlay */}
            <div className="absolute top-3 right-3 flex items-center gap-2 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full border border-white/5">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Live Analysis</span>
            </div>
        </div>
    )
}
