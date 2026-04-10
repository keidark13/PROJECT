/* ============================================================
   MAIN.JS — Kei Personal Website
   Handles: scroll animations, mobile nav, typewriter,
            parallax, navbar blur, form interaction
   No external dependencies — vanilla JS only
   ============================================================ */

'use strict';

/* ────────────────────────────────────────────────────────────
   1. INTERSECTION OBSERVER — Scroll Reveal
   ──────────────────────────────────────────────────────────── */
const scrollReveal = () => {
  const sections = document.querySelectorAll('.fade-section');
  const staggerItems = document.querySelectorAll('.stagger-item');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        sectionObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  sections.forEach(section => sectionObserver.observe(section));

  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Stagger cards with delay
        const items = entry.target.closest('.projects-grid')
          ? entry.target.closest('.projects-grid').querySelectorAll('.stagger-item')
          : [entry.target];

        items.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('visible');
          }, index * 60);
        });
        staggerObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -40px 0px'
  });

  // Observe only first stagger item to trigger all
  if (staggerItems.length > 0) {
    staggerObserver.observe(staggerItems[0]);
  }
};

/* ────────────────────────────────────────────────────────────
   2. TYPEWRITER — Role Text Cycler
   ──────────────────────────────────────────────────────────── */
const initTypewriter = () => {
  const el = document.getElementById('role-text');
  if (!el) return;

  const roles = ['[YOUR ROLE 1]', '[YOUR ROLE 2]', '[YOUR ROLE 3]'];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;

  const TYPE_SPEED = 80;   // ms per character when typing
  const DELETE_SPEED = 45; // ms per character when deleting
  const PAUSE_AFTER_TYPE = 1800; // ms pause after full word
  const PAUSE_AFTER_DELETE = 400; // ms pause before next word

  const tick = () => {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      // Typing
      el.textContent = currentRole.slice(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentRole.length) {
        if (!isPaused) {
          isPaused = true;
          setTimeout(() => {
            isPaused = false;
            isDeleting = true;
            requestAnimationFrame(loop);
          }, PAUSE_AFTER_TYPE);
          return;
        }
      }
    } else {
      // Deleting
      el.textContent = currentRole.slice(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        charIndex = 0;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(() => {
          requestAnimationFrame(loop);
        }, PAUSE_AFTER_DELETE);
        return;
      }
    }

    setTimeout(() => requestAnimationFrame(loop), isDeleting ? DELETE_SPEED : TYPE_SPEED);
  };

  let animFrame;
  const loop = () => {
    tick();
  };

  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = roles[0];
    return;
  }

  // Start after hero entrance animation
  setTimeout(loop, 1200);
};

/* ────────────────────────────────────────────────────────────
   3. NAVIGATION — Scroll Effect + Mobile Nav
   ──────────────────────────────────────────────────────────── */
const initNav = () => {
  const nav = document.getElementById('nav');
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const overlay = document.getElementById('nav-overlay');
  const mobileClose = document.getElementById('mobile-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!nav) return;

  // Scroll → add glassmorphism blur class
  const handleScroll = () => {
    if (window.scrollY > 60) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }

    // Active nav link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // run on load

  // Mobile nav open
  const openMobileNav = () => {
    mobileNav.classList.add('open');
    overlay.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileNav.setAttribute('aria-hidden', 'false');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    mobileClose.focus();
  };

  // Mobile nav close
  const closeMobileNav = () => {
    mobileNav.classList.remove('open');
    overlay.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    hamburger.focus();
  };

  hamburger?.addEventListener('click', openMobileNav);
  mobileClose?.addEventListener('click', closeMobileNav);
  overlay?.addEventListener('click', closeMobileNav);

  // Close on nav link click
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      closeMobileNav();
    }
  });
};

/* ────────────────────────────────────────────────────────────
   4. HERO CANVAS — Beams Background Effect
   Ported from BeamsBackground React component (motion/react)
   ──────────────────────────────────────────────────────────── */
const initCanvas = () => {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const MINIMUM_BEAMS = 20;
  const TOTAL_BEAMS = Math.floor(MINIMUM_BEAMS * 1.5);

  let beams = [];
  let animationId;
  let w, h;

  // Create a single beam with random properties
  const createBeam = () => {
    const angle = -35 + Math.random() * 10;
    return {
      x: Math.random() * w * 1.5 - w * 0.25,
      y: Math.random() * h * 1.5 - h * 0.25,
      width: 30 + Math.random() * 60,
      length: h * 2.5,
      angle,
      speed: 0.6 + Math.random() * 1.2,
      opacity: 0.12 + Math.random() * 0.16,
      hue: 190 + Math.random() * 70,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.02 + Math.random() * 0.03,
    };
  };

  // Reset a beam when it scrolls off screen — distribute across 3 columns
  const resetBeam = (beam, index) => {
    const column = index % 3;
    const spacing = w / 3;
    beam.y = h + 100;
    beam.x = column * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.5;
    beam.width = 100 + Math.random() * 100;
    beam.speed = 0.5 + Math.random() * 0.4;
    beam.hue = 190 + (index * 70) / TOTAL_BEAMS;
    beam.opacity = 0.2 + Math.random() * 0.1;
  };

  // Draw a single beam with gradient and pulsing opacity
  const drawBeam = (beam) => {
    ctx.save();
    ctx.translate(beam.x, beam.y);
    ctx.rotate((beam.angle * Math.PI) / 180);

    const pulsingOpacity = beam.opacity * (0.8 + Math.sin(beam.pulse) * 0.2);

    const gradient = ctx.createLinearGradient(0, 0, 0, beam.length);
    gradient.addColorStop(0,   `hsla(${beam.hue}, 85%, 65%, 0)`);
    gradient.addColorStop(0.1, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity * 0.5})`);
    gradient.addColorStop(0.4, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity})`);
    gradient.addColorStop(0.6, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity})`);
    gradient.addColorStop(0.9, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity * 0.5})`);
    gradient.addColorStop(1,   `hsla(${beam.hue}, 85%, 65%, 0)`);

    ctx.fillStyle = gradient;
    ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
    ctx.restore();
  };

  // Resize canvas with DPR for crisp rendering on retina
  const resize = () => {
    const dpr = window.devicePixelRatio || 1;
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width  = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width  = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.scale(dpr, dpr);
    beams = Array.from({ length: TOTAL_BEAMS }, createBeam);
  };

  // Main animation loop
  const animate = () => {
    ctx.clearRect(0, 0, w, h);
    ctx.filter = 'blur(35px)';

    beams.forEach((beam, index) => {
      beam.y -= beam.speed;
      beam.pulse += beam.pulseSpeed;
      if (beam.y + beam.length < -100) resetBeam(beam, index);
      drawBeam(beam);
    });

    animationId = requestAnimationFrame(animate);
  };

  // Pause when tab is hidden (saves battery/CPU)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
    } else {
      animate();
    }
  });

  // Respect reduced motion — static gradient fallback
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    resize();
    const grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.7);
    grad.addColorStop(0, 'hsla(260, 85%, 65%, 0.08)');
    grad.addColorStop(1, 'rgba(15, 15, 35, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    return;
  }

  // Start
  resize();
  animate();

  // Debounced resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 200);
  }, { passive: true });
};

/* ────────────────────────────────────────────────────────────
   5. PARALLAX — Subtle Hero Depth Effect
   ──────────────────────────────────────────────────────────── */
const initParallax = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const hero = document.getElementById('hero');
  const canvas = document.getElementById('hero-canvas');
  if (!hero || !canvas) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        const heroHeight = hero.offsetHeight;

        if (scrolled < heroHeight) {
          const parallaxValue = scrolled * 0.25;
          canvas.style.transform = `translateY(${parallaxValue}px)`;
        }

        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
};

/* ────────────────────────────────────────────────────────────
   6. CONTACT FORM — Frontend Interaction
   ──────────────────────────────────────────────────────────── */
const initForm = () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    // Basic validation
    if (!name || !email || !message) {
      alert('Please fill in all fields.');
      return;
    }
    if (!email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }

    // TODO: Wire to real endpoint before launch.
    // Formspree: set form action="https://formspree.io/f/YOUR_ID" method="POST"
    // Web3Forms: fetch('https://api.web3forms.com/submit', { method:'POST', body: formData })
    // EmailJS: emailjs.send('service_id', 'template_id', { name, email, message })
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    await new Promise(resolve => setTimeout(resolve, 1200));

    submitBtn.textContent = '✓ Sent!';
    submitBtn.classList.add('btn--success');
    form.reset();

    setTimeout(() => {
      submitBtn.textContent = 'Send Message';
      submitBtn.classList.remove('btn--success');
      submitBtn.disabled = false;
    }, 3000);
  });
};

/* ────────────────────────────────────────────────────────────
   7. SMOOTH SCROLL — Native anchor links with offset
   ──────────────────────────────────────────────────────────── */
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;

      e.preventDefault();

      const navHeight = document.getElementById('nav')?.offsetHeight || 80;
      const targetY = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({
        top: targetY,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
      });
    });
  });
};

/* ────────────────────────────────────────────────────────────
   INIT — Run everything on DOM ready
   ──────────────────────────────────────────────────────────── */
/* ────────────────────────────────────────────────────────────
   GHL MODAL
   ──────────────────────────────────────────────────────────── */
/* ────────────────────────────────────────────────────────────
   WORKFLOW SLIDESHOW
   ──────────────────────────────────────────────────────────── */
const initSlideshow = () => {
  const slides = document.querySelectorAll('.wf-slide');
  const dotsContainer = document.getElementById('wf-dots');
  const prevBtn = document.getElementById('wf-prev');
  const nextBtn = document.getElementById('wf-next');
  if (!slides.length || !dotsContainer) return;

  let current = 0;

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'wf-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  const goTo = (index) => {
    slides[current].classList.remove('active');
    dotsContainer.children[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dotsContainer.children[current].classList.add('active');
  };

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));
};

const initModal = () => {
  const overlay = document.getElementById('ghl-modal');
  const openBtn = document.getElementById('open-ghl-modal');
  const closeBtn = document.getElementById('modal-close');
  if (!overlay || !openBtn || !closeBtn) return;

  const open = (e) => {
    e.preventDefault();
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
};

/* ────────────────────────────────────────────────────────────
   8. SKILLS CAROUSEL
   ──────────────────────────────────────────────────────────── */
const initSkillsCarousel = () => {
  const track = document.getElementById('skills-track');
  const dotsContainer = document.getElementById('skills-dots');
  const prevBtn = document.getElementById('skills-prev');
  const nextBtn = document.getElementById('skills-next');
  if (!track || !dotsContainer) return;

  const cards = track.querySelectorAll('.skill-card');
  const isMobile = () => window.innerWidth <= 768;

  // Build dots
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'skills-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Go to skill ${i + 1}`);
    dot.addEventListener('click', () => scrollToCard(i));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.skills-dot');

  const scrollToCard = (index) => {
    if (!isMobile()) return;
    const card = cards[index];
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
  };

  // Sync dots on scroll
  const observer = new IntersectionObserver((entries) => {
    if (!isMobile()) return;
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
        const index = Array.from(cards).indexOf(entry.target);
        dots.forEach((d, i) => d.classList.toggle('active', i === index));
      }
    });
  }, { root: track, threshold: 0.5 });

  cards.forEach(card => observer.observe(card));

  let currentCard = 0;
  prevBtn?.addEventListener('click', () => {
    currentCard = Math.max(0, currentCard - 1);
    scrollToCard(currentCard);
  });
  nextBtn?.addEventListener('click', () => {
    currentCard = Math.min(cards.length - 1, currentCard + 1);
    scrollToCard(currentCard);
  });
};

/* ────────────────────────────────────────────────────────────
   9. THEME TOGGLE — Light / Dark Mode
   ──────────────────────────────────────────────────────────── */
const initTheme = () => {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    setTheme(current === 'dark' ? 'light' : 'dark');
  });

  // Sync if OS preference changes and user has no manual override
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
};

const init = () => {
  scrollReveal();
  initTypewriter();
  initNav();
  initTheme();
  initSkillsCarousel();
  initForm();
  initSmoothScroll();
  initSlideshow();
  initModal();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
