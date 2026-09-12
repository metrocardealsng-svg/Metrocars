/* Event hooks only. Google reporting requires the owner's Google tag/container.
 * Never include names, messages or WhatsApp query strings in measurement data.
 * Contact clicks indicate intent, not a message sent or a completed sale.
 */
window.dataLayer = window.dataLayer || [];
document.addEventListener('click', function (event) {
  const link = event.target.closest('a');
  if (!link) return;
  const href = link.getAttribute('href') || '';
  const channel = href.startsWith('https://wa.me/') ? 'whatsapp' : href.startsWith('tel:') ? 'phone' : null;
  if (!channel) return;
  window.dataLayer.push({event:'contact_click',contact_channel:channel,contact_location:link.closest('dialog')?'vehicle_or_enquiry_dialog':link.closest('header')?'header':link.closest('.mobile-bar')?'mobile_bar':'page'});
});
