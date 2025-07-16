"use client";
import React, { useState } from "react";

interface BarData {
  label: string;
  value: number;
}

interface SimpleBarChartProps {
  data: BarData[];
  className?: string;
}

export default function SimpleBarChart({ data, className }: SimpleBarChartProps) {
  const max = Math.max(...data.map((d) => d.value));
  const barWidth = 100 / data.length;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  return (
    <svg viewBox="0 0 100 50" className={className}>
      {data.map((d, i) => {
        const height = (d.value / max) * 40;
        const x = i * barWidth + 5;
        const y = 40 - height;
        return (
          <g
            key={d.label}
            onMouseEnter={() => setActiveIndex(i)}
            onMouseLeave={() => setActiveIndex(null)}
            className="cursor-pointer"
          >
            <title>{`${d.label}: ${d.value}`}</title>
            <rect x={x} y={y} width={barWidth - 10} height={height} fill="#facc15" />
            {activeIndex === i && (
              <text
                x={x + (barWidth - 10) / 2}
                y={y - 2}
                fontSize={5}
                textAnchor="middle"
                fill="#374151"
              >
                {d.value}
              </text>
            )}
            <text
              x={x + (barWidth - 10) / 2}
              y={47}
              fontSize={5}
              textAnchor="middle"
              fill="#374151"
            >
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
