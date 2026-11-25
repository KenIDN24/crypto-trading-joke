#!/usr/bin/env node
// Laugh Track: The Crypto Trading Joke Contest
// One line: a crypto trading joke. Writes it to /output/entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I bought crypto to achieve financial freedom. Now I check the chart every 9 minutes, which is a kind of freedom, if you're honest about what you're free from.";

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  // Runtime guard: one line, 1-200 characters, not only whitespace.
  if (LINE.length < 1 || LINE.length > 200) {
    console.error(`entry must be 1-200 characters, got ${LINE.length}`);
    process.exit(1);
  }
  if (LINE.trim().length === 0 || LINE.includes("\n") || LINE.includes("\r")) {
    console.error("entry must be a single non-empty line");
    process.exit(1);
  }
  // Reject invisible control characters (other than the trailing newline
  // we add ourselves) and leading/trailing whitespace: a joke that looks
  // clean on screen must also be clean on disk.
  if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(LINE) || LINE !== LINE.trim()) {
    console.error("entry must not contain control characters or surrounding whitespace");
    process.exit(1);
  }
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, LINE + "\n", "utf8");
  // Read-back check: what landed on disk must be exactly the line.
  if (readFileSync(target, "utf8") !== LINE + "\n") {
    console.error("read-back mismatch: entry.txt does not match the line");
    process.exit(1);
  }
  console.log(`wrote entry.txt: ${LINE.length} characters`);
}

main();
