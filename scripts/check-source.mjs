import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
const files = {
  "src/shaders/neuform-isolated/sources/glassmorphism-cta.html": "b535a5f6e778924906fa1625cf610841b847d52c17487dad83215dd5921a3863",
  "src/shaders/neuform-isolated/NeuformIsolatedEffects.tsx": "fe9856234253bc3c1a13b3afb84f3d84644dfa6d578e7203bb3e1dd5eced1b75",
  "src/shaders/neuform-isolated/sources/void-protocol.html": "affd21553ba951c0ff0f5a8e40a84ae70d49aaff3c4c69ea4ae1ec897dec21e3",
  "src/shaders/threeui.css": "efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf"
};
for (const [file, expected] of Object.entries(files)) {
  const actual = createHash("sha256").update(await readFile(file)).digest("hex");
  if (actual !== expected) throw new Error(`Source mismatch: ${file}`);
  console.log(`Verified ${file}`);
}
