import { createRoot } from "react-dom/client";
import { useEffect, useRef } from "react";
import { PredictiveArcCanvas, RectangleButtons } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export function Scene() {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const frame = host.current?.querySelector('iframe');
    if (!frame) return;
    frame.tabIndex = -1;
    const move = (e: PointerEvent) => frame.contentWindow?.postMessage({ type: 'metro-pointer', x: e.clientX / innerWidth, y: e.clientY / innerHeight }, '*');
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, []);
  return (
    <div className="shader-frame" ref={host}>
      <PredictiveArcCanvas variant="void-field" hue={0} saturation={1.00} brightness={1.00} />
    </div>
  );
}

const mount = document.getElementById("metro-background");
if (mount) createRoot(mount).render(<Scene />);

function ContactCTA({ href }: { href: string }) {
  const host = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const frame = host.current?.querySelector('iframe');
    if (frame) { frame.tabIndex = -1; frame.setAttribute('aria-hidden', 'true'); }
  }, []);
  return <a className="metro-glass-contact" ref={host} href={href} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Metro">
    <div className="shader-frame" aria-hidden="true">
      <RectangleButtons variant="glassmorphism-cta" mode="dark" hue={0} saturation={1.00} brightness={1.00} />
    </div>
  </a>;
}

// The existing content script runs before this deferred bundle.
for (const anchor of document.querySelectorAll<HTMLAnchorElement>('#eternity .cta, .metro-glass-dock a:last-child')) {
  const holder = document.createElement('div');
  holder.className = 'metro-cta-mount';
  const href = anchor.href;
  anchor.replaceWith(holder);
  createRoot(holder).render(<ContactCTA href={href} />);
}
