import { BarChart3, TrendingDown, Leaf, DollarSign } from "lucide-react";
import { useEVData } from "@/hooks/useEVData";
import MetricCard from "@/components/MetricCard";
import SectionHeader from "@/components/SectionHeader";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

export default function AnalyticsPage() {
  const { analytics } = useEVData();

  return (
    <div className="space-y-6 animate-slide-up">
      <SectionHeader title="Analytics & Reporting" subtitle="Energy consumption, cost analysis, and environmental impact" icon={BarChart3} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard title="Cost per km" value={`$${analytics.costPerKm.toFixed(3)}`} icon={DollarSign} color="text-neon-green" />
        <MetricCard title="CO₂ Saved" value={analytics.totalCO2Saved} unit="kg" icon={Leaf} color="text-neon-cyan" />
        <MetricCard title="Total Distance" value={(analytics.totalDistance / 1000).toFixed(1)} unit="k km" icon={TrendingDown} color="text-neon-blue" />
        <MetricCard title="Weekly Avg" value={(analytics.dailyEnergy.reduce((s, d) => s + d.kwh, 0) / 7).toFixed(1)} unit="kWh/day" icon={BarChart3} color="text-neon-purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-card p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Daily Energy Consumption</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={analytics.dailyEnergy}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222,30%,16%)" />
              <XAxis dataKey="day" tick={{ fontSize: 10 }} stroke="hsl(215,20%,55%)" />
              <YAxis tick={{ fontSize: 10 }} stroke="hsl(215,20%,55%)" />
              <Tooltip contentStyle={{ backgroundColor: "hsl(222,47%,9%)", border: "1px solid hsl(222,30%,16%)", borderRadius: 8, fontSize: 11 }} />
              <Bar dataKey="kwh" fill="hsl(160,84%,39%)" radius={[4, 4, 0, 0]} name="kWh" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-card p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Cost & CO₂ Trends</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={analytics.dailyEnergy}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222,30%,16%)" />
              <XAxis dataKey="day" tick={{ fontSize: 10 }} stroke="hsl(215,20%,55%)" />
              <YAxis yAxisId="cost" tick={{ fontSize: 10 }} stroke="hsl(215,20%,55%)" />
              <YAxis yAxisId="co2" orientation="right" tick={{ fontSize: 10 }} stroke="hsl(215,20%,55%)" />
              <Tooltip contentStyle={{ backgroundColor: "hsl(222,47%,9%)", border: "1px solid hsl(222,30%,16%)", borderRadius: 8, fontSize: 11 }} />
              <Line yAxisId="cost" type="monotone" dataKey="cost" stroke="hsl(45,93%,47%)" strokeWidth={2} dot={false} name="Cost ($)" />
              <Line yAxisId="co2" type="monotone" dataKey="co2" stroke="hsl(160,84%,39%)" strokeWidth={2} dot={false} name="CO₂ Saved (kg)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-card p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">Export Reports</h3>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary text-sm font-medium hover:bg-primary/20 transition-colors">
            Export CSV
          </button>
          <button className="px-4 py-2 rounded-lg bg-secondary/50 border border-border/50 text-foreground text-sm font-medium hover:bg-secondary/70 transition-colors">
            Export PDF
          </button>
        </div>
      </div>
    </div>
  );
}
