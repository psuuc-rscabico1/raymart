"use client"

import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from 'recharts'

const data = [
  { month: 'JAN', prompt: 100, traditional: 100 },
  { month: 'FEB', prompt: 105, traditional: 101 },
  { month: 'MAR', prompt: 110, traditional: 102 },
  { month: 'APR', prompt: 116, traditional: 102 },
  { month: 'MAY', prompt: 122, traditional: 103 },
  { month: 'JUN', prompt: 125, traditional: 103 },
]

const tickerItems = [
  "· Toyota of Dallas +18 leads this week",
  "· Honda of Austin cost per lead ↓41%",
  "· Ford of Houston AI mentions ↑3.2×",
  "· Chevy of Phoenix ROI 5.1× confirmed",
  "· BMW of Denver +31 leads this month"
]

const CountUpValue = ({ value, duration = 1500 }: { value: string, duration?: number }) => {
  const [displayValue, setDisplayValue] = useState('0')
  
  useEffect(() => {
    const isPercentage = value.includes('%')
    const isMultiplier = value.includes('×')
    const isHours = value.includes('h')
    const numValue = parseFloat(value.replace(/[^0-9.-]/g, ''))
    
    let startTimestamp: number | null = null
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      const current = Math.floor(progress * numValue)
      
      let formatted = current.toString()
      if (isPercentage) formatted = (numValue >= 0 ? '+' : '') + current + '%'
      if (isMultiplier) formatted = current + '×'
      if (isHours) formatted = current + 'h'
      
      setDisplayValue(formatted)
      if (progress < 1) {
        window.requestAnimationFrame(step)
      } else {
        setDisplayValue(value)
      }
    }
    window.requestAnimationFrame(step)
  }, [value, duration])

  return <span className="text-[22px] font-bold text-[#db3533]">{displayValue}</span>
}

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <main className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-[414px] h-[518px] bg-[#0c0c0e] text-white flex flex-col overflow-hidden select-none relative font-mono border border-white/5 shadow-2xl">
        {/* Header */}
        <header className="px-5 pt-6 pb-4">
          <div className="flex items-center justify-between mb-1">
            <h1 className="text-[14px] font-bold tracking-tight uppercase">AI Lead Intelligence</h1>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#db3533] animate-pulse" />
              <span className="text-[9px] font-bold text-[#db3533] uppercase tracking-wider">LIVE PILOT</span>
            </div>
          </div>
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider">48 dealerships · 5 states</p>
        </header>

        {/* Chart Section */}
        <div className="px-5 flex-1 flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-[11px] font-medium tracking-tight mb-0.5">AI-driven lead volume · last 6 months</h2>
              <p className="text-[9px] text-zinc-500 uppercase tracking-widest">JAN – JUN 2025</p>
            </div>
            <div className="flex flex-col gap-1 items-end">
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] text-zinc-500 uppercase tracking-tighter">Prompt Graph</span>
                <div className="w-6 h-[2px] bg-[#db3533]" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] text-zinc-500 uppercase tracking-tighter">Traditional</span>
                <div className="w-6 h-0 border-t border-dashed border-zinc-600" />
              </div>
            </div>
          </div>

          <div className="h-[140px] w-full mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorPrompt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#db3533" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#db3533" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  interval={0}
                  tick={{ fontSize: 9, fill: '#666', fontFamily: 'monospace' }}
                  dy={10}
                />
                <YAxis hide domain={[90, 130]} />
                <Area 
                  type="monotone" 
                  dataKey="prompt" 
                  stroke="#db3533" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorPrompt)"
                  animationDuration={1500}
                />
                <Line 
                  type="monotone" 
                  dataKey="traditional" 
                  stroke="#666" 
                  strokeDasharray="4 4" 
                  strokeWidth={1.5}
                  dot={false}
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-x-5 gap-y-6 px-5 py-8 border-t border-white/[0.03]">
          <div className="flex flex-col">
            <CountUpValue value="+25%" />
            <span className="text-[9px] text-zinc-500 font-medium uppercase tracking-widest mt-0.5">Lead volume</span>
            <p className="text-[9px] text-zinc-600 leading-[1.3] mt-1">More qualified buyers reaching you every month — because AI now knows you exist.</p>
          </div>
          <div className="flex flex-col">
            <CountUpValue value="−35%" />
            <span className="text-[9px] text-zinc-500 font-medium uppercase tracking-widest mt-0.5">Cost per lead</span>
            <p className="text-[9px] text-zinc-600 leading-[1.3] mt-1">You spend less chasing leads on traditional channels because AI brings them to you.</p>
          </div>
          <div className="flex flex-col">
            <CountUpValue value="5×" />
            <span className="text-[9px] text-zinc-500 font-medium uppercase tracking-widest mt-0.5">ROI generated</span>
            <p className="text-[9px] text-zinc-600 leading-[1.3] mt-1">Every dollar into Prompt Graph earns back five, measured over six months.</p>
          </div>
          <div className="flex flex-col">
            <CountUpValue value="48h" />
            <span className="text-[9px] text-zinc-500 font-medium uppercase tracking-widest mt-0.5">Live results</span>
            <p className="text-[9px] text-zinc-600 leading-[1.3] mt-1">From sign-up to showing up in AI answers. No rebuild. No downtime.</p>
          </div>
        </div>

        {/* Ticker */}
        <div className="h-8 border-y border-white/[0.03] overflow-hidden flex items-center bg-white/[0.01]">
          <div className="flex animate-[ticker_30s_linear_infinite] whitespace-nowrap">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span key={i} className="text-[9px] text-zinc-500 uppercase tracking-widest px-4 font-medium">
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="px-5 py-4 flex items-center justify-between text-zinc-700">
          <span className="text-[9px] uppercase tracking-widest">Real dealerships. Real attribution.</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] uppercase tracking-widest">All systems nominal</span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#4cbf40] animate-pulse shadow-[0_0_8px_rgba(76,191,64,0.4)]" />
          </div>
        </footer>
      </div>
    </main>
  )
}
