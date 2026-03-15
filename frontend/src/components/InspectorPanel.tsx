import { motion, AnimatePresence } from "framer-motion";
import { X, TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { EnergyResult } from "@/lib/energy";
import { EnergyChart } from "./EnergyChart";

interface InspectorPanelProps {
  result: EnergyResult | null;
  chartData: { hour: string; supply: number; demand: number; balance: number }[];
  currentHour: number;
  onClose: () => void;
}

const transition = { type: "tween" as const, ease: [0.2, 0.8, 0.2, 1] as [number, number, number, number], duration: 0.3 };

export function InspectorPanel({ result, chartData, currentHour, onClose }: InspectorPanelProps) {
  if (!result) return null;

  const balanceColor =
    result.balance > 0 ? "text-accent" :
    result.balance < 0 ? "text-destructive" : "text-muted-foreground";

  const BalanceIcon =
    result.balance > 0 ? TrendingUp :
    result.balance < 0 ? TrendingDown : Minus;

  const decisionColor =
    result.decision === "Store Energy" ? "bg-accent/10 text-accent border-accent/20" :
    result.decision === "Use Grid Storage" ? "bg-destructive/10 text-destructive border-destructive/20" :
    "bg-muted text-muted-foreground border-border";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 320, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 320, opacity: 0 }}
        transition={transition}
        className="w-[320px] shrink-0 border-l border-border glass-panel overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h2 className="text-xs font-mono text-primary uppercase tracking-wider">Inspector</h2>
          <button onClick={onClose} className="p-1 rounded-sm hover:bg-muted transition-colors">
            <X className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
        </div>

        {/* Metrics */}
        <div className="p-4 space-y-4">
          {/* Supply / Demand */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-muted rounded-md p-3">
              <p className="text-[10px] font-mono text-muted-foreground uppercase">Supply</p>
              <p className="text-xl font-mono font-semibold text-primary tabular-nums mt-1">
                {result.supply.toFixed(1)}
              </p>
              <p className="text-[10px] font-mono text-muted-foreground">kWh</p>
            </div>
            <div className="bg-muted rounded-md p-3">
              <p className="text-[10px] font-mono text-muted-foreground uppercase">Demand</p>
              <p className="text-xl font-mono font-semibold text-destructive tabular-nums mt-1">
                {result.demand.toFixed(1)}
              </p>
              <p className="text-[10px] font-mono text-muted-foreground">kWh</p>
            </div>
          </div>

          {/* Balance */}
          <div className="bg-muted rounded-md p-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-mono text-muted-foreground uppercase">Energy Balance</p>
              <BalanceIcon className={`w-4 h-4 ${balanceColor}`} />
            </div>
            <p className={`text-2xl font-mono font-bold tabular-nums mt-1 ${balanceColor}`}>
              {result.balance > 0 ? "+" : ""}{result.balance.toFixed(1)}
              <span className="text-xs text-muted-foreground ml-1">kWh</span>
            </p>
          </div>

          {/* Decision */}
          <div className={`rounded-md p-3 border ${decisionColor}`}>
            <p className="text-[10px] font-mono uppercase mb-1 opacity-70">Grid Decision</p>
            <p className="text-sm font-mono font-medium">{result.decision}</p>
          </div>

          {/* Chart */}
          <div>
            <p className="text-[10px] font-mono text-muted-foreground uppercase mb-2">24H Forecast</p>
            <EnergyChart data={chartData} currentHour={currentHour} />
          </div>

          {/* Logs */}
          <div>
            <p className="text-[10px] font-mono text-muted-foreground uppercase mb-2">System Log</p>
            <div className="bg-background rounded-md p-2 space-y-1 text-[10px] font-mono text-muted-foreground max-h-32 overflow-y-auto">
              <p><span className="text-accent">[OK]</span> Supply model loaded</p>
              <p><span className="text-accent">[OK]</span> Demand model loaded</p>
              <p><span className="text-primary">[RUN]</span> Prediction executed at {new Date().toLocaleTimeString()}</p>
              <p><span className="text-primary">[OUT]</span> Supply: {result.supply.toFixed(2)} kWh</p>
              <p><span className="text-primary">[OUT]</span> Demand: {result.demand.toFixed(2)} kWh</p>
              <p><span className={result.balance >= 0 ? "text-accent" : "text-destructive"}>[DEC]</span> {result.decision}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
