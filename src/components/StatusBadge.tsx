interface StatusBadgeProps {
  status: "ok" | "warning" | "critical" | "info" | string;
  label?: string;
  pulse?: boolean;
}

const statusStyles: Record<string, string> = {
  ok: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  OK: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  warning: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  critical: "bg-red-500/10 text-red-400 border-red-500/20",
  info: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Degraded: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Fault: "bg-red-500/10 text-red-400 border-red-500/20",
  Active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Charging: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Idle: "bg-muted text-muted-foreground border-border",
};

export default function StatusBadge({ status, label, pulse }: StatusBadgeProps) {
  const style = statusStyles[status] || statusStyles.info;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium border ${style}`}>
      {pulse && <span className={`w-1.5 h-1.5 rounded-full ${status === "ok" || status === "OK" || status === "Active" ? "bg-emerald-400" : status === "warning" || status === "Degraded" ? "bg-amber-400" : status === "critical" || status === "Fault" ? "bg-red-400" : "bg-blue-400"} animate-pulse`} />}
      {label || status}
    </span>
  );
}
