import {
  Battery, Cpu, Thermometer, Plug, MapPin, AlertTriangle,
  User, Bell, BarChart3, Zap, Activity, TrendingUp, Gauge
} from "lucide-react";
import { useEVData } from "@/hooks/useEVData";
import MetricCard from "@/components/MetricCard";
import GaugeChart from "@/components/GaugeChart";
import StatusBadge from "@/components/StatusBadge";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from "recharts";

export default function OverviewPage() {
  const data = useEVData();

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-sm text-muted-foreground">Real-time EV monitoring system</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard title="State of Charge" value={data.battery.soc} unit="%" icon={Battery} color="text-neon-green" trend="up" trendValue="2.3% / hr" />
        <MetricCard title="Motor Power" value={data.motor.power} unit="kW" icon={Zap} color="text-neon-blue" trend="neutral" trendValue="Stable" />
        <MetricCard title="Range" value={data.battery.estimatedRange} unit="km" icon={Gauge} color="text-neon-purple" trend="down" trendValue="-5 km" />
        <MetricCard title="Eco Score" value={data.driver.ecoScore} unit="/100" icon={TrendingUp} color="text-neon-cyan" trend="up" trendValue="+3 pts" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-card p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Battery SoC History</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={data.battery.history}>
              <defs>
                <linearGradient id="socGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(160,84%,39%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(160,84%,39%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222,30%,16%)" />
              <XAxis dataKey="time" tick={{ fontSize: 10 }} stroke="hsl(215,20%,55%)" />
              <YAxis tick={{ fontSize: 10 }} stroke="hsl(215,20%,55%)" />
              <Tooltip contentStyle={{ backgroundColor: "hsl(222,47%,9%)", border: "1px solid hsl(222,30%,16%)", borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="soc" stroke="hsl(160,84%,39%)" fill="url(#socGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-card p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Energy Consumption (Weekly)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data.analytics.dailyEnergy}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222,30%,16%)" />
              <XAxis dataKey="day" tick={{ fontSize: 10 }} stroke="hsl(215,20%,55%)" />
              <YAxis tick={{ fontSize: 10 }} stroke="hsl(215,20%,55%)" />
              <Tooltip contentStyle={{ backgroundColor: "hsl(222,47%,9%)", border: "1px solid hsl(222,30%,16%)", borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="kwh" fill="hsl(200,100%,50%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gauges + Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-4 flex flex-col items-center">
          <GaugeChart value={data.battery.soc} max={100} label="State of Charge" />
        </div>
        <div className="glass-card p-4 flex flex-col items-center">
          <GaugeChart value={data.battery.soh} max={100} label="Battery Health" color="hsl(200,100%,50%)" />
        </div>
        <div className="glass-card p-4 flex flex-col items-center">
          <GaugeChart value={data.motor.efficiency} max={100} label="Motor Efficiency" color="hsl(260,60%,55%)" />
        </div>
      </div>

      {/* Module Status Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { icon: Battery, title: "Battery System", status: data.battery.temperature > 40 ? "warning" : "ok", detail: `${data.battery.temperature.toFixed(1)}°C` },
          { icon: Cpu, title: "Motor & Drivetrain", status: data.motor.temperature > 100 ? "critical" : "ok", detail: `${data.motor.rpm} RPM` },
          { icon: Thermometer, title: "Thermal System", status: data.thermal.thermalRunawayRisk > 10 ? "warning" : "ok", detail: `Risk: ${data.thermal.thermalRunawayRisk.toFixed(1)}%` },
          { icon: Plug, title: "Charging", status: data.charging.faults.length > 0 ? "critical" : data.charging.isCharging ? "info" : "ok", detail: data.charging.isCharging ? `${data.charging.power.toFixed(0)} kW` : "Not charging" },
          { icon: MapPin, title: "GPS & Fleet", status: "ok", detail: `${data.gps.speed.toFixed(0)} km/h` },
          { icon: AlertTriangle, title: "Diagnostics", status: data.diagnostics.faultCodes.some(f => f.severity === "critical") ? "critical" : "ok", detail: `${data.diagnostics.faultCodes.length} codes` },
        ].map((mod) => (
          <div key={mod.title} className="glass-card-hover p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary/50">
                <mod.icon className="w-4 h-4 text-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{mod.title}</p>
                <p className="text-xs text-muted-foreground">{mod.detail}</p>
              </div>
            </div>
            <StatusBadge status={mod.status} pulse />
          </div>
        ))}
      </div>

      {/* Recent Alerts */}
      <div className="glass-card p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">Recent Alerts</h3>
        <div className="space-y-2">
          {data.alerts.slice(0, 4).map((alert) => (
            <div key={alert.id} className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/30">
              <div className="flex items-center gap-3">
                <StatusBadge status={alert.severity} pulse />
                <span className="text-xs text-foreground">{alert.message}</span>
              </div>
              <span className="text-[10px] text-muted-foreground">{alert.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
