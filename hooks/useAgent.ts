import { useState, useCallback } from 'react'
import { Message } from '@/components/ChatInterface'
import { ChartConfig } from '@/components/ChartRenderer'
import Papa from 'papaparse'
import { generateChartConfig } from '@/app/actions/generate-chart'



export function useAgent() {
    const [file, setFile] = useState<File | null>(null)
    const [rawData, setRawData] = useState<any[] | null>(null)
    const [data, setData] = useState<any[] | null>(null)
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState('')
    const [chartConfig, setChartConfig] = useState<ChartConfig | null>(null)
    const [isThinking, setIsThinking] = useState(false)

    const handleFileUpload = useCallback((uploadedFile: File) => {
        setFile(uploadedFile)
        Papa.parse(uploadedFile, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                const parsedData = results.data as any[]
                setRawData(parsedData)
                setData(parsedData)
                setMessages(prev => [...prev, {
                    id: Date.now().toString(),
                    role: 'assistant',
                    content: `I've analyzed ${uploadedFile.name}. It has ${results.data.length} rows. What would you like to visualize?`
                }])
            }
        })
    }, [])

    const processData = (rawData: any[], transform: any) => {
        let processed = [...rawData]

        // 1. Filter
        if (transform?.filter) {
            const { column, value, operator } = transform.filter
            processed = processed.filter(row => {
                const rowVal = row[column]?.toString().toLowerCase()
                const filterVal = value?.toString().toLowerCase()
                if (operator === 'contains') return rowVal?.includes(filterVal)
                return rowVal === filterVal
            })
        }

        // 2. Aggregation
        if (transform?.aggregation) {
            const { groupBy, metric, type } = transform.aggregation
            if (groupBy && metric) {
                const groups: Record<string, number[]> = {}
                processed.forEach(row => {
                    const key = row[groupBy] || 'Unknown'
                    const val = parseFloat(row[metric]) || 0
                    if (!groups[key]) groups[key] = []
                    groups[key].push(val)
                })

                processed = Object.entries(groups).map(([key, values]) => {
                    let result = 0
                    if (type === 'sum') result = values.reduce((a, b) => a + b, 0)
                    if (type === 'average') result = values.reduce((a, b) => a + b, 0) / values.length
                    if (type === 'count') result = values.length
                    return { [groupBy]: key, [metric]: result }
                })
            }
        }

        // 3. Sort
        if (transform?.sort) {
            const { column, direction } = transform.sort
            processed.sort((a, b) => {
                const valA = a[column]
                const valB = b[column]
                if (!isNaN(parseFloat(valA)) && !isNaN(parseFloat(valB))) {
                    return direction === 'asc' ? valA - valB : valB - valA
                }
                return direction === 'asc' ? String(valA).localeCompare(String(valB)) : String(valB).localeCompare(String(valA))
            })
        }

        return processed
    }

    const processQuery = useCallback(async (query: string) => {
        setIsThinking(true)

        try {
            if (!rawData || rawData.length === 0) {
                setMessages(prev => [...prev, {
                    id: Date.now().toString(),
                    role: 'assistant',
                    content: `Please upload a dataset first so I can visualize it.`
                }])
                setIsThinking(false)
                return
            }

            if (query.toLowerCase().includes('reset')) {
                setChartConfig(null)
                setData(rawData)
                setMessages(prev => [...prev, {
                    id: Date.now().toString(),
                    role: 'assistant',
                    content: `I've reset the view.`
                }])
                setIsThinking(false)
                return
            }

            const dataPreview = JSON.stringify(rawData.slice(0, 5))
            const response = await generateChartConfig(query, dataPreview)

            if (response) {
                const { transform, ...config } = response

                // Apply transformations
                const transformedData = processData(rawData, transform)

                setData(transformedData) // Update view with filtered/aggregated data
                setChartConfig(config)

                setMessages(prev => [...prev, {
                    id: Date.now().toString(),
                    role: 'assistant',
                    content: `I've generated a **${config.type} chart** showing **${config.title}**.`
                }])
            } else {
                setMessages(prev => [...prev, {
                    id: Date.now().toString(),
                    role: 'assistant',
                    content: `I couldn't generate a chart for that. Try asking differently.`
                }])
            }

        } catch (error) {
            console.error(error)
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: 'assistant',
                content: `Sorry, I encountered an error. Please check your API Key.`
            }])
        } finally {
            setIsThinking(false)
        }
    }, [rawData])

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim()) return

        const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input }
        setMessages(prev => [...prev, userMsg])
        const currentInput = input
        setInput('')

        await processQuery(currentInput)
    }, [input, processQuery])

    const resetSession = useCallback(() => {
        setFile(null)
        setRawData(null)
        setData(null)
        setChartConfig(null)
        setMessages([])
    }, [])

    return {
        file,
        data,
        messages,
        input,
        chartConfig,
        isThinking,
        handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value),
        handleFileUpload,
        handleSubmit,
        resetSession
    }
}
