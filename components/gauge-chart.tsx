"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, CheckCircle2 } from "lucide-react"

interface GaugeChartProps {
  probability: number
  resultado: string
}

export function GaugeChart({ probability, resultado }: GaugeChartProps) {
  const percentage = Math.round(probability * 100)
  const isSpam = resultado === "Spam"

  // Calcular el ángulo para el gauge (semicírculo)
  const angle = probability * 180 - 90

  return (
    <Card className="overflow-hidden">
      <CardHeader className={`${isSpam ? "bg-red-50" : "bg-green-50"}`}>
        <CardTitle className="flex items-center gap-2">
          {isSpam ? (
            <>
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <span className="text-red-900">¡SPAM Detectado!</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="h-6 w-6 text-green-600" />
              <span className="text-green-900">Correo Legítimo (HAM)</span>
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center">
          {/* Gauge SVG */}
          <div className="relative w-64 h-32 mb-4">
            <svg viewBox="0 0 200 100" className="w-full h-full">
              {/* Background arc */}
              <path
                d="M 10 90 A 80 80 0 0 1 190 90"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="20"
                strokeLinecap="round"
              />
              {/* Colored arc based on probability */}
              <path
                d="M 10 90 A 80 80 0 0 1 190 90"
                fill="none"
                stroke={isSpam ? "#dc2626" : "#16a34a"}
                strokeWidth="20"
                strokeLinecap="round"
                strokeDasharray={`${probability * 251.2} 251.2`}
              />
              {/* Needle */}
              <line
                x1="100"
                y1="90"
                x2="100"
                y2="20"
                stroke="#1e293b"
                strokeWidth="3"
                strokeLinecap="round"
                transform={`rotate(${angle} 100 90)`}
              />
              {/* Center circle */}
              <circle cx="100" cy="90" r="8" fill="#1e293b" />
            </svg>
          </div>

          {/* Probability Text */}
          <div className="text-center">
            <div className="text-5xl font-bold mb-2" style={{ color: isSpam ? "#dc2626" : "#16a34a" }}>
              {percentage}%
            </div>
            <p className="text-slate-600">Probabilidad de ser {isSpam ? "SPAM" : "HAM"}</p>
          </div>

          {/* Probability Breakdown */}
          <div className="w-full mt-6 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Probabilidad SPAM:</span>
              <span className="text-sm font-semibold text-red-600">
                {Math.round((resultado === "Spam" ? probability : 1 - probability) * 100)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Probabilidad HAM:</span>
              <span className="text-sm font-semibold text-green-600">
                {Math.round((resultado === "Ham" ? probability : 1 - probability) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
