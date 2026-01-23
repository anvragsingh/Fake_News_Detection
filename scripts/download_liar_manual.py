import requests
import zipfile
import io
import os
import shutil

def download_liar_manual():
    url = "https://www.cs.ucsb.edu/~william/data/liar_dataset.zip"
    output_dir = os.path.join("ml-training", "data", "raw", "liar_dataset")
    os.makedirs(output_dir, exist_ok=True)
    
    print(f"Downloading from {url}...")
    try:
        r = requests.get(url)
        r.raise_for_status()
        z = zipfile.ZipFile(io.BytesIO(r.content))
        z.extractall(output_dir)
        print(f"Extracted to {output_dir}")
        
        # Renaissance of file names
        # The zip contains train.tsv, test.tsv, valid.tsv usually
        # We want csvs. providing a converter
        
        import csv
        
        for file in ["train.tsv", "test.tsv", "valid.tsv"]:
            src = os.path.join(output_dir, file)
            if os.path.exists(src):
                dst_name = file.replace(".tsv", ".csv").replace("valid", "val")
                dst = os.path.join(output_dir, dst_name)
                
                print(f"Converting {file} to {dst_name}...")
                
                # LIAR dataset TSV format:
                # ID, label, statement, subjects, speaker, job, state, party, barely_true, false, half_true, mostly_true, pants_on_fire, context
                headers = [
                    "id", "label", "text", "subject", "speaker", "job_title", 
                    "state_info", "party_affiliation", "barely_true_counts", 
                    "false_counts", "half_true_counts", "mostly_true_counts", 
                    "context"
                ]
                
                with open(src, 'r', encoding='utf-8') as tsvfile:
                    reader = csv.reader(tsvfile, delimiter='\t')
                    with open(dst, 'w', newline='', encoding='utf-8') as csvfile:
                        writer = csv.writer(csvfile)
                        writer.writerow(headers)
                        for row in reader:
                            # Sometimes rows might have different lengths, be careful
                            if len(row) >= 3: 
                                writer.writerow(row[:len(headers)]) # Truncate or map
                                
                print(f"Converted {dst}")
                
        print("✅ Manual download and conversion complete.")
        
    except Exception as e:
        print(f"❌ Error manual download: {e}")

if __name__ == "__main__":
    download_liar_manual()
