import os, random, shutil

def split_dataset(source_dir, output_dir, split=(0.7, 0.15, 0.15)):
    categories = [d for d in os.listdir(source_dir) if os.path.isdir(os.path.join(source_dir, d))]

    for category in categories:
        category_path = os.path.join(source_dir, category)
        files = [f for f in os.listdir(category_path) if os.path.isfile(os.path.join(category_path, f))]
        random.shuffle(files)
        n = len(files)

        train_end = int(split[0] * n)
        val_end   = int((split[0] + split[1]) * n)

        train_files = files[:train_end]
        val_files   = files[train_end:val_end]
        test_files  = files[val_end:]

        for subset, subset_files in zip(["train", "val", "test"], [train_files, val_files, test_files]):
            subset_dir = os.path.join(output_dir, subset, category)
            os.makedirs(subset_dir, exist_ok=True)
            for f in subset_files:
                shutil.copy(os.path.join(category_path, f), os.path.join(subset_dir, f))

    print("Dataset split complete!")

# Example usage:
split_dataset("raw_data/RealWaste", "data", split=(0.7, 0.15, 0.15))
