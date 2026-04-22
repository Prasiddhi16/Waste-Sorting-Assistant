from fastapi import FastAPI
from pydantic import BaseModel
app=FastAPI()

class WasteItem(BaseModel):
    name:str
@app.post("/classify")
def classify_item(item:WasteItem):
    if "plastic" in item.name.lower():
        return {"category": "Recyclable"}
    elif "paper" in item.name.lower():
        return {"category": "Compostable"}
    else:
        return {"category": "General Waste"}