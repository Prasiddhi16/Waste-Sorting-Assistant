import torch
from torchvision import models

# Load your class count
import json
with open("classes.json", "r") as f:
    classes = json.load(f)

# Define the same model architecture
model = models.resnet18(weights=None)
model.fc = torch.nn.Linear(model.fc.in_features, len(classes))

# Load trained weights
model.load_state_dict(torch.load("waste_model.pth", map_location="cpu"))
model.eval()

# Convert to TorchScript
scripted_model = torch.jit.script(model)
scripted_model.save("waste_model.pt")

print("Conversion complete! Saved as waste_model.pt")
