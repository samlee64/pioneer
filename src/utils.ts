const { resolve } = require('path');
const { readdir } = require('fs').promises;
import * as fs from 'fs';
import Trie from './trie';

const breakpoint: string = 'X-FileName';

export async function getFiles(path: string) {
  const dirents = await readdir(path, { withFileTypes: true });

  const files = await Promise.all(
    dirents.map((dirent: { name: string; isDirectory: () => boolean }) => {
      const res = resolve(path, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    }),
  );
  return Array.prototype.concat(...files);
}

//parse out to sender/sent level information and return only the message
export function parseEmail(root: Trie, filePath: string): Trie {
  const data = fs.readFileSync(filePath, 'utf8');
  const lines = data.split(/\r?\n/);

  let seenMsg = false;
  for (const line of lines) {
    if (seenMsg) {
      const words = line.split(' ');
      for (const word of words) {
        root.add(word, filePath);
      }
    }

    if (line.slice(0, breakpoint.length) === breakpoint) seenMsg = true;
  }

  return root;
}
