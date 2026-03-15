import { useState, useEffect } from "react";
import { Sun, Wind, Battery, Gauge, Plug, Thermometer } from "lucide-react";
import { predictEnergy, generateHistoricalData, type EnergyInput, type EnergyResult } from "@/lib/energy";
import { GridNode } from "@/components/GridNode";
import { ControlPanel } from "@/components/ControlPanel";
import { InspectorPanel } from "@/components/InspectorPanel";
import { StatusBar } from "@/components/StatusBar";
import { ConnectionLines } from "@/components/ConnectionLines";

type ChartData = { hour: string; supply: number; demand: number; balance: number };

const defaultInput: EnergyInput = {
  solarIrradiance: 500,
  cloudCover: 20,
  windSpeed: 5,
  temperature: 30,
  humidity: 60,
  hour: 12,
  dayOfWeek: 2,
  numEvCharging: 20,
};

const Index = () => {
  const [input, setInput] = useState<EnergyInput>(defaultInput);
  const [showInspector, setShowInspector] = useState(true);
  const [result, setResult] = useState<EnergyResult | null>(null);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    predictEnergy(input)
      .then(setResult)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [input]);

  useEffect(() => {
    generateHistoricalData(input)
      .then(setChartData)
      .catch(console.error);
  }, [input]);

  const nodes = [
    { title: "Solar Array", subtitle: "IRRADIANCE_SENSOR", icon: Sun, status: input.solarIrradiance > 300 ? "active" as const : "idle" as const, value: input.solarIrradiance.toString(), unit: "W/m²" },
    { title: "Wind Turbine", subtitle: "ANEMOMETER_v3", icon: Wind, status: input.windSpeed > 8 ? "active" as const : "idle" as const, value: input.windSpeed.toString(), unit: "m/s" },
    { title: "Supply Node", subtitle: "PREDICTION_MODEL", icon: Battery, status: "active" as const, value: result ? result.supply.toFixed(1) : "...", unit: "kWh" },
    { title: "Demand Node", subtitle: "LOAD_BALANCER", icon: Gauge, status: result && result.demand > result.supply ? "warning" as const : "active" as const, value: result ? result.demand.toFixed(1) : "...", unit: "kWh" },
    { title: "EV Fleet", subtitle: "CHARGE_CONTROLLER", icon: Plug, status: input.numEvCharging > 50 ? "warning" as const : "active" as const, value: input.numEvCharging.toString(), unit: "units" },
    { title: "Thermal", subtitle: "TEMP_MONITOR", icon: Thermometer, status: input.temperature > 38 ? "warning" as const : "active" as const, value: `${input.temperature}°`, unit: "C" },
  ];

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      {/* Top bar */}
      <header className="h-10 border-b border-border bg-surface flex items-center px-4 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-sm bg-primary flex items-center justify-center">
            <span className="text-[9px] font-bold text-primary-foreground font-mono">AG</span>
          </div>
          <h1 className="text-xs font-mono font-medium text-foreground tracking-wider uppercase">
            AI Grid Orchestral
          </h1>
        </div>
        <span className="ml-4 text-[10px] font-mono text-muted-foreground">
          v1.0.0 — Smart Grid Prediction Dashboard
        </span>
        {loading && (
          <span className="ml-auto text-[10px] font-mono text-primary animate-pulse">
            FETCHING...
          </span>
        )}
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar - Controls */}
        <aside className="w-[260px] border-r border-border bg-surface overflow-y-auto shrink-0 p-4">
          <h2 className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-4">
            Parameters
          </h2>
          <ControlPanel input={input} onChange={setInput} />
        </aside>

        {/* Main grid area */}
        <main className="flex-1 grid-dots overflow-auto relative">
          <ConnectionLines />
          <div className="relative z-10 p-8">
            <div className="mb-6">
              <p className="text-[11px] font-mono text-muted-foreground">
                SYSTEM_READY: {nodes.filter(n => n.status === "active").length} NODES ACTIVE
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {nodes.map((node) => (
                <GridNode
                  key={node.title}
                  {...node}
                  onClick={() => setShowInspector(true)}
                />
              ))}
            </div>
          </div>
        </main>

        {/* Right inspector */}
        {showInspector && result && (
          <InspectorPanel
            result={result}
            chartData={chartData}
            currentHour={input.hour}
            onClose={() => setShowInspector(false)}
          />
        )}
      </div>

      <StatusBar />
    </div>
  );
};

export default Index;
