from fastapi import FastAPI, File, UploadFile
import torch
from torchvision import models, transforms
from PIL import Image
import io
import json

app = FastAPI()


with open("classes.json", "r") as f:
    classes = json.load(f)


device = torch.device("cpu")


model = models.resnet18(weights=None)
model.fc = torch.nn.Linear(model.fc.in_features, len(classes))

model.load_state_dict(torch.load("waste_model.pth", map_location=device))
model.to(device)
model.eval()


transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])



def predict(image: Image.Image):
    image = transform(image).unsqueeze(0).to(device)

    with torch.no_grad():
        output = model(image)
        probs = torch.softmax(output, dim=1)
        confidence, pred = torch.max(probs, 1)

    return {
        "category": classes[pred.item()],
        "confidence": float(confidence.item())
    }


@app.post("/classify")
async def classify_image(file: UploadFile = File(...)):
    print("FILE RECEIVED:", file.filename)
    image_data = await file.read()
    image = Image.open(io.BytesIO(image_data)).convert("RGB")

    result = predict(image)

    return result