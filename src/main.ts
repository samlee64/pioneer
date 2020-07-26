import * as utils from './utils';
import Trie from './trie';

export async function indexEmails(pathToDirectory: string) {
  const filePaths = await utils.getFiles(pathToDirectory);

  const root = new Trie('', true);

  filePaths.map((filePath: string) => utils.parseEmail(root, filePath));

  return root;
}

export function test(word: string, trie: Trie) {
  return trie.find(word);
}
