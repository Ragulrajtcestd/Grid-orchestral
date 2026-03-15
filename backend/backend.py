import numpy as np
import joblib

# Load trained models
supply_model = joblib.load("supply_model.pkl")
demand_model = joblib.load("demand_model.pkl")

def predict_energy(
    solar_irradiance,
    cloud_cover,
    wind_speed,
    temperature,
    humidity,
    hour,
    day_of_week,
    num_ev_charging
):

    # Prepare inputs
    supply_input = np.array([[
        solar_irradiance,
        cloud_cover,
        wind_speed,
        temperature,
        humidity
    ]])

    demand_input = np.array([[
        hour,
        day_of_week,
        temperature,
        num_ev_charging
    ]])

    # Predictions
    predicted_supply = supply_model.predict(supply_input)[0]
    predicted_demand = demand_model.predict(demand_input)[0]

    # Energy balance
    energy_balance = predicted_supply - predicted_demand

    # Decision logic
    if energy_balance > 0:
        decision = "Store Excess Energy"

    elif energy_balance < 0:
        decision = "Use Grid Storage"

    else:
        decision = "Balanced Grid"

    return {
        "supply": predicted_supply,
        "demand": predicted_demand,
        "balance": energy_balance,
        "decision": decision
    }