import { User, TrendingUp, AlertTriangle, Clock, Gauge } from "lucide-react";
import { useEVData } from "@/hooks/useEVData";
import MetricCard from "@/components/MetricCard";
import GaugeChart from "@/components/GaugeChart";
import SectionHeader from "@/components/SectionHeader";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function DriverPage() {
  const { driver } = useEVData();

  return (
    <div className="space-y-6 animate-slide-up">
      <SectionHeader title="Driver Behaviour Analytics" subtitle="Driving style analysis and eco scoring" icon={User} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-6 flex flex-col items-center md:col-span-1">
          <GaugeChart value={driver.ecoScore} max={100} label="Eco Score" color={driver.ecoScore > 80 ? "hsl(160,84%,39%)" : driver.ecoScore > 60 ? "hsl(45,93%,47%)" : "hsl(0,72%,51%)"} size={180} />
        </div>
        <div className="grid grid-cols-2 gap-4 md:col-span-2">
          <MetricCard title="Harsh Braking" value={driver.harshBraking} unit="events" icon={AlertTriangle} color="text-neon-red" />
          <MetricCard title="Harsh Accel." value={driver.harshAcceleration} unit="events" icon={TrendingUp} color="text-neon-orange" />
          <MetricCard title="Avg Speed" value={driver.avgSpeed} unit="km/h" icon={Gauge} color="text-neon-blue" />
          <MetricCard title="Idle Time" value={driver.idleTime} unit="min" icon={Clock} color="text-muted-foreground" />
        </div>
      </div>

      <div className="glass-card p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">Speed Profile</h3>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={driver.speedProfile}>
            <defs>
              <linearGradient id="speedGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(200,100%,50%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(200,100%,50%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222,30%,16%)" />
            <XAxis dataKey="time" tick={{ fontSize: 9 }} stroke="hsl(215,20%,55%)" />
            <YAxis tick={{ fontSize: 9 }} stroke="hsl(215,20%,55%)" />
            <Tooltip contentStyle={{ backgroundColor: "hsl(222,47%,9%)", border: "1px solid hsl(222,30%,16%)", borderRadius: 8, fontSize: 11 }} />
            <Area type="monotone" dataKey="speed" stroke="hsl(200,100%,50%)" fill="url(#speedGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="glass-card p-4">
        <p className="text-xs text-muted-foreground">Max Speed This Trip</p>
        <p className="text-3xl font-bold text-foreground">{driver.maxSpeed.toFixed(0)} <span className="text-sm text-muted-foreground">km/h</span></p>
      </div>
    </div>
  );
}
