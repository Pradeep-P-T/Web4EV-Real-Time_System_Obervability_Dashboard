import { Cpu, Gauge, Zap, Thermometer, Activity, RotateCcw } from "lucide-react";
import { useEVData } from "@/hooks/useEVData";
import MetricCard from "@/components/MetricCard";
import SectionHeader from "@/components/SectionHeader";
import StatusBadge from "@/components/StatusBadge";

export default function MotorPage() {
  const { motor } = useEVData();

  return (
    <div className="space-y-6 animate-slide-up">
      <SectionHeader title="Motor & Drivetrain Monitoring" subtitle="Live motor performance metrics" icon={Cpu} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard title="RPM" value={motor.rpm} unit="rpm" icon={Gauge} color="text-neon-blue" />
        <MetricCard title="Torque" value={motor.torque} unit="Nm" icon={Activity} color="text-neon-purple" />
        <MetricCard title="Power Output" value={motor.power} unit="kW" icon={Zap} color="text-neon-green" />
        <MetricCard title="Temperature" value={motor.temperature} unit="°C" icon={Thermometer} color={motor.temperature > 100 ? "text-neon-red" : "text-neon-cyan"} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <MetricCard title="Efficiency" value={motor.efficiency} unit="%" icon={Activity} color="text-neon-green" />
        <MetricCard title="Regen Braking" value={motor.regenBraking} unit="kW" icon={RotateCcw} color="text-neon-cyan" />
        <MetricCard title="Inverter Eff." value={motor.inverterEfficiency} unit="%" icon={Zap} color="text-neon-yellow" />
      </div>

      {/* Drive Mode */}
      <div className="glass-card p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">Drive Mode</h3>
        <div className="flex gap-3">
          {(["Eco", "Normal", "Sport"] as const).map((mode) => (
            <div
              key={mode}
              className={`flex-1 py-3 rounded-lg text-center text-sm font-medium border transition-all ${
                motor.driveMode === mode
                  ? mode === "Eco" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                    : mode === "Normal" ? "bg-blue-500/10 border-blue-500/30 text-blue-400"
                    : "bg-red-500/10 border-red-500/30 text-red-400"
                  : "bg-secondary/30 border-border/50 text-muted-foreground"
              }`}
            >
              {mode}
            </div>
          ))}
        </div>
      </div>

      {/* Wheel Speed */}
      <div className="glass-card p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">Wheel Speed per Axle</h3>
        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
          {[
            { label: "FL", value: motor.wheelSpeedFL },
            { label: "FR", value: motor.wheelSpeedFR },
            { label: "RL", value: motor.wheelSpeedRL },
            { label: "RR", value: motor.wheelSpeedRR },
          ].map((w) => (
            <div key={w.label} className="rounded-lg p-3 bg-secondary/30 text-center border border-border/30">
              <p className="text-xs text-muted-foreground">{w.label}</p>
              <p className="text-lg font-bold text-foreground">{w.value.toFixed(0)}</p>
              <p className="text-[10px] text-muted-foreground">km/h</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-card p-4">
          <h3 className="text-sm font-semibold text-foreground mb-2">Motor Temperature</h3>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-3 bg-secondary/50 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${(motor.temperature / 150) * 100}%`,
                  background: motor.temperature > 100
                    ? "linear-gradient(90deg, hsl(45,93%,47%), hsl(0,72%,51%))"
                    : "linear-gradient(90deg, hsl(160,84%,39%), hsl(200,100%,50%))",
                }}
              />
            </div>
            <span className="text-sm font-bold text-foreground">{motor.temperature.toFixed(0)}°C</span>
            <StatusBadge status={motor.temperature > 100 ? "warning" : "ok"} label={motor.temperature > 100 ? "Hot" : "Normal"} pulse />
          </div>
        </div>
        <div className="glass-card p-4">
          <h3 className="text-sm font-semibold text-foreground mb-2">Switching Losses</h3>
          <p className="text-2xl font-bold text-foreground">{motor.switchingLosses.toFixed(2)} <span className="text-sm text-muted-foreground">kW</span></p>
        </div>
      </div>
    </div>
  );
}
