import { build } from "esbuild";
import { readFile } from "node:fs/promises";
import path from "node:path";

// The registry bundle contains a multi-effect module but supplies only Void Field's
// HTML. Select its exact dependency closure without rewriting the authored code.
// All three original registered files remain untouched and hash-verifiable.
const root = process.cwd();
await build({
  entryPoints: ["src/background.tsx"],
  outfile: "assets/void-background.js",
  bundle: true,
  minify: true,
  jsx: "automatic",
  format: "iife",
  target: ["safari15", "chrome100"],
  define: { "process.env.NODE_ENV": '"production"' },
  external: ["./fonts/*"],
  alias: {
    "@designcodeio/threeui/style.css": path.join(root, "src/shaders/threeui.css"),
    "@designcodeio/threeui": path.join(root, "src/threeui-entry.tsx")
  },
  plugins: [{
    name: "registered-void-field",
    setup(ctx) {
      ctx.onLoad({ filter: /NeuformIsolatedEffects\.tsx$/ }, async ({ path: file }) => {
        const source = await readFile(file, "utf8");
        const slice = (start, end) => {
          const a = source.indexOf(start), b = source.indexOf(end, a);
          if (a < 0 || b < 0) throw new Error("Registered source structure changed");
          return source.slice(a, b);
        };
        const contents = [
          source.split("\n")[0],
          'import voidFieldSource from "./sources/void-protocol.html?raw";',
          'import glassmorphismCtaSource from "./sources/glassmorphism-cta.html?raw";',
          slice('type FocusRole =', 'const THREEUI_MARK_SVG'),
          slice('export type NeuformIsolatedEffectProps', '/* ------------------------------------------------------------------ *'),
          'const EFFECTS = {',
          slice('  glassmorphismCta: {', '  generateButton: {'),
          slice('  voidField: {', '} as const satisfies'),
          '} as const satisfies Record<string, EffectDefinition>;',
          slice('function clamp(', 'export const ExpanseField'),
          'export const VoidField = createEffectComponent(EFFECTS.voidField);',
          'export const GlassmorphismCta = createEffectComponent(EFFECTS.glassmorphismCta);'
        ].join("\n");
        return { contents, loader: "tsx", resolveDir: path.dirname(file) };
      });
      ctx.onResolve({ filter: /\.html\?raw$/ }, ({ path: file, resolveDir }) => ({ path: path.resolve(resolveDir, file.slice(0, -4)), namespace: "registered-html" }));
      ctx.onLoad({ filter: /.*/, namespace: "registered-html" }, async ({ path: file }) => {
        let contents = await readFile(file, "utf8");
        if (file.endsWith('glassmorphism-cta.html')) {
          // Product copy is the only change to the served CTA document.
          contents = contents.replace('Generate My Site', 'WhatsApp Metro');
        } else {
          // A passive background cannot receive pointer events directly. Forward
          // coordinates to the authored mouse listener without intercepting scroll.
          const bridge = `<script>addEventListener('message',function(e){if(e.source!==parent||!e.data||e.data.type!=='metro-pointer')return;document.dispatchEvent(new MouseEvent('mousemove',{clientX:e.data.x*innerWidth,clientY:e.data.y*innerHeight}));});</script>`;
          contents = contents.replace('</body>', bridge + '</body>');
        }
        return { contents, loader: "text" };
      });
    }
  }]
});
