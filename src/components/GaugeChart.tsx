interface GaugeChartProps {
  value: number;
  max: number;
  label: string;
  unit?: string;
  color?: string;
  size?: number;
}

export default function GaugeChart({ value, max, label, unit = "%", color = "hsl(160,84%,39%)", size = 140 }: GaugeChartProps) {
  const pct = Math.min(value / max, 1);
  const r = (size - 20) / 2;
  const circumference = Math.PI * r;
  const offset = circumference * (1 - pct);

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size / 2 + 20} viewBox={`0 0 ${size} ${size / 2 + 20}`}>
        <path
          d={`M 10 ${size / 2 + 10} A ${r} ${r} 0 0 1 ${size - 10} ${size / 2 + 10}`}
          fill="none"
          stroke="currentColor"
          className="text-secondary"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d={`M 10 ${size / 2 + 10} A ${r} ${r} 0 0 1 ${size - 10} ${size / 2 + 10}`}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700"
        />
        <text x={size / 2} y={size / 2} textAnchor="middle" className="fill-foreground text-2xl font-bold" fontSize="24">
          {value.toFixed(1)}
        </text>
        <text x={size / 2} y={size / 2 + 16} textAnchor="middle" className="fill-muted-foreground" fontSize="10">
          {unit}
        </text>
      </svg>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}
