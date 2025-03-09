// utils.ts

import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export function promptUser(question: string): Promise<string> {
  return new Promise((resolve) => rl.question(question, resolve));
}

export function closePrompt() {
  rl.close();
}
