"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

interface ImportantWordsProps {
  words: Array<{ palabra: string; importancia: number }>
  emailContent: string
}

export function ImportantWords({ words, emailContent }: ImportantWordsProps) {
  const maxImportance = Math.max(...words.map((w) => w.importancia))

  // Función para resaltar palabras en el texto
  const highlightText = () => {
    let highlightedText = emailContent
    const wordsToHighlight = words.map((w) => w.palabra.toLowerCase())

    wordsToHighlight.forEach((word) => {
      const regex = new RegExp(`\\b${word}\\w*\\b`, "gi")
      highlightedText = highlightedText.replace(
        regex,
        (match) => `<mark class="bg-yellow-200 px-1 rounded">${match}</mark>`,
      )
    })

    return highlightedText
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          Palabras Clave Detectadas
        </CardTitle>
        <CardDescription>Palabras que más influyeron en la clasificación del correo</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Important Words List */}
        <div className="space-y-2">
          {words.map((word, index) => {
            const percentage = (word.importancia / maxImportance) * 100

            return (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700">{word.palabra}</span>
                  <span className="text-xs text-slate-500">{word.importancia.toFixed(2)}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* Highlighted Email Preview */}
        <div>
          <h3 className="font-semibold mb-2 text-sm text-slate-700">Vista Previa con Palabras Resaltadas</h3>
          <div
            className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-sm font-mono max-h-64 overflow-auto"
            dangerouslySetInnerHTML={{ __html: highlightText() }}
          />
          <p className="text-xs text-slate-500 mt-2">
            Las palabras resaltadas en amarillo fueron identificadas como importantes para la clasificación
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
