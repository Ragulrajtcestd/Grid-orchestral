import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

interface ChartData {
  hour: string;
  supply: number;
  demand: number;
  balance: number;
}

interface EnergyChartProps {
  data: ChartData[];
  currentHour: number;
}

export function EnergyChart({ data, currentHour }: EnergyChartProps) {
  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="supplyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(210, 100%, 60%)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="hsl(210, 100%, 60%)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="demandGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="hsla(0,0%,100%,0.04)" strokeDasharray="3 3" />
          <XAxis
            dataKey="hour"
            tick={{ fontSize: 10, fill: "hsl(220, 10%, 45%)", fontFamily: "JetBrains Mono" }}
            tickLine={false}
            axisLine={false}
            interval={3}
          />
          <YAxis
            tick={{ fontSize: 10, fill: "hsl(220, 10%, 45%)", fontFamily: "JetBrains Mono" }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              background: "hsl(220, 20%, 8%)",
              border: "1px solid hsla(0,0%,100%,0.06)",
              borderRadius: "6px",
              fontSize: "11px",
              fontFamily: "JetBrains Mono",
              color: "hsl(220, 10%, 90%)",
            }}
          />
          <Area
            type="monotone"
            dataKey="supply"
            stroke="hsl(210, 100%, 60%)"
            strokeWidth={2}
            fill="url(#supplyGrad)"
            name="Supply"
          />
          <Area
            type="monotone"
            dataKey="demand"
            stroke="hsl(0, 72%, 51%)"
            strokeWidth={2}
            fill="url(#demandGrad)"
            name="Demand"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
