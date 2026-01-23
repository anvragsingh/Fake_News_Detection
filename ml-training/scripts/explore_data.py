import pandas as pd
import os
import matplotlib.pyplot as plt
import seaborn as sns

def explore_data():
    base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    data_dir = os.path.join(base_dir, "ml-training", "data", "raw", "liar_dataset")
    
    print(f"Loading data from {data_dir}...")
    
    # Load Train Data
    train_path = os.path.join(data_dir, "train.csv")
    if not os.path.exists(train_path):
        print(f"❌ Train file not found at {train_path}")
        return

    df = pd.read_csv(train_path)
    
    print("\n" + "="*50)
    print("📊 DATASET STATISTICS (TRAIN)")
    print("="*50)
    print(f"Total rows: {len(df)}")
    print(f"Columns: {df.columns.tolist()}")
    
    print("\nThis dataset has 6 original labels:")
    print(df['label'].value_counts())
    
    # Analyze text length
    df['text_length'] = df['text'].apply(lambda x: len(str(x).split()))
    
    print("\n📝 Text Length Statistics (approx words):")
    print(df['text_length'].describe())
    
    # Binary Mapping Preview
    # False/Pants-fire/Barely-true -> FAKE (0)
    # Half-true/Mostly-true/True -> REAL (1)
    
    fake_labels = ['false', 'pants-fire', 'barely-true']
    
    df['binary_label'] = df['label'].apply(lambda x: 'FAKE' if x in fake_labels else 'REAL')
    
    print("\n🔄 Binary Label Distribution (Projected):")
    print(df['binary_label'].value_counts())
    
    print("\n🔍 Sample Data:")
    print("-" * 30)
    sample = df.sample(1).iloc[0]
    print(f"Label: {sample['label']} ({sample['binary_label']})")
    print(f"Text: {sample['text']}")
    print("-" * 30)

if __name__ == "__main__":
    explore_data()
