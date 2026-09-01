import io
import numpy as np
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import tensorflow as tf

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from pathlib import Path

# Get the directory where main.py is currently located
BASE_DIR = Path(__file__).resolve().parent

# Safely point to the model file (adjust "models/cifar10_model.keras" if it's directly in backend/)
MODEL_PATH = BASE_DIR / "models" / "cifra10.keras"

model = tf.keras.models.load_model(MODEL_PATH)

CLASSES = [
    "airplane",
    "automobile",
    "bird",
    "cat",
    "deer",
    "dog",
    "frog",
    "horse",
    "ship",
    "truck",
]

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image_data = await file.read()
    image = Image.open(io.BytesIO(image_data)).convert("RGB")
    
    image = image.resize((32, 32))
    image_array = np.array(image) / 255.0
    image_array = np.expand_dims(image_array, axis=0)
    
    predictions = model.predict(image_array)
    predicted_class_idx = int(np.argmax(predictions[0]))
    confidence = float(np.max(predictions[0]))
    
    return {
        "class": CLASSES[predicted_class_idx],
        "confidence": round(confidence * 100, 2)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
