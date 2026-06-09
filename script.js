// ── Navbar scroll effect ─────────────────────────────
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  });

  // ── Scroll reveal ────────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));

  // ── Benefit list stagger ─────────────────────────────
  const benefitItems = document.querySelectorAll('.benefit-list li');
  const benefitObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        benefitItems.forEach((li, i) => {
          setTimeout(() => li.classList.add('visible'), i * 120);
        });
        benefitObs.disconnect();
      }
    });
  }, { threshold: 0.2 });

  const benefitList = document.getElementById('benefitList');
  if (benefitList) benefitObs.observe(benefitList);

  // ── Pricing pill toggle ───────────────────────────────
const pricingData = {
  monthly: { free: '0', pro: '8',  business: '16' },
  yearly:  { free: '0', pro: '6',  business: '12' }
};

const pillMonthly = document.getElementById('pillMonthly');
const pillYearly  = document.getElementById('pillYearly');
const priceEls    = document.querySelectorAll('.price-amount');
const saveBadge   = document.querySelector('.price-save-badge');

function setPlans(type) {
  const data = pricingData[type];
  const vals = [data.free, data.pro, data.business];
  priceEls.forEach((el, i) => {
    el.textContent = vals[i];
    el.style.transform = 'scale(1.15)';
    el.style.opacity = '0.5';
    setTimeout(() => {
      el.style.transform = 'scale(1)';
      el.style.opacity = '1';
    }, 280);
  });
  if (saveBadge) {
    saveBadge.textContent = type === 'yearly' ? 'Save $24 a year' : 'Save $50 a year';
  }
  pillMonthly.classList.toggle('active', type === 'monthly');
  pillYearly.classList.toggle('active',  type === 'yearly');
}

if (pillMonthly && pillYearly) {
  pillMonthly.addEventListener('click', () => setPlans('monthly'));
  pillYearly.addEventListener('click',  () => setPlans('yearly'));
}
  // ── Smooth active nav on scroll ──────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 100) current = s.getAttribute('id');
    });
    navLinks.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === '#' + current) a.classList.add('active');
    });
  });

  // ── Counter animation for pricing ────────────────────
  function animateCount(el, from, to, duration) {
    const start = performance.now();
    const update = (now) => {
      const t = Math.min((now - start) / duration, 1);
      el.textContent = '$' + Math.floor(from + (to - from) * t);
      if (t < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

// ── CTA form handler ─────────────────────────────────
const ctaBtn = document.querySelector('.btn-cta-form');
if (ctaBtn) {
  ctaBtn.addEventListener('click', () => {
    ctaBtn.textContent = '✓ Request Sent!';
    ctaBtn.style.background = '#059669';
    setTimeout(() => {
      ctaBtn.textContent = 'Request Demo';
      ctaBtn.style.background = '';
    }, 2500);
  });
}
