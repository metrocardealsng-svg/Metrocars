# Registered ThreeUI integration

Sources:
- https://threeui.com/source-code/void-field.json (revision fa86582fc870)
- https://threeui.com/source-code/glassmorphism-cta.json (revision ff30e28c2781)

All four registered files in src/shaders are byte-for-byte originals. Run
`npm ci`, `npm run test:source`, and `npm run build` to verify and rebuild.
The generated assets are committed so the existing static hosting flow still works.
No ThreeUI documentation page is embedded. The authored component itself uses a
sandboxed srcDoc iframe to isolate the supplied canonical HTML.

The registry exports VoidField and GlassmorphismCta, not the catalog facade names.
src/threeui-entry.tsx supplies the requested PredictiveArcCanvas/RectangleButtons
variant API and forwards the exact configured props. The build selects the exact
functions and definitions needed for these two effects from the shared module;
other variants and their unprovided HTML sources are not bundled.

Integration adaptations (separate from the preserved originals):
- Replaced the temple renderer and its foreground images with a fixed Void Field.
- Retained showroom content, native page scrolling, reveal transitions, menu,
  car cards, film modal, and WhatsApp destinations.
- Forwarded pointer coordinates to the authored shader listener because the
  background must not intercept page gestures.
- Changed served CTA copy from Generate My Site to WhatsApp Metro; original
  advisor portrait, icon, layers, animations, and dependency URLs remain intact.
- Native outer WhatsApp links provide reliable navigation and keyboard focus;
  their isolated decorative frames are not separate tab stops. Hover scale/glow
  is applied to the host since those frames do not intercept pointer input.
- Added bottom safe-area spacing and placed the existing attribution above the
  mobile dock. Car and film assets now resolve against the same deployment.

Validation: exact source hashes, successful production bundle, JS syntax checks,
and git diff whitespace checks. Browser checks remain pending: the provided cloud
browser blocks localhost and the prior Vercel preview is authentication-protected.
Before launch, verify 360/390/768px and desktop layouts, moving background and
pointer drift, CTA portrait/highlight, actual WhatsApp handoff, and film controls.
The existing buyer-flow.spec.js targets the older six-car UI, not PR #3's layout.
