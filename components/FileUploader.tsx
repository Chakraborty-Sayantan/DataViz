'use client'

import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { UploadCloud } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

interface FileUploaderProps {
    onFileUpload: (file: File) => void
}

export function FileUploader({ onFileUpload }: FileUploaderProps) {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles?.[0]) {
            onFileUpload(acceptedFiles[0])
        }
    }, [onFileUpload])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'text/csv': ['.csv'],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
            'application/json': ['.json']
        },
        maxFiles: 1
    })

    return (
        <div
            {...getRootProps()}
            className={cn(
                "relative group cursor-pointer w-full h-64 rounded-3xl border-2 border-dashed transition-all duration-300 ease-in-out flex flex-col items-center justify-center gap-4 overflow-hidden",
                isDragActive
                    ? "border-primary bg-primary/5 scale-[1.02]"
                    : "border-border/40 hover:border-primary/50 hover:bg-muted/30 bg-card/20 backdrop-blur-sm"
            )}
        >
            <input {...getInputProps()} />

            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <motion.div
                animate={{ scale: isDragActive ? 1.1 : 1 }}
                className="p-4 rounded-full bg-background/50 shadow-xl ring-1 ring-border/50 backdrop-blur-md relative z-10"
            >
                <UploadCloud className={cn("w-8 h-8 transition-colors", isDragActive ? "text-primary" : "text-muted-foreground")} />
            </motion.div>

            <div className="text-center relative z-10 space-y-2">
                <h3 className="font-semibold text-lg tracking-tight">
                    {isDragActive ? "Drop to analyze" : "Upload Data Source"}
                </h3>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                    Drag and drop your CSV, Excel, or JSON files here to begin analysis.
                </p>
            </div>

            <AnimatePresence>
                {isDragActive && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-primary/5 backdrop-blur-[2px] z-0"
                    />
                )}
            </AnimatePresence>
        </div>
    )
}
