import { Bell, Check, Filter } from "lucide-react";
import { useEVData } from "@/hooks/useEVData";
import SectionHeader from "@/components/SectionHeader";
import StatusBadge from "@/components/StatusBadge";
import { useState } from "react";

export default function AlertsPage() {
  const { alerts } = useEVData();
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all" ? alerts : alerts.filter((a) => a.severity === filter);

  return (
    <div className="space-y-6 animate-slide-up">
      <SectionHeader title="Alerts & Notifications" subtitle="Real-time alert management" icon={Bell} />

      <div className="flex items-center gap-2 flex-wrap">
        {["all", "info", "warning", "critical"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              filter === f
                ? "bg-primary/10 border-primary/30 text-primary"
                : "bg-secondary/30 border-border/50 text-muted-foreground hover:text-foreground"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((alert) => (
          <div key={alert.id} className={`glass-card p-4 flex items-center justify-between transition-all ${
            alert.severity === "critical" ? "border-red-500/20" : alert.severity === "warning" ? "border-amber-500/20" : ""
          }`}>
            <div className="flex items-center gap-3">
              <StatusBadge status={alert.severity} pulse />
              <div>
                <p className="text-sm text-foreground">{alert.message}</p>
                <p className="text-[10px] text-muted-foreground">{alert.time}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {alert.acknowledged && (
                <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                  <Check className="w-3 h-3" /> Ack
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-foreground font-medium">Alert Summary</p>
          <div className="flex items-center gap-3">
            <span className="text-xs text-red-400">{alerts.filter((a) => a.severity === "critical").length} Critical</span>
            <span className="text-xs text-amber-400">{alerts.filter((a) => a.severity === "warning").length} Warning</span>
            <span className="text-xs text-blue-400">{alerts.filter((a) => a.severity === "info").length} Info</span>
          </div>
        </div>
      </div>
    </div>
  );
}
