import os
import sys
import torch
import pandas as pd
import numpy as np
from transformers import AutoTokenizer, AutoModelForSequenceClassification, get_linear_schedule_with_warmup
from torch.optim import AdamW
from torch.utils.data import DataLoader
from tqdm import tqdm
from sklearn.metrics import accuracy_score, precision_recall_fscore_support

# Add src to path so we can import dataset
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'src'))
from dataset import FakeNewsDataset

def train_model():
    # Configuration
    MODEL_NAME = 'roberta-base'
    MAX_LENGTH = 256
    BATCH_SIZE = 16
    EPOCHS = 3
    LEARNING_RATE = 2e-5
    
    # Paths
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    DATA_DIR = os.path.join(BASE_DIR, "ml-training", "data", "processed")
    OUTPUT_DIR = os.path.join(BASE_DIR, "backend", "models", "roberta-fake-news")
    
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    # Check device
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    print(f"🚀 Using device: {device}")
    
    # Load Data
    print("Loading data...")
    train_df = pd.read_csv(os.path.join(DATA_DIR, "train.csv"))
    val_df = pd.read_csv(os.path.join(DATA_DIR, "val.csv"))
    
    # Handle NaN values in text
    train_df['text'] = train_df['text'].fillna('')
    val_df['text'] = val_df['text'].fillna('')
    
    # Initialize Tokenizer
    print(f"Initializing tokenizer ({MODEL_NAME})...")
    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
    
    # Create Datasets
    train_dataset = FakeNewsDataset(
        texts=train_df['text'].values,
        labels=train_df['label'].values,
        tokenizer=tokenizer,
        max_length=MAX_LENGTH
    )
    
    val_dataset = FakeNewsDataset(
        texts=val_df['text'].values,
        labels=val_df['label'].values,
        tokenizer=tokenizer,
        max_length=MAX_LENGTH
    )
    
    # Create DataLoaders
    train_loader = DataLoader(train_dataset, batch_size=BATCH_SIZE, shuffle=True)
    val_loader = DataLoader(val_dataset, batch_size=BATCH_SIZE)
    
    # Initialize Model
    print(f"Initializing model ({MODEL_NAME})...")
    model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME, num_labels=2)
    model.to(device)
    
    # Optimizer and Scheduler
    optimizer = AdamW(model.parameters(), lr=LEARNING_RATE, eps=1e-8)
    total_steps = len(train_loader) * EPOCHS
    scheduler = get_linear_schedule_with_warmup(
        optimizer,
        num_warmup_steps=0,
        num_training_steps=total_steps
    )
    
    # Training Loop
    print("\nStarting training...")
    
    for epoch in range(EPOCHS):
        print(f"\nEpoch {epoch + 1}/{EPOCHS}")
        print("-" * 10)
        
        # Training Phase
        model.train()
        total_train_loss = 0
        
        for batch in tqdm(train_loader, desc="Training"):
            input_ids = batch['input_ids'].to(device)
            attention_mask = batch['attention_mask'].to(device)
            labels = batch['labels'].to(device)
            
            model.zero_grad()
            
            outputs = model(
                input_ids=input_ids,
                attention_mask=attention_mask,
                labels=labels
            )
            
            loss = outputs.loss
            total_train_loss += loss.item()
            
            loss.backward()
            torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
            
            optimizer.step()
            scheduler.step()
            
        avg_train_loss = total_train_loss / len(train_loader)
        print(f"Average training loss: {avg_train_loss:.4f}")
        
        # Validation Phase
        model.eval()
        total_eval_loss = 0
        predictions = []
        true_labels = []
        
        for batch in tqdm(val_loader, desc="Validation"):
            input_ids = batch['input_ids'].to(device)
            attention_mask = batch['attention_mask'].to(device)
            labels = batch['labels'].to(device)
            
            with torch.no_grad():
                outputs = model(
                    input_ids=input_ids,
                    attention_mask=attention_mask,
                    labels=labels
                )
                
            loss = outputs.loss
            total_eval_loss += loss.item()
            
            logits = outputs.logits.detach().cpu().numpy()
            label_ids = labels.to('cpu').numpy()
            
            predictions.extend(np.argmax(logits, axis=1).flatten())
            true_labels.extend(label_ids.flatten())
            
        avg_val_loss = total_eval_loss / len(val_loader)
        accuracy = accuracy_score(true_labels, predictions)
        
        print(f"Validation Loss: {avg_val_loss:.4f}")
        print(f"Validation Accuracy: {accuracy:.4f}")
        
        # Save checkpoint (optional, or just save best/last)
        
    print("\nTraining complete!")
    print(f"Saving model to {OUTPUT_DIR}...")
    
    model.save_pretrained(OUTPUT_DIR)
    tokenizer.save_pretrained(OUTPUT_DIR)
    
    # Save metrics or config if needed
    
    print("✅ Model saved successfully.")

if __name__ == "__main__":
    try:
        train_model()
    except Exception as e:
        print(f"❌ Error during training: {e}")
        import traceback
        traceback.print_exc()

