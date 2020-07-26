class Trie {
  children: Trie[];
  key: string; //the letter
  data: string[]; //email paths
  isRoot: boolean;

  constructor(key: string, isRoot = false) {
    this.children = [];
    this.key = key;
    this.data = [];
    this.isRoot = isRoot;
  }

  add(key: string, data: string): void {
    if (key === '' && !this.isRoot) {
      this.data.push(data);
      return;
    }

    const firstChar = key.charAt(0);

    for (const child of this.children) {
      if (child.key === firstChar) {
        child.add(key.slice(1, key.length), data);
        return;
      }
    }

    const newChild = new Trie(firstChar);
    newChild.add(key.slice(1, key.length), data);
    this.children.push(newChild);
  }

  find(key: string): string[] {
    if (key === '' && !this.isRoot) {
      return this.data;
    }

    const firstChar = key.charAt(0);
    for (const child of this.children) {
      if (child.key === firstChar) {
        return child.find(key.slice(1, key.length));
      }
    }

    return [];
  }
}

export default Trie;
