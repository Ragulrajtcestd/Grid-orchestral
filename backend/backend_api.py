from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import joblib
import numpy as np

app = FastAPI()

# ----------------- Enable CORS -----------------
# Allows frontend (React / Lovable dashboard) to call the API

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all origins (safe for development)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------- Load Models -----------------

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

supply_model = joblib.load(os.path.join(BASE_DIR, "models", "supply_model.pkl"))
demand_model = joblib.load(os.path.join(BASE_DIR, "models", "demand_model.pkl"))

# ----------------- Input Schema -----------------

class EnergyInput(BaseModel):
    solar_irradiance: float
    cloud_cover: float
    wind_speed: float
    temperature: float
    humidity: float
    hour: int
    day_of_week: int
    num_ev_charging: int

# ----------------- Home Route -----------------

@app.get("/")
def home():
    return {"message": "AI Energy Orchestral System API"}

# ----------------- Prediction Route -----------------

@app.post("/predict")
def predict(data: EnergyInput):

    supply_input = np.array([[
        data.solar_irradiance,
        data.cloud_cover,
        data.wind_speed,
        data.temperature,
        data.humidity
    ]])

    demand_input = np.array([[
        data.hour,
        data.day_of_week,
        data.temperature,
        data.num_ev_charging
    ]])

    supply = supply_model.predict(supply_input)[0]
    demand = demand_model.predict(demand_input)[0]

    balance = supply - demand

    if balance > 0:
        decision = "Store Energy"
    elif balance < 0:
        decision = "Use Grid Storage"
    else:
        decision = "Balanced Grid"

    return {
        "supply": float(supply),
        "demand": float(demand),
        "balance": float(balance),
        "decision": decision
    }