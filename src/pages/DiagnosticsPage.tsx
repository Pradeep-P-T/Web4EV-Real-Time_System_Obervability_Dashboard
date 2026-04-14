import { AlertTriangle, Activity, Shield, Download } from "lucide-react";
import { useEVData } from "@/hooks/useEVData";
import SectionHeader from "@/components/SectionHeader";
import StatusBadge from "@/components/StatusBadge";

export default function DiagnosticsPage() {
  const { diagnostics } = useEVData();

  return (
    <div className="space-y-6 animate-slide-up">
      <SectionHeader title="Diagnostics & Fault Management" subtitle="OBD-II codes, sensor health, and predictive maintenance" icon={AlertTriangle} />

      {/* Fault Codes */}
      <div className="glass-card p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">Active Fault Codes</h3>
        <div className="space-y-2">
          {diagnostics.faultCodes.map((f, i) => (
            <div key={i} className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/30">
              <div className="flex items-center gap-3">
                <code className="text-xs font-mono text-foreground bg-secondary/50 px-2 py-0.5 rounded">{f.code}</code>
                <span className="text-xs text-muted-foreground">{f.desc}</span>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={f.severity} pulse />
                <span className="text-[10px] text-muted-foreground">{f.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sensor Health */}
      <div className="glass-card p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">Sensor Health Status</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {diagnostics.sensorHealth.map((s, i) => (
            <div key={i} className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/30">
              <div className="flex items-center gap-2">
                <Activity className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-foreground">{s.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-16 h-1.5 bg-secondary/50 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${s.value}%` }} />
                </div>
                <StatusBadge status={s.status} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Predictive Maintenance */}
      <div className="glass-card p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">Predictive Maintenance</h3>
        <div className="space-y-3">
          {diagnostics.predictiveAlerts.map((p, i) => (
            <div key={i} className="p-3 rounded-lg bg-secondary/30 border border-border/30">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-foreground">{p.component}</span>
                <span className={`text-xs font-bold ${p.risk > 40 ? "text-amber-400" : "text-emerald-400"}`}>{p.risk.toFixed(0)}% risk</span>
              </div>
              <div className="h-2 bg-secondary/50 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${p.risk}%`,
                    background: p.risk > 40 ? "hsl(45,93%,47%)" : "hsl(160,84%,39%)",
                  }}
                />
              </div>
              <p className="text-[10px] text-muted-foreground">{p.recommendation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* OTA */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Download className="w-4 h-4 text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">OTA Update</p>
              <p className="text-xs text-muted-foreground">{diagnostics.otaStatus.version} · {diagnostics.otaStatus.status}</p>
            </div>
          </div>
          {diagnostics.otaStatus.status === "Downloading" && (
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-secondary/50 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${diagnostics.otaStatus.progress}%` }} />
              </div>
              <span className="text-xs text-muted-foreground">{diagnostics.otaStatus.progress}%</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
