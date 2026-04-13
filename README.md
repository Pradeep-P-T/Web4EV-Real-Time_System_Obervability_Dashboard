# ⚡ EV Real-Time Observability Dashboard

A production-grade, real-time Electric Vehicle monitoring SaaS dashboard built with React, Tailwind CSS, and Recharts. It simulates live EV telemetry data and displays it across multiple professional modules.

![Dashboard Preview](https://img.shields.io/badge/Status-Live-brightgreen) ![React](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/TailwindCSS-3-06B6D4)

---

## 🚀 Features

### Core Dashboard
- **Premium SaaS UI** — Dark-themed glassmorphism design with neon accents
- **Real-Time Data Streaming** — Simulated telemetry updates every 1.5 seconds
- **Responsive Layout** — Fully responsive across desktop, tablet, and mobile
- **Dark / Light Mode** — Toggle between themes
- **Collapsible Sidebar** — Navigation with search filtering

### Modules

| Module | Description |
|--------|-------------|
| **🔋 Battery & Energy** | SoC/SoH gauges, 12-cell voltage/temperature heatmap, charge/discharge rates, cycle count, estimated range & lifespan |
| **⚙️ Motor & Drivetrain** | Live RPM, torque, power output, drive mode (Eco/Normal/Sport), wheel speeds per axle, inverter efficiency |
| **🌡️ Thermal Management** | Coolant temperature, HVAC power draw, thermal runaway risk indicator, ambient vs internal temperature history |
| **🔌 Charging** | Session details (kW, voltage, current), ETA, AC/DC detection, cost estimation, smart scheduling, fault display |
| **📍 GPS & Fleet** | Live Leaflet map with vehicle markers, fleet tracking, geofence alerts, range prediction |
| **🔧 Diagnostics** | OBD-II fault codes, sensor health status, predictive maintenance alerts, OTA update status |
| **👤 Driver Behaviour** | Eco score, harsh braking/acceleration events, speed profile, idle time tracking |
| **🔔 Alerts** | Real-time alert system with severity levels (Info, Warning, Critical), acknowledgement tracking |
| **📊 Analytics** | Daily energy consumption, cost per km trends, CO₂ savings, weekly reporting |

### UI/UX Highlights
- Gradient borders and card shadows
- Smooth loading animations
- Status indicators (green/yellow/red)
- Reusable component library (`MetricCard`, `GaugeChart`, `StatusBadge`, `SectionHeader`)

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 + TypeScript 5 |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS 3 + custom design tokens |
| Charts | Recharts |
| Mapping | Leaflet + React-Leaflet |
| Routing | React Router v6 |
| State | React Query + custom hooks |
| UI Components | shadcn/ui (Radix primitives) |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                  # shadcn/ui base components
│   ├── DashboardLayout.tsx  # Sidebar + top navbar layout
│   ├── GaugeChart.tsx       # Circular gauge component
│   ├── MetricCard.tsx       # Reusable metric display card
│   ├── SectionHeader.tsx    # Module section headers
│   ├── StatusBadge.tsx      # Color-coded status indicators
│   └── NavLink.tsx          # Sidebar navigation link
├── hooks/
│   ├── useEVData.ts         # Real-time EV data simulation engine
│   └── useTheme.ts          # Dark/light mode toggle
├── pages/
│   ├── OverviewPage.tsx     # Main dashboard overview
│   ├── BatteryPage.tsx      # Battery & energy module
│   ├── MotorPage.tsx        # Motor & drivetrain module
│   ├── ThermalPage.tsx      # Thermal management module
│   ├── ChargingPage.tsx     # Charging infrastructure module
│   ├── GPSPage.tsx          # GPS & fleet tracking module
│   ├── DiagnosticsPage.tsx  # Diagnostics & faults module
│   ├── DriverPage.tsx       # Driver behaviour module
│   ├── AlertsPage.tsx       # Alerts & notifications module
│   └── AnalyticsPage.tsx    # Analytics & reporting module
└── index.css                # Design tokens & global styles
```

---

## ⚡ Getting Started

### Prerequisites
- Node.js 18+ (or Bun)
- npm / yarn / bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd ev-observability-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📊 Data Simulation

The `useEVData` hook generates realistic EV telemetry data every 1.5 seconds, including:

- **Battery**: 12-cell voltages (3.2–4.2V), temperatures, SoC/SoH curves
- **Motor**: RPM (0–12,000), torque (0–400 Nm), power (0–250 kW)
- **GPS**: Simulated movement around San Francisco coordinates
- **Diagnostics**: Rotating OBD-II fault codes with severity levels
- **Fleet**: 3 simulated fleet vehicles with independent states

---

## 📝 License

This project is for educational and demonstration purposes.

---

## 🙏 Acknowledgements

- [shadcn/ui](https://ui.shadcn.com/) — UI component library
- [Recharts](https://recharts.org/) — Charting library
- [Leaflet](https://leafletjs.com/) — Interactive maps
- [Lucide](https://lucide.dev/) — Icon library
