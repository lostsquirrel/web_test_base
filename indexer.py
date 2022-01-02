import os
import json

hide = (".git", ".gitignore", ".vscode", "Dockerfile", "favicon.iso", "indexer.py")

class Tree(dict):

    def __getitem__(self, key):
        return self[key]
    
    def __setitem__(self, key, value):
        self[key] = value

def build_directory(dir):
    
    for d in os.listdir(dir):
        print(dir)
        if not d in hide:
            current = os.path.join(dir, d)

            if os.path.isfile(current):
                files[dir].append(current)
            else:
                files[current] = list()
                directories.append(current)
            
    
    


if __name__ == '__main__':
    directories = ["."]
    files = dict()
    files["."] = []

    while len(directories) > 0:
        dir = directories.pop()
        
        build_directory(dir)

    # print(files)
    with open("meta.json", "w") as f:
        f.write(json.dumps(files))
    # print(json.dumps(t))
    