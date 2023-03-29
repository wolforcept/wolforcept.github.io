import os
root_dir = "."
file_set = set()

f = open("files.js", "w")

f.write('var files = [\n')

for dir_, _, files in os.walk(root_dir):
    for file_name in files:
        rel_dir = os.path.relpath(dir_, root_dir)
        rel_file = os.path.join(rel_dir, file_name)
        file_set.add(rel_file)
        f.write('\t"' + rel_file.replace('\\', "/") + '",\n')

f.write('];\n')

f.close()