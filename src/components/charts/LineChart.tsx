"use client";
import React, { useState } from "react";

export interface LinePoint {
  label: string;
  value: number;
}

interface LineChartProps {
  data: LinePoint[];
  className?: string;
}

export default function LineChart({ data, className }: LineChartProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const max = Math.max(...data.map((d) => d.value));
  const stepX = data.length > 1 ? 100 / (data.length - 1) : 0;
  const areaPath = [
    `M 0 40`,
    ...data.map(
      (d, i) => `L ${i * stepX} ${40 - (d.value / max) * 40}`
    ),
    `L 100 40 Z`,
  ].join(" ");

  return (
    <svg
      viewBox="0 0 100 50"
      className={className}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#facc15" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#facc15" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#lineGradient)" stroke="none" />
      {/* Grid lines */}
      {Array.from({ length: 4 }).map((_, i) => (
        <line
          key={`h-${i}`}
          x1={0}
          x2={100}
          y1={10 * (i + 1)}
          y2={10 * (i + 1)}
          stroke="#e5e7eb"
          strokeWidth={0.2}
        />
      ))}
      {data.map((_, i) => (
        <line
          key={`v-${i}`}
          x1={i * stepX}
          x2={i * stepX}
          y1={0}
          y2={40}
          stroke="#e5e7eb"
          strokeWidth={0.2}
        />
      ))}
      <polyline
        fill="none"
        stroke="#facc15"
        strokeWidth={1.5}
        points={data
          .map((d, i) => `${i * stepX},${40 - (d.value / max) * 40}`)
          .join(" ")}
      />
      {data.map((d, i) => {
        const cx = i * stepX;
        const cy = 40 - (d.value / max) * 40;
        const textY = cy < 6 ? cy + 6 : cy - 4;
        return (
          <g
            key={d.label}
            onMouseEnter={() => setHoverIndex(i)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <circle cx={cx} cy={cy} r={1} fill="#374151" />
            {hoverIndex === i && (
              <text
                x={cx}
                y={textY}
                fontSize={5}
                textAnchor="middle"
                fill="#374151"
              >
                {d.value}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
