'use server'

import { GoogleGenerativeAI } from '@google/generative-ai'

export async function generateChartConfig(userQuery: string, dataGenericPreview: string) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not set in .env.local")
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

  const prompt = `
    You are a data visualization expert.
    User Query: "${userQuery}"
    Data Preview (First 5 rows):
    ${dataGenericPreview}

    Generate a JSON configuration for a chart that best answers the query.
    Format similar to Recharts/shadcn config.
    Return ONLY valid JSON. 
    
    Structure:
    {
      "type": "bar" | "line" | "area" | "pie" | "scatter",
      "title": "Chart Title",
      "description": "Brief description",
      "xAxisKey": "column_name_for_x_axis",
      "series": [
        { "key": "column_name_for_metric", "color": "#hexcode", "name": "Human Readable Name" }
      ],
      "transform": {
        "filter": { "column": "string", "value": "string | number", "operator": "equals" | "contains" } | null,
        "aggregation": { "type": "sum" | "average" | "count" | "none", "groupBy": "string", "metric": "string" } | null,
        "sort": { "column": "string", "direction": "asc" | "desc" } | null
      }
    }

    IMPORTANT: 
    - If the user asks for specific category (e.g. "Books"), add a "filter".
    - If the user implies summarizing (e.g. "Revenue by Category", "Total Sales"), use "aggregation".
      - For Pie Charts, ALWAYS use aggregation if the data seems transactional (many rows per category).
      - "groupBy" should be the categorical column (xAxis).
      - "metric" should be the numeric column to sum/avg.
    - Ensure 'xAxisKey' matches a column in the data exactly.
    - Ensure 'series.key' matches a numeric column exactly (or the aggregated metric name).
  `

  try {
    const result = await model.generateContent(prompt)
    const response = result.response
    const text = response.text()

    // Clean markdown code blocks if present to ensure pure JSON
    const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim()

    return JSON.parse(jsonString)
  } catch (error) {
    console.error("Gemini API Error:", error)
    return null
  }
}
