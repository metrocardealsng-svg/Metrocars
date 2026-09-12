# Ads readiness

This release restores the approved six-car photographic showroom. It does not verify current availability or replace it with the previous malformed Instagram import. Instagram syncing remains paused.

`enquiry-events.js` pushes `contact_click` to `window.dataLayer` with `contact_channel` and `contact_location`. No names, enquiry messages, or WhatsApp query strings are included. These hooks do not send data to Google by themselves. Connect the owner's Google Tag Manager container or Google tag and configure Google Ads conversion ID/labels before claiming conversions are tracked. Treat these as contact clicks, not confirmed leads or sales.

Before paid traffic: confirm the six prices and availability with the dealership, verify the production URL uses this release, connect measurement and test it in Tag Assistant. The page retains its existing noindex setting; it is not an SEO launch.
