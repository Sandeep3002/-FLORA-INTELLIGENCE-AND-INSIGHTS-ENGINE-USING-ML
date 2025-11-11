#!/bin/bash

# Output file
OUTPUT_FILE="project_documentation.txt"
echo "📁 PROJECT STRUCTURE\n" > "$OUTPUT_FILE"

# 1. Directory structure (excluding unwanted files and folders)
find . \( -path "*/node_modules" -o -path "*/__pycache__" -o -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.svg" -o -name "*.joblib" -o -name "*.h5" -o -name "*.pt" -o -name "*.csv" \) -prune -o -type f -print | sed 's|^\./||' | awk -F/ '{
  for (i=1;i<NF;i++) {
    indent=""; for (j=1;j<i;j++) indent=indent "  ";
    if (!seen[i FS $i]) { print indent $i; seen[i FS $i]=1 }
  }
  indent=""; for (j=1;j<NF;j++) indent=indent "  ";
  print indent $NF
}' >> "$OUTPUT_FILE"

# 2. Divider
echo -e "\n\n📜 SOURCE CODE & CONFIG FILES\n" >> "$OUTPUT_FILE"

# 3. Include source files (excluding binaries & junk)
find . -type f \( -name "*.py" -o -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" -o -name "*.html" -o -name "*.css" -o -name "*.json" -o -name "*.txt" \) ! -name "*.pyc" ! -name "*.joblib" ! -name "*.h5" ! -name "*.pt" ! -name "*.svg" ! -name "*.png" ! -name "*.jpg" ! -name "*.jpeg" ! -name "*.csv" ! -path "*/node_modules/*" | while read file; do
  echo "===== $file =====" >> "$OUTPUT_FILE"
  cat "$file" >> "$OUTPUT_FILE"
  echo -e "\n\n" >> "$OUTPUT_FILE"
done

