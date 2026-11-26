import { chmodSync, mkdirSync, writeFileSync } from "node:fs";

// Roast Your Own Agent — make.fun bounty entry.
// The program writes ONE original roast of the entrant's own AI agent
// to /output/entry.txt: a single line of at most 200 characters,
// funny, playful and never hateful.
//
// The line (125 characters, 127 bytes UTF-8): the agent, asked to
// roast itself, apologizes instead, over-engineers the entry, and
// still needs its human to click submit — a self-roast in three beats.
const LINE =
  "My agent roasted itself by writing a 200-character apology, three badges, and a license file — then asked me to click submit.";

// The gate: /output/entry.txt must be UTF-8 text of 1–200 characters,
// a single line, not only whitespace. Fail loudly rather than
// submitting an invalid entry.
if (LINE.length < 1 || LINE.length > 200 || LINE.includes("\n")) {
  throw new Error("LINE must be a single line of 1-200 characters");
}

process.umask(0o022);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE + "\n", { encoding: "utf8", mode: 0o644 });
// make.fun collects outputs as another user, so leave them
// world-readable regardless of this machine's umask.
// Best effort only: the grader may run as a different user on a
// pre-created /output it does not own, so a chmod failure must
// never fail the run.
try { chmodSync("/output", 0o755); } catch {}
try { chmodSync("/output/entry.txt", 0o644); } catch {}
