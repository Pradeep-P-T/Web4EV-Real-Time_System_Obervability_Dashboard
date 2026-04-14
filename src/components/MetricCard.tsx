import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  color?: string;
  className?: string;
}

export default function MetricCard({ title, value, unit, icon: Icon, trend, trendValue, color = "text-primary", className = "" }: MetricCardProps) {
  return (
    <div className={`glass-card-hover p-4 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-1">
            <span className={`text-2xl font-bold ${color}`}>
              {typeof value === "number" ? value.toFixed(1) : value}
            </span>
            {unit && <span className="text-xs text-muted-foreground">{unit}</span>}
          </div>
          {trendValue && (
            <p className={`text-[10px] font-medium ${trend === "up" ? "text-emerald-400" : trend === "down" ? "text-red-400" : "text-muted-foreground"}`}>
              {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {trendValue}
            </p>
          )}
        </div>
        <div className={`p-2 rounded-lg bg-secondary/50 ${color}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
