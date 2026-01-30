from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import torch.nn.functional as F
import os

class FakeNewsModel:
    def __init__(self, model_path: str = None):
        self.model = None
        self.tokenizer = None
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        
        if model_path:
            self.load_model(model_path)
    
    def load_model(self, model_path: str):
        """Loads the model and tokenizer from the specified directory"""
        print(f"Loading ML model from {model_path}...")
        try:
            self.tokenizer = AutoTokenizer.from_pretrained(model_path)
            self.model = AutoModelForSequenceClassification.from_pretrained(model_path)
            self.model.to(self.device)
            self.model.eval()
            print("✅ Model loaded successfully")
        except Exception as e:
            print(f"⚠️ Error loading fast tokenizer: {e}")
            print("🔄 Attempting to load with use_fast=False...")
            try:
                self.tokenizer = AutoTokenizer.from_pretrained(model_path, use_fast=False)
                self.model = AutoModelForSequenceClassification.from_pretrained(model_path)
                self.model.to(self.device)
                self.model.eval()
                print("✅ Model loaded successfully (using slow tokenizer)")
            except Exception as e2:
                print(f"❌ Error loading model (fallback failed): {e2}")
                print("Try checking if 'transformers' version is compatible (needs ~4.37.0)")

    def predict(self, text: str):
        """
        Analyzes the input text and returns prediction.
        Returns: (label, confidence_score, probabilities)
        """
        if not self.model or not self.tokenizer:
            raise ValueError("Model not initialized. Call load_model() first.")
            
        # Preprocessing (basic, similar to training)
        inputs = self.tokenizer(
            text,
            return_tensors="pt",
            truncation=True,
            max_length=256,
            padding=True
        )
        
        inputs = {k: v.to(self.device) for k, v in inputs.items()}
        
        with torch.no_grad():
            outputs = self.model(**inputs)
            logits = outputs.logits
            probs = F.softmax(logits, dim=1)
            
            # Get predicted class (0 or 1)
            # Training mapping was: 0=FAKE, 1=REAL
            pred_idx = torch.argmax(probs, dim=1).item()
            confidence = probs[0][pred_idx].item()
            
            label = "REAL" if pred_idx == 1 else "FAKE"
            
            return {
                "label": label,
                "confidence": confidence,
                "probabilities": {
                    "fake": probs[0][0].item(),
                    "real": probs[0][1].item()
                }
            }
