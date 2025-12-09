'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Upload, MessageSquare, BarChart2, TrendingUp, Users, Download, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
    {
        title: "Instant Upload",
        description: "Drag & drop CSVs, Excel, or connect SQL databases instantly.",
        icon: <Upload className="h-8 w-8 text-neon-indigo" />,
        className: "col-span-1 md:col-span-1",
    },
    {
        title: "Natural Language Chat",
        description: "Ask questions like 'Show me revenue vs churn for Q3' and get answers.",
        icon: <MessageSquare className="h-8 w-8 text-neon-violet" />,
        className: "col-span-1 md:col-span-1",
    },
    {
        title: "AI Visualization",
        description: "Automatically selects the best chart type for your data structure.",
        icon: <BarChart2 className="h-8 w-8 text-cyan-400" />,
        className: "col-span-1 md:col-span-2",
    },
    {
        title: "Predictive Forecasting",
        description: "See the future with advanced ML models built right into the dashboard.",
        icon: <TrendingUp className="h-8 w-8 text-fuchsia-400" />,
        className: "col-span-1 md:col-span-2",
    },
    {
        title: "Real-time Collaboration",
        description: "Work with your team in real-time. Share insights with a single click.",
        icon: <Users className="h-8 w-8 text-emerald-400" />,
        className: "col-span-1 md:col-span-1",
    },
    {
        title: "Export Anything",
        description: "Download fully editable reports in PDF, PNG, or Excel formats.",
        icon: <Download className="h-8 w-8 text-orange-400" />,
        className: "col-span-1 md:col-span-1",
    },
];

export const BentoGrid = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(cardsRef.current, {
                y: 50,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            })
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="container mx-auto max-w-6xl px-4 py-12">
            <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-white md:text-5xl">
                All your data tools. <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-indigo to-neon-violet">Reinvented.</span>
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {features.map((feature, idx) => (
                    <div
                        key={idx}
                        ref={(el) => {
                            if (el) cardsRef.current[idx] = el;
                        }}
                        className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 hover:bg-white/10 transition-colors duration-300 ${feature.className}`}
                    >
                        {/* Shiny Border Effect */}
                        <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                            style={{
                                background: `bg-gradient-to-br from-neon-indigo/20 to-neon-violet/20`
                            }}
                        >
                            <div className="absolute inset-0 bg-transparent"
                                style={{
                                    background: "radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.1), transparent 40%)"
                                }}
                            />
                        </div>

                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
                            {feature.icon}
                        </div>
                        <h3 className="mb-2 text-xl font-semibold text-white">{feature.title}</h3>
                        <p className="text-slate-400">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
