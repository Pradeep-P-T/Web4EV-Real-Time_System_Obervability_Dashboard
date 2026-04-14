import { Plug, Zap, Clock, DollarSign, AlertTriangle } from "lucide-react";
import { useEVData } from "@/hooks/useEVData";
import MetricCard from "@/components/MetricCard";
import SectionHeader from "@/components/SectionHeader";
import StatusBadge from "@/components/StatusBadge";

export default function ChargingPage() {
  const { charging } = useEVData();

  return (
    <div className="space-y-6 animate-slide-up">
      <SectionHeader title="Charging Infrastructure" subtitle="Active session monitoring and smart scheduling" icon={Plug} />

      <div className="glass-card p-4 flex items-center gap-4">
        <div className={`w-3 h-3 rounded-full ${charging.isCharging ? "bg-emerald-400 animate-pulse" : "bg-muted-foreground"}`} />
        <div>
          <p className="text-sm font-semibold text-foreground">{charging.isCharging ? "Charging Active" : "Not Charging"}</p>
          <p className="text-xs text-muted-foreground">{charging.type} · {charging.isCharging ? `${charging.power.toFixed(0)} kW` : "Disconnected"}</p>
        </div>
        <StatusBadge status={charging.isCharging ? "info" : "ok"} label={charging.type} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard title="Power" value={charging.power} unit="kW" icon={Zap} color="text-neon-green" />
        <MetricCard title="Voltage" value={charging.voltage} unit="V" icon={Zap} color="text-neon-yellow" />
        <MetricCard title="Current" value={charging.current} unit="A" icon={Zap} color="text-neon-blue" />
        <MetricCard title="ETA" value={charging.eta} unit="min" icon={Clock} color="text-neon-purple" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-4">
          <p className="text-xs text-muted-foreground">Session Energy</p>
          <p className="text-2xl font-bold text-foreground">{charging.sessionEnergy.toFixed(1)} <span className="text-sm text-muted-foreground">kWh</span></p>
        </div>
        <div className="glass-card p-4">
          <p className="text-xs text-muted-foreground">Charging Cost</p>
          <p className="text-2xl font-bold text-neon-green">${charging.cost.toFixed(2)}</p>
          <p className="text-[10px] text-muted-foreground">${charging.costPerKwh.toFixed(2)} / kWh</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-xs text-muted-foreground">Smart Schedule</p>
          <p className="text-lg font-bold text-foreground">{charging.scheduledTime}</p>
          <p className="text-[10px] text-muted-foreground">Off-peak charging</p>
        </div>
      </div>

      {charging.faults.length > 0 && (
        <div className="glass-card p-4 border-red-500/30">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <h3 className="text-sm font-semibold text-red-400">Charger Faults</h3>
          </div>
          <div className="space-y-1">
            {charging.faults.map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-red-300">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                {f}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
