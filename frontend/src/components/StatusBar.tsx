import { Activity, Cpu, Zap, Clock } from "lucide-react";
import { useEffect, useState } from "react";

export function StatusBar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const i = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="h-8 border-t border-border bg-surface flex items-center px-4 gap-6 text-[11px] font-mono text-muted-foreground shrink-0">
      <div className="flex items-center gap-1.5">
        <span className="status-led status-led-active" />
        <span>SYSTEM_ONLINE</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Activity className="w-3 h-3" />
        <span>LATENCY: 12ms</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Cpu className="w-3 h-3" />
        <span>NODES: 6 ACTIVE</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Zap className="w-3 h-3 text-accent" />
        <span>THROUGHPUT: 1.2k t/s</span>
      </div>
      <div className="ml-auto flex items-center gap-1.5">
        <Clock className="w-3 h-3" />
        <span>{time.toLocaleTimeString("en-US", { hour12: false })}</span>
      </div>
    </div>
  );
}
