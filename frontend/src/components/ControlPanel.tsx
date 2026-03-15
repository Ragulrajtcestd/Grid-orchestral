import { Slider } from "@/components/ui/slider";
import type { EnergyInput } from "@/lib/energy";

interface ControlPanelProps {
  input: EnergyInput;
  onChange: (input: EnergyInput) => void;
}

interface ParamSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  unit?: string;
  onChange: (v: number) => void;
}

function ParamSlider({ label, value, min, max, unit, onChange }: ParamSliderProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-[11px]">
        <span className="text-muted-foreground font-mono uppercase">{label}</span>
        <span className="text-foreground font-mono tabular-nums">
          {value}{unit && <span className="text-muted-foreground ml-0.5">{unit}</span>}
        </span>
      </div>
      <Slider
        min={min}
        max={max}
        step={1}
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        className="[&_[role=slider]]:h-3 [&_[role=slider]]:w-3 [&_[role=slider]]:bg-primary [&_[role=slider]]:border-0 [&_.relative]:h-1 [&_.relative]:bg-muted [&_[data-orientation=horizontal]>span:first-child>span]:bg-primary"
      />
    </div>
  );
}

export function ControlPanel({ input, onChange }: ControlPanelProps) {
  const set = (key: keyof EnergyInput) => (v: number) =>
    onChange({ ...input, [key]: v });

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-[11px] font-mono text-primary uppercase tracking-wider mb-3">
          Supply Parameters
        </h3>
        <div className="space-y-4">
          <ParamSlider label="Solar Irradiance" value={input.solarIrradiance} min={0} max={1000} unit="W/m²" onChange={set("solarIrradiance")} />
          <ParamSlider label="Cloud Cover" value={input.cloudCover} min={0} max={100} unit="%" onChange={set("cloudCover")} />
          <ParamSlider label="Wind Speed" value={input.windSpeed} min={0} max={20} unit="m/s" onChange={set("windSpeed")} />
          <ParamSlider label="Temperature" value={input.temperature} min={10} max={45} unit="°C" onChange={set("temperature")} />
          <ParamSlider label="Humidity" value={input.humidity} min={10} max={100} unit="%" onChange={set("humidity")} />
        </div>
      </div>

      <div className="border-t border-border pt-4">
        <h3 className="text-[11px] font-mono text-primary uppercase tracking-wider mb-3">
          Demand Parameters
        </h3>
        <div className="space-y-4">
          <ParamSlider label="Hour" value={input.hour} min={0} max={23} onChange={set("hour")} />
          <ParamSlider label="Day of Week" value={input.dayOfWeek} min={0} max={6} onChange={set("dayOfWeek")} />
          <ParamSlider label="EV Charging" value={input.numEvCharging} min={0} max={100} onChange={set("numEvCharging")} />
        </div>
      </div>
    </div>
  );
}
