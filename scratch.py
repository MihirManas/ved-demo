import re

file_path = "src/constants/domainsData.ts"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

def replacer(match):
    course_id = match.group(1)
    category = match.group(2)
    
    # We also need title and tag for the SEO alt text.
    # But wait, title and tag are further down in the dictionary.
    # It might be easier to parse the whole block or just use a generic SEO text or add it dynamically in React.
    # Let's just update the image path for all of them first.
    # Wait, the user asked to "put them accordingly with alt text for better SEO".
    # I can just add `image` right after `category` if it doesn't exist, or replace it if it does.
    # In my previous script, I replaced `image: ...` if it existed. 
    # But for the 27 courses, `image` doesn't exist yet, because I only added it to the first 6 courses!
    
    return match.group(0)

# Better approach: loop through all ids, generate the new image path.
# We know the image path is /images/courses/ + course_id.replace('-', '_') + .png
# We can just do a regex replace for `category: "...",` to insert `image` if it doesn't exist.
# Or wait, it's easier to just do it via React! We don't even need an `image` field in `domainsData.ts` if we derive it from the `id`!
# `const imagePath = \`/images/courses/${course.id.replace(/-/g, '_')}.png\``
# This is much cleaner and doesn't bloat the data file!
