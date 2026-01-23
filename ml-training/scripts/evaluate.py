import os
import sys
import torch
import pandas as pd
import numpy as np
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from torch.utils.data import DataLoader
from tqdm import tqdm
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

# Add src to path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'src'))
from dataset import FakeNewsDataset

def evaluate_model():
    # Configuration
    BATCH_SIZE = 16
    MAX_LENGTH = 256
    
    # Paths
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    DATA_DIR = os.path.join(BASE_DIR, "ml-training", "data", "processed")
    MODEL_DIR = os.path.join(BASE_DIR, "backend", "models", "roberta-fake-news")
    
    # Check device
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    print(f"🚀 Using device: {device}")
    
    # Load Test Data
    print("Loading test data...")
    test_path = os.path.join(DATA_DIR, "test.csv")
    if not os.path.exists(test_path):
        print("❌ Test data not found!")
        return
        
    test_df = pd.read_csv(test_path)
    test_df['text'] = test_df['text'].fillna('')
    
    # Load Model and Tokenizer
    print(f"Loading model from {MODEL_DIR}...")
    try:
        tokenizer = AutoTokenizer.from_pretrained(MODEL_DIR)
        model = AutoModelForSequenceClassification.from_pretrained(MODEL_DIR)
        model.to(device)
    except Exception as e:
        print(f"❌ Error loading model: {e}")
        return

    # Create Dataset
    test_dataset = FakeNewsDataset(
        texts=test_df['text'].values,
        labels=test_df['label'].values,
        tokenizer=tokenizer,
        max_length=MAX_LENGTH
    )
    
    test_loader = DataLoader(test_dataset, batch_size=BATCH_SIZE)
    
    # Evaluation Loop
    print("\nStarting evaluation...")
    model.eval()
    
    predictions = []
    true_labels = []
    probabilities = []
    
    with torch.no_grad():
        for batch in tqdm(test_loader, desc="Evaluating"):
            input_ids = batch['input_ids'].to(device)
            attention_mask = batch['attention_mask'].to(device)
            labels = batch['labels'].to(device)
            
            outputs = model(
                input_ids=input_ids,
                attention_mask=attention_mask,
                labels=labels
            )
            
            logits = outputs.logits
            probs = torch.softmax(logits, dim=1)
            
            preds = torch.argmax(logits, dim=1).detach().cpu().numpy()
            lbls = labels.detach().cpu().numpy()
            
            predictions.extend(preds)
            true_labels.extend(lbls)
            probabilities.extend(probs.detach().cpu().numpy())
            
    # Metrics
    accuracy = accuracy_score(true_labels, predictions)
    report = classification_report(true_labels, predictions, target_names=['FAKE', 'REAL'])
    cm = confusion_matrix(true_labels, predictions)
    
    print("\n" + "="*30)
    print(f"✅ TEST RESULTS")
    print("="*30)
    print(f"Accuracy: {accuracy:.4f} ({accuracy*100:.2f}%)")
    print("\nClassification Report:")
    print(report)
    print("\nConfusion Matrix:")
    print(cm)
    print("="*30)

if __name__ == "__main__":
    evaluate_model()
