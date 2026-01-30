from datasets import load_dataset
import pandas as pd
import os

def download_liar_dataset():
    print("Downloading LIAR dataset from Hugging Face...")
    try:
        # Load dataset from huggingface
        dataset = load_dataset("liar", trust_remote_code=True)
        
        # Get absolute path for clarity
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) # Go up one level from scripts
        output_dir = os.path.join(base_dir, "ml-training", "data", "raw", "liar_dataset")
        os.makedirs(output_dir, exist_ok=True)
        
        print(f"Target directory: {output_dir}")
        
        # Save splits to CSV
        for split in ["train", "validation", "test"]:
            print(f"Processing {split} split...")
            df = pd.DataFrame(dataset[split])
            
            # Map validation to val for consistency
            filename = "val.csv" if split == "validation" else f"{split}.csv"
            output_path = os.path.join(output_dir, filename)
            
            df.to_csv(output_path, index=False)
            print(f"Saved {split} set to {output_path}")
            
        print("✅ LIAR dataset downloaded and saved successfully!")
        
    except Exception as e:
        print(f"❌ Error downloading dataset: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    download_liar_dataset()
