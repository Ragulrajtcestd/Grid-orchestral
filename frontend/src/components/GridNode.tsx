import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface GridNodeProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  status: "active" | "idle" | "warning";
  value?: string;
  unit?: string;
  selected?: boolean;
  onClick?: () => void;
}

const transition = { type: "tween" as const, ease: [0.2, 0.8, 0.2, 1] as [number, number, number, number], duration: 0.3 };

export function GridNode({ title, subtitle, icon: Icon, status, value, unit, selected, onClick }: GridNodeProps) {
  const statusClass =
    status === "active" ? "status-led-active" :
    status === "warning" ? "status-led-warning" : "status-led-idle";

  return (
    <motion.div
      layout
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={transition}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className={`
        w-[240px] rounded-md overflow-hidden cursor-pointer
        bg-card transition-all duration-200
        ${selected ? "node-shadow-hover ring-1 ring-primary/30" : "node-shadow hover:node-shadow-hover"}
      `}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border">
        <span className={`status-led ${statusClass}`} />
        <span className="text-xs font-medium text-foreground truncate">{title}</span>
      </div>

      {/* Body */}
      <div className="p-3">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] text-muted-foreground font-mono">{subtitle}</p>
            {value && (
              <p className="text-2xl font-semibold text-foreground mt-1 font-mono tabular-nums">
                {value}
                {unit && <span className="text-xs text-muted-foreground ml-1">{unit}</span>}
              </p>
            )}
          </div>
          <div className="p-2 rounded-md bg-muted">
            <Icon className="w-4 h-4 text-primary" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
