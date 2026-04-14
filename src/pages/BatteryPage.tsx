import { Battery, Zap, Activity, Heart, Flame, BarChart3 } from "lucide-react";
import { useEVData } from "@/hooks/useEVData";
import MetricCard from "@/components/MetricCard";
import GaugeChart from "@/components/GaugeChart";
import SectionHeader from "@/components/SectionHeader";
import {
  AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

export default function BatteryPage() {
  const { battery } = useEVData();

  return (
    <div className="space-y-6 animate-slide-up">
      <SectionHeader title="Battery & Energy Management" subtitle="Real-time battery monitoring and analytics" icon={Battery} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard title="State of Charge" value={battery.soc} unit="%" icon={Battery} color="text-neon-green" />
        <MetricCard title="State of Health" value={battery.soh} unit="%" icon={Heart} color="text-neon-blue" />
        <MetricCard title="Voltage" value={battery.voltage} unit="V" icon={Zap} color="text-neon-yellow" />
        <MetricCard title="Temperature" value={battery.temperature} unit="°C" icon={Flame} color={battery.temperature > 40 ? "text-neon-red" : "text-neon-cyan"} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard title="Current" value={battery.current} unit="A" icon={Activity} color="text-neon-purple" />
        <MetricCard title="Charge Rate" value={battery.chargeRate} unit="kW" icon={Zap} color="text-neon-green" />
        <MetricCard title="Energy Used" value={battery.energyConsumed} unit="kWh" icon={BarChart3} color="text-neon-orange" />
        <MetricCard title="Cycle Count" value={battery.cycleCount} unit="cycles" icon={Activity} color="text-muted-foreground" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-4 flex flex-col items-center">
          <GaugeChart value={battery.soc} max={100} label="State of Charge" />
        </div>
        <div className="glass-card p-4 flex flex-col items-center">
          <GaugeChart value={battery.soh} max={100} label="Battery Health" color="hsl(200,100%,50%)" />
        </div>
        <div className="glass-card p-4 flex flex-col items-center">
          <GaugeChart value={battery.estimatedRange} max={500} label="Est. Range (km)" unit="km" color="hsl(260,60%,55%)" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-card p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">SoC & SoH History</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={battery.history}>
              <defs>
                <linearGradient id="socG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(160,84%,39%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(160,84%,39%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222,30%,16%)" />
              <XAxis dataKey="time" tick={{ fontSize: 9 }} stroke="hsl(215,20%,55%)" />
              <YAxis tick={{ fontSize: 9 }} stroke="hsl(215,20%,55%)" />
              <Tooltip contentStyle={{ backgroundColor: "hsl(222,47%,9%)", border: "1px solid hsl(222,30%,16%)", borderRadius: 8, fontSize: 11 }} />
              <Area type="monotone" dataKey="soc" stroke="hsl(160,84%,39%)" fill="url(#socG)" strokeWidth={2} />
              <Area type="monotone" dataKey="soh" stroke="hsl(200,100%,50%)" fill="none" strokeWidth={2} strokeDasharray="4 4" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-card p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Voltage & Temperature</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={battery.history}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222,30%,16%)" />
              <XAxis dataKey="time" tick={{ fontSize: 9 }} stroke="hsl(215,20%,55%)" />
              <YAxis yAxisId="v" tick={{ fontSize: 9 }} stroke="hsl(215,20%,55%)" />
              <YAxis yAxisId="t" orientation="right" tick={{ fontSize: 9 }} stroke="hsl(215,20%,55%)" />
              <Tooltip contentStyle={{ backgroundColor: "hsl(222,47%,9%)", border: "1px solid hsl(222,30%,16%)", borderRadius: 8, fontSize: 11 }} />
              <Line yAxisId="v" type="monotone" dataKey="voltage" stroke="hsl(45,93%,47%)" strokeWidth={2} dot={false} />
              <Line yAxisId="t" type="monotone" dataKey="temp" stroke="hsl(0,72%,51%)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cell Heatmap */}
      <div className="glass-card p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">Cell Voltage & Temperature Heatmap</h3>
        <div className="grid grid-cols-6 gap-2">
          {battery.cellTemps.map((temp, i) => {
            const hue = Math.max(0, 120 - (temp - 20) * 4.8);
            return (
              <div key={i} className="rounded-lg p-3 text-center border border-border/30" style={{ backgroundColor: `hsla(${hue}, 80%, 40%, 0.2)` }}>
                <p className="text-[10px] text-muted-foreground">Cell {i + 1}</p>
                <p className="text-sm font-bold text-foreground">{temp.toFixed(1)}°C</p>
                <p className="text-[10px] text-muted-foreground">{battery.cellVoltages[i].toFixed(2)}V</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="glass-card p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Estimated Lifespan</p>
            <p className="text-xl font-bold text-foreground">{battery.estimatedLifespan.toFixed(1)} years</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Est. Range</p>
            <p className="text-xl font-bold text-neon-green">{battery.estimatedRange.toFixed(0)} km</p>
          </div>
        </div>
      </div>
    </div>
  );
}
