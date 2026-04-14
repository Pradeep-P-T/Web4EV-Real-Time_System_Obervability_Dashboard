import { useState, useEffect, useCallback } from "react";

const rand = (min: number, max: number) => Math.random() * (max - min) + min;
const randInt = (min: number, max: number) => Math.floor(rand(min, max));

export interface BatteryData {
  soc: number;
  soh: number;
  voltage: number;
  current: number;
  temperature: number;
  cellTemps: number[];
  cellVoltages: number[];
  chargeRate: number;
  dischargeRate: number;
  cycleCount: number;
  energyConsumed: number;
  estimatedRange: number;
  estimatedLifespan: number;
  history: { time: string; soc: number; soh: number; voltage: number; temp: number }[];
}

export interface MotorData {
  rpm: number;
  torque: number;
  power: number;
  temperature: number;
  efficiency: number;
  regenBraking: number;
  driveMode: "Eco" | "Normal" | "Sport";
  wheelSpeedFL: number;
  wheelSpeedFR: number;
  wheelSpeedRL: number;
  wheelSpeedRR: number;
  inverterEfficiency: number;
  switchingLosses: number;
}

export interface ThermalData {
  coolantTemp: number;
  hvacPower: number;
  thermalRunawayRisk: number;
  ambientTemp: number;
  internalTemp: number;
  preConditioning: boolean;
  cabinClimateState: string;
  flowRate: number;
  history: { time: string; coolant: number; ambient: number; internal: number }[];
}

export interface ChargingData {
  isCharging: boolean;
  power: number;
  voltage: number;
  current: number;
  eta: number;
  type: "AC" | "DC Fast";
  cost: number;
  costPerKwh: number;
  sessionEnergy: number;
  scheduledTime: string;
  faults: string[];
}

export interface GPSData {
  lat: number;
  lng: number;
  speed: number;
  heading: number;
  altitude: number;
  tripDistance: number;
  predictedRange: number;
  geofenceAlerts: string[];
  fleetVehicles: { id: string; lat: number; lng: number; status: string; soc: number }[];
}

export interface DiagnosticsData {
  faultCodes: { code: string; desc: string; severity: string; time: string }[];
  sensorHealth: { name: string; status: string; value: number }[];
  predictiveAlerts: { component: string; risk: number; recommendation: string }[];
  otaStatus: { version: string; status: string; progress: number };
}

export interface DriverData {
  ecoScore: number;
  harshBraking: number;
  harshAcceleration: number;
  avgSpeed: number;
  maxSpeed: number;
  idleTime: number;
  speedProfile: { time: string; speed: number }[];
}

export interface AlertItem {
  id: string;
  message: string;
  severity: "info" | "warning" | "critical";
  time: string;
  acknowledged: boolean;
}

export interface AnalyticsData {
  dailyEnergy: { day: string; kwh: number; cost: number; co2: number }[];
  costPerKm: number;
  totalCO2Saved: number;
  totalDistance: number;
}

export interface EVData {
  battery: BatteryData;
  motor: MotorData;
  thermal: ThermalData;
  charging: ChargingData;
  gps: GPSData;
  diagnostics: DiagnosticsData;
  driver: DriverData;
  alerts: AlertItem[];
  analytics: AnalyticsData;
  timestamp: number;
}

const faultCodesPool = [
  { code: "P0A80", desc: "Replace Hybrid Battery Pack", severity: "critical" },
  { code: "P0A1F", desc: "HV Battery Imbalance", severity: "warning" },
  { code: "P0562", desc: "System Voltage Low", severity: "warning" },
  { code: "P0AC0", desc: "Hybrid Battery Sensor Circuit", severity: "info" },
  { code: "U0100", desc: "Lost Communication with ECM", severity: "critical" },
  { code: "P0A09", desc: "DC/DC Converter Status", severity: "info" },
];

const generateTime = (i: number) => {
  const d = new Date();
  d.setSeconds(d.getSeconds() - (30 - i) * 2);
  return d.toLocaleTimeString();
};

let baseLat = 37.7749;
let baseLng = -122.4194;

export function useEVData(intervalMs = 1500): EVData {
  const generate = useCallback((): EVData => {
    const now = new Date();
    baseLat += rand(-0.0005, 0.0005);
    baseLng += rand(-0.0005, 0.0005);

    const soc = rand(20, 95);
    const history = Array.from({ length: 30 }, (_, i) => ({
      time: generateTime(i),
      soc: rand(20, 95),
      soh: rand(85, 98),
      voltage: rand(350, 410),
      temp: rand(20, 45),
    }));

    return {
      battery: {
        soc,
        soh: rand(88, 98),
        voltage: rand(350, 410),
        current: rand(-150, 200),
        temperature: rand(22, 42),
        cellTemps: Array.from({ length: 12 }, () => rand(20, 45)),
        cellVoltages: Array.from({ length: 12 }, () => rand(3.2, 4.2)),
        chargeRate: rand(0, 150),
        dischargeRate: rand(0, 80),
        cycleCount: randInt(200, 1200),
        energyConsumed: rand(5, 25),
        estimatedRange: soc * rand(3, 4.5),
        estimatedLifespan: rand(6, 15),
        history,
      },
      motor: {
        rpm: randInt(0, 12000),
        torque: rand(0, 400),
        power: rand(0, 250),
        temperature: rand(40, 120),
        efficiency: rand(85, 98),
        regenBraking: rand(0, 60),
        driveMode: (["Eco", "Normal", "Sport"] as const)[randInt(0, 3)],
        wheelSpeedFL: rand(0, 160),
        wheelSpeedFR: rand(0, 160),
        wheelSpeedRL: rand(0, 160),
        wheelSpeedRR: rand(0, 160),
        inverterEfficiency: rand(92, 99),
        switchingLosses: rand(0.5, 3),
      },
      thermal: {
        coolantTemp: rand(30, 80),
        hvacPower: rand(0.5, 5),
        thermalRunawayRisk: rand(0, 15),
        ambientTemp: rand(10, 38),
        internalTemp: rand(20, 45),
        preConditioning: Math.random() > 0.7,
        cabinClimateState: Math.random() > 0.5 ? "Cooling" : "Heating",
        flowRate: rand(2, 12),
        history: Array.from({ length: 30 }, (_, i) => ({
          time: generateTime(i),
          coolant: rand(30, 80),
          ambient: rand(10, 38),
          internal: rand(20, 45),
        })),
      },
      charging: {
        isCharging: Math.random() > 0.5,
        power: rand(7, 250),
        voltage: rand(200, 800),
        current: rand(10, 500),
        eta: randInt(10, 120),
        type: Math.random() > 0.5 ? "DC Fast" : "AC",
        cost: rand(2, 30),
        costPerKwh: rand(0.1, 0.4),
        sessionEnergy: rand(5, 70),
        scheduledTime: "02:00 AM",
        faults: Math.random() > 0.8 ? ["Communication Error", "Over-temperature"] : [],
      },
      gps: {
        lat: baseLat,
        lng: baseLng,
        speed: rand(0, 120),
        heading: rand(0, 360),
        altitude: rand(0, 500),
        tripDistance: rand(5, 80),
        predictedRange: rand(100, 400),
        geofenceAlerts: Math.random() > 0.8 ? ["Vehicle left Zone A"] : [],
        fleetVehicles: [
          { id: "EV-001", lat: baseLat + 0.01, lng: baseLng + 0.01, status: "Active", soc: rand(30, 90) },
          { id: "EV-002", lat: baseLat - 0.02, lng: baseLng + 0.02, status: "Charging", soc: rand(10, 60) },
          { id: "EV-003", lat: baseLat + 0.015, lng: baseLng - 0.01, status: "Idle", soc: rand(50, 95) },
        ],
      },
      diagnostics: {
        faultCodes: faultCodesPool.slice(0, randInt(1, 5)).map((f) => ({ ...f, time: now.toLocaleTimeString() })),
        sensorHealth: [
          { name: "Battery Temp Sensor", status: rand(0, 1) > 0.1 ? "OK" : "Degraded", value: rand(90, 100) },
          { name: "Motor Position Sensor", status: rand(0, 1) > 0.1 ? "OK" : "Degraded", value: rand(85, 100) },
          { name: "Coolant Flow Sensor", status: rand(0, 1) > 0.2 ? "OK" : "Fault", value: rand(70, 100) },
          { name: "Wheel Speed Sensor", status: "OK", value: rand(95, 100) },
          { name: "GPS Module", status: "OK", value: rand(90, 100) },
          { name: "Accelerometer", status: rand(0, 1) > 0.05 ? "OK" : "Degraded", value: rand(88, 100) },
        ],
        predictiveAlerts: [
          { component: "Battery Pack", risk: rand(5, 30), recommendation: "Schedule inspection in 2 months" },
          { component: "Brake Pads", risk: rand(20, 60), recommendation: "Replace within 10,000 km" },
          { component: "Coolant System", risk: rand(2, 15), recommendation: "Flush coolant at next service" },
        ],
        otaStatus: { version: "v3.2.1", status: Math.random() > 0.7 ? "Downloading" : "Up to date", progress: randInt(0, 100) },
      },
      driver: {
        ecoScore: rand(60, 98),
        harshBraking: randInt(0, 8),
        harshAcceleration: randInt(0, 6),
        avgSpeed: rand(30, 70),
        maxSpeed: rand(80, 160),
        idleTime: rand(2, 30),
        speedProfile: Array.from({ length: 30 }, (_, i) => ({
          time: generateTime(i),
          speed: rand(0, 120),
        })),
      },
      alerts: [
        { id: "1", message: "Battery temperature above optimal range", severity: "warning", time: now.toLocaleTimeString(), acknowledged: false },
        { id: "2", message: "Regenerative braking efficiency decreased", severity: "info", time: now.toLocaleTimeString(), acknowledged: true },
        { id: "3", message: "Motor overheating risk detected", severity: "critical", time: now.toLocaleTimeString(), acknowledged: false },
        { id: "4", message: "Scheduled maintenance due in 500 km", severity: "info", time: now.toLocaleTimeString(), acknowledged: false },
        ...(Math.random() > 0.6 ? [{ id: "5", message: "Geofence boundary crossed", severity: "warning" as const, time: now.toLocaleTimeString(), acknowledged: false }] : []),
      ],
      analytics: {
        dailyEnergy: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => ({
          day,
          kwh: rand(15, 60),
          cost: rand(3, 15),
          co2: rand(5, 25),
        })),
        costPerKm: rand(0.03, 0.12),
        totalCO2Saved: rand(500, 3000),
        totalDistance: rand(10000, 80000),
      },
      timestamp: Date.now(),
    };
  }, []);

  const [data, setData] = useState<EVData>(generate);

  useEffect(() => {
    const interval = setInterval(() => setData(generate()), intervalMs);
    return () => clearInterval(interval);
  }, [generate, intervalMs]);

  return data;
}
