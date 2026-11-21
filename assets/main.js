(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const megaItems = nav ? [...nav.querySelectorAll('.has-mega')] : [];
  const closeMegaMenus = () => megaItems.forEach(item => {
    item.classList.remove('open');
    item.querySelector('.nav-trigger')?.setAttribute('aria-expanded', 'false');
  });
  const closeNav = () => {
    if (!toggle || !nav) return;
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'باز کردن منو');
    closeMegaMenus();
  };
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'بستن منو' : 'باز کردن منو');
      if (!open) closeMegaMenus();
    });
    megaItems.forEach(item => {
      const trigger = item.querySelector('.nav-trigger');
      const setOpen = open => {
        item.classList.toggle('open', open);
        trigger?.setAttribute('aria-expanded', String(open));
      };
      trigger?.addEventListener('click', () => {
        const open = !item.classList.contains('open');
        closeMegaMenus();
        setOpen(open);
      });
      item.addEventListener('mouseenter', () => {
        if (window.matchMedia('(min-width: 761px)').matches) setOpen(true);
      });
      item.addEventListener('mouseleave', () => {
        if (window.matchMedia('(min-width: 761px)').matches && !item.contains(document.activeElement)) setOpen(false);
      });
      item.addEventListener('focusin', () => {
        if (window.matchMedia('(min-width: 761px)').matches) setOpen(true);
      });
      item.addEventListener('focusout', event => {
        if (window.matchMedia('(min-width: 761px)').matches && !item.contains(event.relatedTarget)) setOpen(false);
      });
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNav));
    document.addEventListener('click', event => {
      if (!nav.contains(event.target) && !toggle.contains(event.target)) closeNav();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        const expanded = nav.querySelector('.nav-trigger[aria-expanded="true"]');
        closeNav();
        if (expanded) expanded.focus();
        else if (window.matchMedia('(max-width: 760px)').matches) toggle.focus();
      }
    });
  }
  const filterButtons = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('[data-category]');
  filterButtons.forEach(btn => btn.addEventListener('click', () => {
    filterButtons.forEach(item => item.classList.remove('active'));
    btn.classList.add('active');
    const selected = btn.dataset.filter;
    cards.forEach(card => card.hidden = selected !== 'all' && card.dataset.category !== selected);
  }));
  document.querySelectorAll('.faq-q').forEach(btn => btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const open = item.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  }));
  const form = document.querySelector('#quote-form');
  if (form) form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const message = form.querySelector('.form-message');
    message.textContent = 'در نسخه نمونه، اطلاعات فقط برای نمایش فرم ثبت شد و ارسال واقعی انجام نمی‌شود.';
    message.style.display = 'block';
    form.reset();
  });
})();
