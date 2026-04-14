import { useEffect, useRef } from "react";
import { MapPin, Navigation, Gauge } from "lucide-react";
import { useEVData } from "@/hooks/useEVData";
import MetricCard from "@/components/MetricCard";
import SectionHeader from "@/components/SectionHeader";
import StatusBadge from "@/components/StatusBadge";

export default function GPSPage() {
  const { gps } = useEVData();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    import("leaflet").then((L) => {
      const map = L.map(mapRef.current!, { zoomControl: false }).setView([gps.lat, gps.lng], 14);
      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
      }).addTo(map);

      const icon = L.divIcon({
        html: `<div style="width:16px;height:16px;border-radius:50%;background:hsl(160,84%,39%);border:3px solid white;box-shadow:0 0 10px hsl(160,84%,39%,0.5)"></div>`,
        iconSize: [16, 16],
        className: "",
      });
      markerRef.current = L.marker([gps.lat, gps.lng], { icon }).addTo(map);
      mapInstanceRef.current = map;
    });

    return () => {
      mapInstanceRef.current?.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setLatLng([gps.lat, gps.lng]);
    }
  }, [gps.lat, gps.lng]);

  return (
    <div className="space-y-6 animate-slide-up">
      <SectionHeader title="GPS & Fleet Tracking" subtitle="Live location and fleet management" icon={MapPin} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard title="Speed" value={gps.speed} unit="km/h" icon={Gauge} color="text-neon-green" />
        <MetricCard title="Trip Distance" value={gps.tripDistance} unit="km" icon={Navigation} color="text-neon-blue" />
        <MetricCard title="Altitude" value={gps.altitude} unit="m" icon={MapPin} color="text-neon-purple" />
        <MetricCard title="Predicted Range" value={gps.predictedRange} unit="km" icon={Gauge} color="text-neon-cyan" />
      </div>

      {/* Map */}
      <div className="glass-card overflow-hidden">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <div ref={mapRef} className="w-full h-[350px]" />
      </div>

      {/* Fleet */}
      <div className="glass-card p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">Fleet Vehicles</h3>
        <div className="space-y-2">
          {gps.fleetVehicles.map((v) => (
            <div key={v.id} className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/30">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-foreground">{v.id}</span>
                <StatusBadge status={v.status} pulse />
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground">SoC: {v.soc.toFixed(0)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {gps.geofenceAlerts.length > 0 && (
        <div className="glass-card p-4 border-amber-500/30">
          <h3 className="text-sm font-semibold text-amber-400 mb-2">Geofence Alerts</h3>
          {gps.geofenceAlerts.map((a, i) => (
            <p key={i} className="text-xs text-amber-300">{a}</p>
          ))}
        </div>
      )}
    </div>
  );
}
