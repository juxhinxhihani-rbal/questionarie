"use client";
import React, { useState } from "react";

export interface PieSlice {
  label: string;
  value: number;
  color?: string;
}

interface PieChartProps {
  data: PieSlice[];
  size?: number;
}

export default function PieChart({ data, size = 200 }: PieChartProps) {
  const radius = size / 2;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const total = data.reduce((sum, d) => sum + d.value, 0);

  let cumulative = 0;
  const slices = data.map((d, i) => {
    const startAngle = (cumulative / total) * 2 * Math.PI;
    cumulative += d.value;
    const endAngle = (cumulative / total) * 2 * Math.PI;
    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
    const x1 = radius + radius * Math.sin(startAngle);
    const y1 = radius - radius * Math.cos(startAngle);
    const x2 = radius + radius * Math.sin(endAngle);
    const y2 = radius - radius * Math.cos(endAngle);
    const pathData = `M ${radius} ${radius} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    const color = d.color || `hsl(${(i * 60) % 360},70%,60%)`;
    return { pathData, color };
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}
      className="cursor-pointer">
      {slices.map((s, i) => (
        <path
          key={i}
          d={s.pathData}
          fill={s.color}
          onMouseEnter={() => setActiveIndex(i)}
          onMouseLeave={() => setActiveIndex(null)}
        />
      ))}
      {activeIndex !== null && (
        <text
          x={radius}
          y={radius}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-sm fill-gray-800"
        >
          {(() => {
            const slice = data[activeIndex];
            const pct = ((slice.value / total) * 100).toFixed(1);
            return `${pct}% ${slice.label} - ${slice.value}`;
          })()}
        </text>
      )}
    </svg>
  );
}
