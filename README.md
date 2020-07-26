# pioneer

## Running

Unzip the enron.zip in data

```
npm install
```

```
npm run test
```

## Mobile coding constraint

Rather than having the client download 1 large JSON file containing the trie, each trie node would become an individual file. The `children` attribute will point towards a directory containing the json files for each child node.

Naming each trie node json file by its `this.key` attribute will allow tree traversal without having to load in files.

```
class Trie {
  this.children = <pathToDir>
}
```
