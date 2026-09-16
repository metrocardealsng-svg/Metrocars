// The registered bundle exports VoidField; this adapter preserves the requested API.
import { VoidField, GlassmorphismCta, type NeuformIsolatedEffectProps } from "./shaders/neuform-isolated/NeuformIsolatedEffects";
export function PredictiveArcCanvas({ variant, ...props }: NeuformIsolatedEffectProps & { variant: "void-field" }) {
  if (variant !== "void-field") throw new Error("Only the registered void-field source is installed.");
  return <VoidField {...props} />;
}
export function RectangleButtons({ variant, ...props }: NeuformIsolatedEffectProps & { variant: "glassmorphism-cta" }) {
  if (variant !== "glassmorphism-cta") throw new Error("Only the registered glassmorphism-cta source is installed.");
  return <GlassmorphismCta {...props} />;
}
