/* DOM interactions previously coupled to the removed temple renderer. */
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const nav = document.querySelector('.nav');
  const burger = document.querySelector('.nav-burger');
  const links = [...document.querySelectorAll('.nav-link')];
  const targets = ['pathways', 'gate', 'lessons', 'eternity'];
  links.forEach((link, i) => link.href = '#' + targets[i]);
  const close = () => {
    nav.classList.remove('menu-open');
    burger.classList.remove('active');
    burger.setAttribute('aria-expanded', 'false');
    document.documentElement.classList.remove('nav-open');
  };
  burger.setAttribute('aria-controls', 'navlinks');
  burger.setAttribute('aria-expanded', 'false');
  burger.addEventListener('click', () => {
    if (document.documentElement.clientWidth > 820) return;
    const open = !nav.classList.contains('menu-open');
    close();
    if (open) {
      nav.classList.remove('hide');
      nav.classList.add('menu-open');
      burger.classList.add('active');
      burger.setAttribute('aria-expanded', 'true');
      document.documentElement.classList.add('nav-open');
    }
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  document.addEventListener('click', e => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    close();
    scrollTo({ top: id === 'top' ? 0 : target.offsetTop - 40, behavior: reduced.matches ? 'auto' : 'smooth' });
  });
  const resize = () => {
    document.documentElement.style.setProperty('--vw', document.documentElement.clientWidth + 'px');
    if (document.documentElement.clientWidth > 820) close();
  };
  resize();
  addEventListener('resize', resize, { passive: true });
  let last = scrollY;
  addEventListener('scroll', () => {
    const y = scrollY;
    nav.classList.toggle('stuck', y > 40);
    nav.classList.toggle('hide', !nav.classList.contains('menu-open') && y > last + 4 && y > innerHeight * .8);
    last = y;
  }, { passive: true });
  const observer = new IntersectionObserver(entries => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) { target.classList.add('rv-in'); observer.unobserve(target); }
    });
  }, { threshold: .08 });
  document.querySelectorAll('[data-rv], .mask-line').forEach(el => {
    if (reduced.matches || el.closest('#hero')) el.classList.add('rv-in');
    else observer.observe(el);
  });
  document.body.classList.remove('is-locked');
})();
