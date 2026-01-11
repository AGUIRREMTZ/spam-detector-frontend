"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, AlertCircle, Shield, Mail } from "lucide-react"
import { GaugeChart } from "@/components/gauge-chart"
import { TechnicalAnalysis } from "@/components/technical-analysis"
import { ImportantWords } from "@/components/important-words"

const API_URL = "https://tu-proyecto-render.onrender.com"

export default function SpamDetectorPage() {
  const [emailContent, setEmailContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState("")

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      setEmailContent(content)
      setError("")
      setResult(null)
    }
    reader.readAsText(file)
  }

  const analyzeEmail = async () => {
    if (!emailContent.trim()) {
      setError("Por favor ingresa o carga un correo electrónico")
      return
    }

    setLoading(true)
    setError("")
    setResult(null)

    try {
      const response = await fetch(`${API_URL}/api/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email_content: emailContent }),
      })

      if (!response.ok) {
        throw new Error("Error al analizar el correo")
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setResult(data)
    } catch (err: any) {
      setError(err.message || "Error al conectar con el servidor")
    } finally {
      setLoading(false)
    }
  }

  const clearAll = () => {
    setEmailContent("")
    setResult(null)
    setError("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="h-12 w-12 text-blue-600" />
            <h1 className="text-4xl font-bold text-slate-900">Detector de Spam</h1>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Sistema de detección de spam basado en Machine Learning con Regresión Logística
          </p>
        </div>

        {/* Input Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Analizar Correo Electrónico
            </CardTitle>
            <CardDescription>Carga un archivo de correo o pega el contenido directamente</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-fit">
                    <Upload className="h-4 w-4" />
                    <span>Cargar Archivo</span>
                  </div>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".txt,.eml,.msg"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <Button variant="outline" onClick={clearAll} disabled={loading}>
                Limpiar
              </Button>
            </div>

            <Textarea
              placeholder="O pega el contenido del correo aquí..."
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              className="min-h-[200px] font-mono text-sm"
            />

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              onClick={analyzeEmail}
              disabled={loading || !emailContent.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700"
              size="lg"
            >
              {loading ? "Analizando..." : "Analizar Correo"}
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        {result && (
          <div className="space-y-6">
            {/* Gauge Chart */}
            <GaugeChart probability={result.probabilidad_spam} resultado={result.resultado} />

            {/* Important Words */}
            {result.palabras_importantes && result.palabras_importantes.length > 0 && (
              <ImportantWords words={result.palabras_importantes} emailContent={emailContent} />
            )}

            {/* Technical Analysis */}
            {result.metricas_modelo && <TechnicalAnalysis metrics={result.metricas_modelo} />}
          </div>
        )}
      </div>
    </div>
  )
}
