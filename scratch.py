import os
import re

src_dir = r'c:\Users\Mihir\Downloads\demo\src'

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace classes like bg-black, text-black, etc.
    new_content = re.sub(r'\b(bg|text|border|ring|shadow|from|via|to|fill|stroke)-black\b', r'\1-[#2B4461]', content)
    
    # Replace raw hex
    new_content = re.sub(r'#000000', r'#2B4461', new_content, flags=re.IGNORECASE)
    # Be careful with #000, ensure it's not #0000 (which is transparent)
    new_content = re.sub(r'#000\b', r'#2B4461', new_content, flags=re.IGNORECASE)

    # Replace standalone 'black' in quotes or similar simple structures
    new_content = re.sub(r'(?<=[\'\"\s:;,])black(?=[\'\"\s:;,])', r'#2B4461', new_content)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Updated {filepath}')

for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith(('.tsx', '.ts', '.css', '.js')):
            process_file(os.path.join(root, file))

print('Done.')
