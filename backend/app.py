# backend/app.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Inventory Heatmap API")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Sample inventory data (same as frontend mock)
inventory_data = [
    {"item": "Paracetamol", "location": "Clinic A", "stock": 35, "days_until_out_of_stock": 4},
    {"item": "Rice", "location": "Warehouse 1", "stock": 120, "days_until_out_of_stock": 10},
    {"item": "Oxygen Cylinder", "location": "Hospital B", "stock": 5, "days_until_out_of_stock": 2},
    {"item": "Milk", "location": "Store C", "stock": 50, "days_until_out_of_stock": 7},
]

@app.get("/inventory")
def get_inventory():
    """Return current inventory status."""
    return {"status": "success", "data": inventory_data}

@app.get("/alerts")
def get_alerts():
    """Return items with low stock (<=5 days left)."""
    alerts = [item for item in inventory_data if item["days_until_out_of_stock"] <= 5]
    return {"status": "success", "alerts": alerts}

@app.get("/forecast")
def get_forecast():
    """Return forecast summary."""
    forecast = [
        {"item": item["item"], "location": item["location"], "days_left": item["days_until_out_of_stock"]}
        for item in inventory_data
    ]
    return {"status": "success", "forecast": forecast}
