export interface EnergyInput {
  solarIrradiance: number;
  cloudCover: number;
  windSpeed: number;
  temperature: number;
  humidity: number;
  hour: number;
  dayOfWeek: number;
  numEvCharging: number;
}

export interface EnergyResult {
  supply: number;
  demand: number;
  balance: number;
  decision: "Store Energy" | "Use Grid Storage" | "Balanced Grid";
}

const API_BASE = "http://localhost:8000"; // 👈 Change this to your deployed URL if needed

export async function predictEnergy(input: EnergyInput): Promise<EnergyResult> {
  const response = await fetch(`${API_BASE}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      solar_irradiance: input.solarIrradiance,   // camelCase → snake_case
      cloud_cover: input.cloudCover,
      wind_speed: input.windSpeed,
      temperature: input.temperature,
      humidity: input.humidity,
      hour: input.hour,
      day_of_week: input.dayOfWeek,
      num_ev_charging: input.numEvCharging,
    }),
  });

  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json();
}

export async function generateHistoricalData(currentInput: EnergyInput) {
  const promises = Array.from({ length: 24 }, (_, h) =>
    predictEnergy({ ...currentInput, hour: h }).then((result) => ({
      hour: `${h.toString().padStart(2, "0")}:00`,
      supply: result.supply,
      demand: result.demand,
      balance: result.balance,
    }))
  );
  return Promise.all(promises);
}