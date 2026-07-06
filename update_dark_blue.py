import os
import re

src_dir = r'c:\Users\Mihir\Downloads\demo\src'

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace the previous hex code
    new_content = re.sub(r'#2B4461', r'#1F3145', content, flags=re.IGNORECASE)
    
    # Replace the exact HSL from globals.css
    new_content = new_content.replace('212.2 38.6% 27.5%', '211.5 38.0% 19.6%')

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Updated {filepath}')

for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith(('.tsx', '.ts', '.css', '.js')):
            process_file(os.path.join(root, file))

print('Done.')
