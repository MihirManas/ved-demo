from PIL import Image
import numpy as np

def process_image():
    # Load image
    img = Image.open('public/favicon.png').convert("RGBA")
    data = np.array(img)

    # Find white/near-white pixels
    # Calculate RGB distance from white (255, 255, 255)
    r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]
    
    # White threshold
    mask = (r > 240) & (g > 240) & (b > 240)
    
    # Make white pixels transparent
    data[mask, 3] = 0

    # Auto-crop the transparent bounds
    non_empty_columns = np.where(data[:, :, 3].max(axis=0) > 0)[0]
    non_empty_rows = np.where(data[:, :, 3].max(axis=1) > 0)[0]
    
    if len(non_empty_columns) > 0 and len(non_empty_rows) > 0:
        cropBox = (min(non_empty_columns), min(non_empty_rows), max(non_empty_columns)+1, max(non_empty_rows)+1)
        data = data[cropBox[1]:cropBox[3], cropBox[0]:cropBox[2], :]
        
    # Save image
    out_img = Image.fromarray(data)
    out_img.save('public/favicon.png')
    print("Background removed and image cropped successfully!")

process_image()
