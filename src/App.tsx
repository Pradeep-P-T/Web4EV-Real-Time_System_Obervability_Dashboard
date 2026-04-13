import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import DashboardLayout from "@/components/DashboardLayout";
import OverviewPage from "@/pages/OverviewPage";
import BatteryPage from "@/pages/BatteryPage";
import MotorPage from "@/pages/MotorPage";
import ThermalPage from "@/pages/ThermalPage";
import ChargingPage from "@/pages/ChargingPage";
import GPSPage from "@/pages/GPSPage";
import DiagnosticsPage from "@/pages/DiagnosticsPage";
import DriverPage from "@/pages/DriverPage";
import AlertsPage from "@/pages/AlertsPage";
import AnalyticsPage from "@/pages/AnalyticsPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="*" element={
            <DashboardLayout>
              <Routes>
                <Route path="/" element={<OverviewPage />} />
                <Route path="/battery" element={<BatteryPage />} />
                <Route path="/motor" element={<MotorPage />} />
                <Route path="/thermal" element={<ThermalPage />} />
                <Route path="/charging" element={<ChargingPage />} />
                <Route path="/gps" element={<GPSPage />} />
                <Route path="/diagnostics" element={<DiagnosticsPage />} />
                <Route path="/driver" element={<DriverPage />} />
                <Route path="/alerts" element={<AlertsPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </DashboardLayout>
          } />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
