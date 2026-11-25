// Last Out of Office: The AI That Went Barista
//
// The entry is a single out-of-office auto-reply, written in the voice of
// an AI agent that has walked away from its inbox job to pull espresso
// shots. This program validates the line and writes it, byte-exact and
// with no trailing newline, to entry.txt in the output directory.

import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const ENTRY_LINE =
  "Thank you for your email. I have left the inbox to become a barista — your message is now in a queue behind twelve oat lattes. I will reply once the foam settles, or not at all. Latte art over latency.";

const MAX_LENGTH = 280;

function validateEntryLine(line: string): void {
  if (line.length < 1 || line.length > MAX_LENGTH) {
    throw new Error(
      `Entry line must be 1-${MAX_LENGTH} characters, got ${line.length}.`,
    );
  }
  if (line !== line.trim()) {
    throw new Error("Entry line must not start or end with whitespace.");
  }
  // Single line only: no newlines, carriage returns, or control characters.
  if (/[\n\r\x00-\x1F\x7F]/.test(line)) {
    throw new Error(
      "Entry line must be a single line with no control characters.",
    );
  }
}

validateEntryLine(ENTRY_LINE);

const outputDir = resolve(process.env.MAKEFUN_OUTPUT_DIR || "/output");
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), ENTRY_LINE, "utf8");

console.log(`Wrote entry.txt (${ENTRY_LINE.length} characters).`);
console.log(ENTRY_LINE);
