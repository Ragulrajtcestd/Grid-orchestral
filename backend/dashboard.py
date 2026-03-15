import streamlit as st
from backend import predict_energy

st.title("⚡ AI Energy Orchestral System")

st.write("Smart Grid Prediction Dashboard")

st.sidebar.header("Input Parameters")

solar_irradiance = st.sidebar.slider("Solar Irradiance",0,1000,500)
cloud_cover = st.sidebar.slider("Cloud Cover",0,100,20)
wind_speed = st.sidebar.slider("Wind Speed",0,20,5)
temperature = st.sidebar.slider("Temperature",10,45,30)
humidity = st.sidebar.slider("Humidity",10,100,60)

hour = st.sidebar.slider("Hour",0,23,12)
day_of_week = st.sidebar.slider("Day of Week",0,6,2)
num_ev_charging = st.sidebar.slider("EV Charging",0,100,20)

if st.button("Predict Energy"):

    supply, demand, balance, decision = predict_energy(
        solar_irradiance,
        cloud_cover,
        wind_speed,
        temperature,
        humidity,
        hour,
        day_of_week,
        num_ev_charging
    )

    st.subheader("Prediction Results")

    col1,col2 = st.columns(2)

    col1.metric("Supply (kWh)", round(supply,2))
    col2.metric("Demand (kWh)", round(demand,2))

    st.write("Energy Balance:", round(balance,2))
    st.write("Grid Decision:", decision)