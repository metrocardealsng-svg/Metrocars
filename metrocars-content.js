/* MetroCarDeals content and controls layered over the exact Kage experience. */
(() => {
  const d = document;
  const $ = (selector) => d.querySelector(selector);
  const all = (selector) => Array.from(d.querySelectorAll(selector));
  if (d.documentElement.dataset.metroCarsExperience) return;
  d.documentElement.dataset.metroCarsExperience = "ready";
  d.title = "MetroCarDeals — Your next move, Abuja";

  const text = (selector, value) => {
    const element = $(selector);
    if (element) element.textContent = value;
  };
  const texts = (selector, values) => {
    all(selector).forEach((element, index) => {
      if (values[index] !== undefined) element.textContent = values[index];
    });
  };
  const whatsapp = "https://wa.me/2349030914429?text=" + encodeURIComponent(
    "Hi Metro, I just explored the cinematic showroom. I’m ready to discuss my next car."
  );
  const branchAssets = "https://cdn.jsdelivr.net/gh/metrocardealsng-svg/Metrocars@rebuild/kage-metrocars/";
  const external = (anchor, url) => {
    anchor.href = url;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
  };

  d.addEventListener("click", (event) => {
    const anchor = event.target.closest?.("a");
    if (anchor && /^(https?:|mailto:)/.test(anchor.getAttribute("href") || "")) {
      event.stopImmediatePropagation();
    }
  }, true);

  text(".brand-tx b", "METROCARDEALS");
  text(".brand-tx i", "CINEMATIC AUTO SHOWROOM · ABUJA");
  text(".pre-jp", "METRO");
  text(".pre-meta > span", "Opening the cinematic showroom");
  text(".hero-top .eyebrow", "ABUJA’S CINEMATIC CAR SHOWROOM");
  texts(".h-hero .mask-line > span", [
    "Your next move.",
    "Chosen with care.",
    "Delivered by Metro."
  ]);
  text(".hero-sub", "Explore distinctive cars through a showroom designed to feel as memorable as the drive itself.");
  text(".hero-cue > span", "Scroll to enter");
  text(".word-fb", "METRO");
  text(".hero-side .v", "疾走");
  texts(".nav-link > span:first-child", ["Collection", "Why Metro", "Process", "Enquire"]);
  texts(".nav-link > .alt", ["Collection", "Why Metro", "Process", "Enquire"]);
  text(".peek-cap i", "Play the Metro brand film");
  $(".peek")?.setAttribute("aria-label", "Play the MetroCarDeals cinematic film");

  texts(".chip .tx b", ["The collection", "Why Metro", "How it works", "Talk to Metro"]);
  texts(".chip .tx p", [
    "Explore standout cars currently available in Abuja.",
    "A more personal way to choose your next vehicle.",
    "From first message to inspection and delivery.",
    "Tell us what you want and let us make it happen."
  ]);
  all(".chip").forEach((element, index) => {
    const ids = ["pathways", "gate", "lessons", "eternity"];
    element.tabIndex = 0;
    element.setAttribute("role", "button");
    element.setAttribute("aria-label", ["The collection", "Why Metro", "How it works", "Talk to Metro"][index]);
    const jump = () => scrollTo({
      top: d.getElementById(ids[index]).offsetTop - 40,
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
    });
    element.addEventListener("click", jump);
    element.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        jump();
      }
    });
  });

  text("#gate .sec-head .k:first-child", "01 · THE METRO STANDARD");
  text("#gate h2", "A good car changes the journey. The right one changes what comes next.");
  text(".gate-copy .lead", "MetroCarDeals is an Abuja automotive showroom built around personal attention, clear conversations and cars with real presence. We help you move from interest to inspection without the usual noise.");
  text(".gate-copy .body", "Whether you need an everyday sedan, a commanding SUV or something electric and unexpected, the experience stays focused on one thing: finding a car that fits your next chapter.");
  text(".gate-copy .arrowlink > span:first-child", "Enter the collection");
  texts(".gate-stats b", ["Abuja", "Direct", "Verified", "Personal"]);
  texts(".gate-stats div > span", ["Local inspections", "WhatsApp access", "Vehicle conversations", "Support from Metro"]);

  text("#pathways .sec-head .k:first-child", "02 · FEATURED CARS");
  const cars = [
    {
      name: "Infiniti QX56",
      category: "2011 · Nigerian used · ₦10.5M",
      image: "assets/cars/infiniti-qx56-1.jpg",
      message: "Hi Metro, I’m interested in the 2011 Infiniti QX56 listed at ₦10.5M. Is it available?"
    },
    {
      name: "Toyota RAV4",
      category: "2017 · Abuja deal · ₦23.8M",
      image: "assets/cars/toyota-rav4-1.jpg",
      message: "Hi Metro, I’m interested in the 2017 Toyota RAV4 listed at ₦23.8M. Is it available?"
    },
    {
      name: "Sonata Sport",
      category: "2016 · Red · ₦12.85M",
      image: "assets/cars/hyundai-sonata-1.jpg",
      message: "Hi Metro, I’m interested in the red 2016 Sonata Sport listed at ₦12.85M. Is it available?"
    }
  ];
  all(".card").forEach((card, index) => {
    const car = cars[index];
    card.querySelector(".card-lab b").textContent = car.name;
    card.querySelector(".card-meta > span").textContent = car.category;
    const frame = card.querySelector(".card-fr");
    const image = d.createElement("img");
    image.className = "metro-car-image";
    image.src = branchAssets + car.image;
    image.alt = car.name;
    image.loading = index ? "lazy" : "eager";
    frame.prepend(image);
    const anchor = d.createElement("a");
    anchor.className = "metro-car-link";
    external(anchor, "https://wa.me/2349030914429?text=" + encodeURIComponent(car.message));
    anchor.setAttribute("aria-label", "Enquire about " + car.name + " on WhatsApp");
    card.append(anchor);
  });

  text("#lessons .sec-head .k:first-child", "03 · HOW IT WORKS");
  text(".cur-head h2", "From the first message to the moment you take the keys.");
  text(".cur-head p", "A straightforward buying experience, with Metro beside you through the decisions that matter.");
  const process = [
    ["Tell us the brief", "Share your preferred model, budget and the kind of driving the car needs to handle.", "Your needs first"],
    ["See the right options", "We narrow the search and show you cars that genuinely fit the brief.", "Focused shortlist"],
    ["Inspect in Abuja", "Confirm the car’s current condition and details before making a decision.", "See it properly"],
    ["Agree the deal", "We keep the conversation direct so price, timing and next steps stay clear.", "Clear decisions"],
    ["Make your move", "Complete the purchase and drive into the next chapter with confidence.", "Delivery & support"]
  ];
  all(".les").forEach((element, index) => {
    const [name, description, discipline] = process[index];
    const heading = element.querySelector("h3");
    heading.childNodes[0].textContent = name;
    heading.querySelector("em").textContent = "0" + (index + 1);
    element.querySelector("p").textContent = description;
    element.querySelector(".t").textContent = discipline;
  });

  text("#eternity .eyebrow", "04 · YOUR NEXT MOVE");
  text("#eternity h2", "Arrive different.");
  text("#eternity .body-lg", "Seen the car that feels right—or still searching? Start the conversation with Metro and let’s make the next move happen.");
  text("#eternity .cta > span", "WhatsApp Metro");
  external($("#eternity .cta"), whatsapp);

  text(".foot-brand p", "Good cars. Clear conversations. A more memorable way to find your next move in Abuja.");
  const footerLabels = [
    ["Why Metro", "Featured cars", "How it works", "Start an enquiry"],
    ["SUVs", "Sedans", "Foreign used", "Brand new"],
    ["WhatsApp Metro", "Instagram", "Call 09030914429"]
  ];
  all(".foot-grid > div:not(.foot-brand)").forEach((column, index) => {
    column.querySelector("h4").textContent = ["Explore", "Collection", "Connect"][index];
    column.querySelectorAll("a").forEach((anchor, itemIndex) => {
      if (!footerLabels[index][itemIndex]) {
        anchor.closest("li")?.remove();
        return;
      }
      anchor.textContent = footerLabels[index][itemIndex];
      if (index === 2) {
        external(anchor, [whatsapp, "https://www.instagram.com/metrocardeals/", "tel:+2349030914429"][itemIndex]);
      }
    });
  });
  texts(".foot-base > span", ["© 2026 METROCARDEALS", "ABUJA · NIGERIA", "CINEMATIC SHOWROOM"]);

  const modal = d.createElement("div");
  modal.className = "metro-film-modal";
  modal.hidden = true;
  modal.innerHTML = `
    <div class="metro-film-shell" role="dialog" aria-modal="true" aria-labelledby="metro-film-title">
      <div class="metro-film-head"><span id="metro-film-title">THE METRO BRAND FILM</span><button type="button" aria-label="Close film">×</button></div>
      <video controls muted playsinline preload="metadata" poster="${branchAssets}assets/hero-poster.jpg">
        <source src="${branchAssets}assets/hero-reveal.mp4" type="video/mp4">
      </video>
    </div>`;
  d.body.append(modal);
  const film = modal.querySelector("video");
  const openFilm = () => {
    modal.hidden = false;
    d.body.classList.add("metro-film-open");
    film.currentTime = 0;
    film.play().catch(() => {});
  };
  const closeFilm = () => {
    film.pause();
    modal.hidden = true;
    d.body.classList.remove("metro-film-open");
  };
  modal.querySelector("button").addEventListener("click", closeFilm);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeFilm();
  });
  d.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) closeFilm();
  });
  $(".peek")?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    openFilm();
  }, true);

  const dock = d.createElement("nav");
  dock.className = "metro-glass-dock";
  dock.setAttribute("aria-label", "MetroCarDeals quick actions");
  dock.innerHTML = `
    <a href="#pathways"><span>01</span> Collection</a>
    <button type="button"><span>▶</span> Play film</button>
    <a href="${whatsapp}" target="_blank" rel="noopener noreferrer"><span>↗</span> WhatsApp</a>`;
  dock.querySelector("button").addEventListener("click", openFilm);
  d.body.append(dock);

  const style = d.createElement("style");
  style.textContent = `
    .brand-tx b{font-size:clamp(13px,1.15vw,17px);letter-spacing:-.025em}
    .brand-tx i{font-size:8px;letter-spacing:.12em}.gate-stats b{font-size:clamp(16px,2.5vw,34px)}
    .card{position:relative}.card-lab,.card-ar{z-index:4}.card-lab b{font-size:clamp(20px,2.3vw,36px)}
    .metro-car-image{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;z-index:2;filter:saturate(.75) contrast(1.12) brightness(.72);transition:transform .9s var(--ease-out),filter .7s var(--ease-out)}
    .card:hover .metro-car-image{transform:scale(1.045);filter:saturate(.95) contrast(1.08) brightness(.83)}
    .card-fr::after{content:'';position:absolute;inset:0;z-index:3;pointer-events:none;background:linear-gradient(180deg,transparent 42%,rgba(3,6,8,.78) 100%),radial-gradient(circle at 82% 18%,rgba(224,35,28,.2),transparent 35%)}
    .metro-car-link{position:absolute;inset:0;z-index:8;display:block}
    .metro-glass-dock{position:fixed;left:50%;bottom:22px;transform:translateX(-50%);z-index:75;display:flex;align-items:center;gap:4px;padding:6px;border:1px solid rgba(223,231,224,.2);border-radius:999px;background:linear-gradient(135deg,rgba(20,28,32,.74),rgba(6,9,12,.46));box-shadow:0 22px 70px rgba(0,0,0,.42),inset 0 1px rgba(255,255,255,.12);backdrop-filter:blur(24px) saturate(135%);-webkit-backdrop-filter:blur(24px) saturate(135%)}
    .metro-glass-dock a,.metro-glass-dock button{min-height:42px;padding:0 17px;border-radius:999px;display:flex;align-items:center;gap:9px;color:var(--bone);font-size:10px;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap;transition:.35s var(--ease-out)}
    .metro-glass-dock a:hover,.metro-glass-dock button:hover{background:rgba(255,255,255,.1)}
    .metro-glass-dock a:last-child{background:var(--vermilion);color:white}.metro-glass-dock span{font-size:9px;color:var(--bone-dim)}
    .metro-film-modal{position:fixed;inset:0;z-index:120;display:grid;place-items:center;padding:20px;background:rgba(2,4,6,.7);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px)}
    .metro-film-modal[hidden]{display:none!important}.metro-film-shell{width:min(1040px,96vw);border:1px solid rgba(223,231,224,.22);background:rgba(7,10,13,.88);box-shadow:0 40px 120px rgba(0,0,0,.7);padding:8px}
    .metro-film-head{display:flex;align-items:center;justify-content:space-between;padding:9px 12px 15px;font-size:9px;letter-spacing:.18em}.metro-film-head button{font-size:25px;line-height:1;width:36px;height:30px}
    .metro-film-shell video{display:block;width:100%;aspect-ratio:16/9;background:#05070a;object-fit:contain}
    body.metro-film-open{overflow:hidden}.metro-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
    a:focus-visible,button:focus-visible,.chip:focus-visible{outline:2px solid var(--vermilion);outline-offset:5px}
    @media(max-width:700px){
      .metro-glass-dock{bottom:10px;width:calc(100% - 20px);justify-content:stretch;border-radius:18px}
      .metro-glass-dock a,.metro-glass-dock button{flex:1;justify-content:center;padding:0 8px;font-size:8px}.gate-stats div{padding:12px 6px!important}.gate-stats div>span{font-size:9px}
      .metro-film-modal{padding:8px}.metro-film-shell{width:100%;padding:5px}.metro-film-head{padding:7px 8px 10px}
    }
  `;
  d.head.append(style);
})();
