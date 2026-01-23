import pandas as pd
import os
import re

def clean_text(text):
    if not isinstance(text, str):
        return ""
    
    # Basic cleaning
    text = text.lower()
    text = re.sub(r'http\S+', '', text) # Remove URLs
    text = re.sub(r'\s+', ' ', text).strip() # Normalize whitespace
    
    return text

def preprocess_data():
    base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    raw_dir = os.path.join(base_dir, "ml-training", "data", "raw", "liar_dataset")
    processed_dir = os.path.join(base_dir, "ml-training", "data", "processed")
    
    os.makedirs(processed_dir, exist_ok=True)
    
    # Define binary mapping
    # 0 = FAIL/FAKE, 1 = PASS/REAL (High level intuition)
    # Based on doc: false, pants-fire, barely-true -> 0 (Fake)
    # half-true, mostly-true, true -> 1 (Real)
    
    fake_labels = ['false', 'pants-fire', 'barely-true']
    
    splits = ['train', 'val', 'test']
    
    print("🚀 Starting Data Preprocessing...")
    
    for split in splits:
        input_path = os.path.join(raw_dir, f"{split}.csv")
        output_path = os.path.join(processed_dir, f"{split}.csv")
        
        if not os.path.exists(input_path):
            print(f"⚠️ Skipping {split}: File not found at {input_path}")
            continue
            
        print(f"Processing {split} set...")
        df = pd.read_csv(input_path)
        
        # 1. Binary Label Mapping
        df['label'] = df['label'].apply(lambda x: 0 if x in fake_labels else 1)
        
        # 2. Text Cleaning
        df['text'] = df['text'].apply(clean_text)
        
        # 3. Select relevant columns
        # We keep text and label primarily. 
        # Context info might be useful for advanced models, keeping it just in case but renaming if needed
        # Doc used: text, label
        
        final_df = df[['text', 'label']]
        
        # Save
        final_df.to_csv(output_path, index=False)
        print(f"✅ Saved processed {split} data to {output_path} ({len(final_df)} rows)")
        
        # Verify class balance
        print(f"   Balance: {final_df['label'].value_counts().to_dict()}")

    print("\n✨ Preprocessing Complete!")

if __name__ == "__main__":
    preprocess_data()
