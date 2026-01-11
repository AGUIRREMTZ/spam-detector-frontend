"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Activity } from "lucide-react"

interface TechnicalAnalysisProps {
  metrics: {
    f1_score: number
    accuracy: number
    matriz_confusion?: {
      true_negatives: number
      false_positives: number
      false_negatives: number
      true_positives: number
    }
  }
}

export function TechnicalAnalysis({ metrics }: TechnicalAnalysisProps) {
  const cm = metrics.matriz_confusion

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Análisis Técnico del Modelo
        </CardTitle>
        <CardDescription>Métricas de rendimiento del modelo de Machine Learning</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* F1 Score y Accuracy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-blue-900">F1-Score</h3>
            </div>
            <p className="text-3xl font-bold text-blue-600">{(metrics.f1_score * 100).toFixed(1)}%</p>
            <p className="text-sm text-blue-700 mt-1">Balance entre precisión y recall</p>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold text-green-900">Accuracy</h3>
            </div>
            <p className="text-3xl font-bold text-green-600">{(metrics.accuracy * 100).toFixed(1)}%</p>
            <p className="text-sm text-green-700 mt-1">Precisión general del modelo</p>
          </div>
        </div>

        {/* Confusion Matrix */}
        {cm && (
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Matriz de Confusión
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 text-center">
                <p className="text-sm text-green-700 font-medium mb-1">True Negatives (TN)</p>
                <p className="text-2xl font-bold text-green-600">{cm.true_negatives}</p>
                <p className="text-xs text-green-600 mt-1">Ham correctos</p>
              </div>

              <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4 text-center">
                <p className="text-sm text-orange-700 font-medium mb-1">False Positives (FP)</p>
                <p className="text-2xl font-bold text-orange-600">{cm.false_positives}</p>
                <p className="text-xs text-orange-600 mt-1">Ham marcados como Spam</p>
              </div>

              <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4 text-center">
                <p className="text-sm text-orange-700 font-medium mb-1">False Negatives (FN)</p>
                <p className="text-2xl font-bold text-orange-600">{cm.false_negatives}</p>
                <p className="text-xs text-orange-600 mt-1">Spam marcados como Ham</p>
              </div>

              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 text-center">
                <p className="text-sm text-green-700 font-medium mb-1">True Positives (TP)</p>
                <p className="text-2xl font-bold text-green-600">{cm.true_positives}</p>
                <p className="text-xs text-green-600 mt-1">Spam correctos</p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-700">
                <strong>Interpretación:</strong> La matriz de confusión muestra qué tan bien el modelo clasifica cada
                tipo de correo. Un buen modelo tiene valores altos en las diagonales (TN y TP) y bajos en las otras
                celdas (FP y FN).
              </p>
            </div>
          </div>
        )}

        {/* Model Info */}
        <div className="border-t pt-4">
          <h3 className="font-semibold mb-2 text-sm text-slate-700">Información del Modelo</h3>
          <ul className="text-sm text-slate-600 space-y-1">
            <li>
              • <strong>Algoritmo:</strong> Regresión Logística
            </li>
            <li>
              • <strong>Preprocesamiento:</strong> PorterStemmer + TF-IDF
            </li>
            <li>
              • <strong>Dataset:</strong> TREC 2007 Public Spam Corpus
            </li>
            <li>
              • <strong>Características:</strong> Vectorización TF-IDF de tokens procesados
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
