import { Thermometer, Wind, AlertTriangle, Droplets } from "lucide-react";
import { useEVData } from "@/hooks/useEVData";
import MetricCard from "@/components/MetricCard";
import SectionHeader from "@/components/SectionHeader";
import StatusBadge from "@/components/StatusBadge";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

export default function ThermalPage() {
  const { thermal } = useEVData();

  return (
    <div className="space-y-6 animate-slide-up">
      <SectionHeader title="Thermal Management System" subtitle="Cooling, HVAC, and thermal safety monitoring" icon={Thermometer} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard title="Coolant Temp" value={thermal.coolantTemp} unit="°C" icon={Droplets} color="text-neon-blue" />
        <MetricCard title="HVAC Power" value={thermal.hvacPower} unit="kW" icon={Wind} color="text-neon-purple" />
        <MetricCard title="Ambient Temp" value={thermal.ambientTemp} unit="°C" icon={Thermometer} color="text-neon-cyan" />
        <MetricCard title="Internal Temp" value={thermal.internalTemp} unit="°C" icon={Thermometer} color="text-neon-orange" />
      </div>

      {/* Thermal Runaway Risk */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground">Thermal Runaway Risk</h3>
          <StatusBadge status={thermal.thermalRunawayRisk > 10 ? "warning" : "ok"} label={`${thermal.thermalRunawayRisk.toFixed(1)}%`} pulse />
        </div>
        <div className="h-4 bg-secondary/50 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${thermal.thermalRunawayRisk}%`,
              background: thermal.thermalRunawayRisk > 10
                ? "linear-gradient(90deg, hsl(45,93%,47%), hsl(0,72%,51%))"
                : "hsl(160,84%,39%)",
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-card p-4">
          <h3 className="text-sm font-semibold text-foreground mb-2">Pre-conditioning</h3>
          <div className="flex items-center gap-3">
            <StatusBadge status={thermal.preConditioning ? "info" : "ok"} label={thermal.preConditioning ? "Active" : "Off"} pulse />
            <span className="text-xs text-muted-foreground">{thermal.cabinClimateState}</span>
          </div>
        </div>
        <div className="glass-card p-4">
          <h3 className="text-sm font-semibold text-foreground mb-2">Coolant Flow Rate</h3>
          <p className="text-2xl font-bold text-foreground">{thermal.flowRate.toFixed(1)} <span className="text-sm text-muted-foreground">L/min</span></p>
        </div>
      </div>

      <div className="glass-card p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">Ambient vs Internal Temperature</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={thermal.history}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222,30%,16%)" />
            <XAxis dataKey="time" tick={{ fontSize: 9 }} stroke="hsl(215,20%,55%)" />
            <YAxis tick={{ fontSize: 9 }} stroke="hsl(215,20%,55%)" />
            <Tooltip contentStyle={{ backgroundColor: "hsl(222,47%,9%)", border: "1px solid hsl(222,30%,16%)", borderRadius: 8, fontSize: 11 }} />
            <Line type="monotone" dataKey="coolant" stroke="hsl(200,100%,50%)" strokeWidth={2} dot={false} name="Coolant" />
            <Line type="monotone" dataKey="ambient" stroke="hsl(160,84%,39%)" strokeWidth={2} dot={false} name="Ambient" />
            <Line type="monotone" dataKey="internal" stroke="hsl(25,95%,53%)" strokeWidth={2} dot={false} name="Internal" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
