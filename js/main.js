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
        // Add visible class to all stagger items — CSS nth-child handles delay
        const grid = entry.target.closest('.projects-grid')
          || entry.target.closest('.projects-featured')
          || entry.target.closest('.projects-compact');
        const items = grid
          ? grid.querySelectorAll('.stagger-item')
          : [entry.target];

        items.forEach(item => item.classList.add('visible'));
        staggerObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -40px 0px'
  });

  // Observe first stagger item in each grid to trigger reveal per group
  document.querySelectorAll('.projects-grid, .projects-featured, .projects-compact').forEach(grid => {
    const firstItem = grid.querySelector('.stagger-item');
    if (firstItem) staggerObserver.observe(firstItem);
  });
};

/* ────────────────────────────────────────────────────────────
   2. TYPEWRITER — Role Text Cycler
   ──────────────────────────────────────────────────────────── */
const initTypewriter = () => {
  const el = document.getElementById('role-text');
  if (!el) return;

  const roles = ['Automation Specialist', 'SEO Specialist', 'CRO Specialist'];
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
   4. HERO CANVAS — Interactive Particle Mesh
   Nodes + connecting lines that react to mouse proximity
   ──────────────────────────────────────────────────────────── */
const initCanvas = () => {
  const canvas = document.getElementById('particle-mesh');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const isMobile = window.innerWidth <= 768;
  const PARTICLE_COUNT = isMobile ? 35 : 70;
  const CONNECT_DIST = isMobile ? 100 : 140;
  const MOUSE_RADIUS = 180;

  let particles = [];
  let animationId;
  let w, h, dpr;
  let mouse = { x: -9999, y: -9999 };

  const createParticle = () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: 1.5 + Math.random() * 1.5,
    baseAlpha: 0.15 + Math.random() * 0.25,
    isAmber: Math.random() < 0.15,
  });

  // Track mouse position (full page)
  document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  document.addEventListener('mouseleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  // Scroll-fade: full opacity at top, 40% at 2x viewport, hold there
  let canvasOpacity = 1;
  window.addEventListener('scroll', () => {
    const scrollRatio = Math.min(window.scrollY / (window.innerHeight * 2), 1);
    canvasOpacity = 1 - scrollRatio * 0.6;
    canvas.style.opacity = canvasOpacity;
  }, { passive: true });

  const resize = () => {
    dpr = window.devicePixelRatio || 1;
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    particles = Array.from({ length: PARTICLE_COUNT }, createParticle);
  };

  const animate = () => {
    ctx.clearRect(0, 0, w, h);

    // Update positions
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
    }

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECT_DIST) {
          const alpha = (1 - dist / CONNECT_DIST) * 0.12;
          ctx.strokeStyle = `rgba(16,185,129,${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Mouse connections + gravity pull
    for (const p of particles) {
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < MOUSE_RADIUS) {
        // Draw line to cursor
        const alpha = (1 - dist / MOUSE_RADIUS) * 0.25;
        ctx.strokeStyle = `rgba(245,158,11,${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();

        // Gentle pull toward cursor
        p.vx += dx * 0.00008;
        p.vy += dy * 0.00008;
      }

      // Speed cap
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (speed > 0.8) {
        p.vx *= 0.8 / speed;
        p.vy *= 0.8 / speed;
      }
    }

    // Draw particles
    for (const p of particles) {
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const boost = dist < MOUSE_RADIUS ? (1 - dist / MOUSE_RADIUS) * 0.5 : 0;
      const alpha = p.baseAlpha + boost;
      const color = p.isAmber ? `rgba(245,158,11,${alpha})` : `rgba(16,185,129,${alpha})`;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r + boost * 2, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      // Glow for particles near cursor
      if (boost > 0.1) {
        ctx.shadowColor = p.isAmber ? '#F59E0B' : '#10B981';
        ctx.shadowBlur = 12 * boost;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    animationId = requestAnimationFrame(animate);
  };

  // Pause when tab is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
    } else {
      animate();
    }
  });

  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    resize();
    return;
  }

  resize();
  animate();

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
  const canvas = document.getElementById('particle-mesh');
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

    // Inline error display
    let errorEl = form.querySelector('.form-error');
    if (!errorEl) {
      errorEl = document.createElement('p');
      errorEl.className = 'form-error';
      errorEl.setAttribute('role', 'alert');
      submitBtn.parentNode.insertBefore(errorEl, submitBtn);
    }
    errorEl.textContent = '';

    if (!name || !email || !message) {
      errorEl.textContent = 'Please fill in all fields.';
      return;
    }
    if (!email.includes('@')) {
      errorEl.textContent = 'Please enter a valid email address.';
      return;
    }

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      // Send to GHL via Cloudflare Worker
      const response = await fetch('https://kei-ghl-contact.abillon13.workers.dev/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email, message,
          'cf-turnstile-response': form.querySelector('[name="cf-turnstile-response"]')?.value || '',
        }),
      });

      if (!response.ok) throw new Error('Submission failed');

      submitBtn.textContent = '✓ Sent!';
      submitBtn.classList.add('btn--success');
      form.reset();

      setTimeout(() => {
        submitBtn.textContent = 'Send Message';
        submitBtn.classList.remove('btn--success');
        submitBtn.disabled = false;
      }, 3000);
    } catch (err) {
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled = false;
      errorEl.textContent = 'Something went wrong. Please try again or email me directly.';
    }
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

/* ────────────────────────────────────────────────────────────
   10. MOUSE-FOLLOW GLOW — Interactive Spotlight on Glow Cards
   ──────────────────────────────────────────────────────────── */
const initGlowCards = () => {
  document.querySelectorAll('.card-image--glow').forEach(card => {
    const spot = card.querySelector('.card-glow-spot');
    if (!spot) return;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      spot.style.left = (e.clientX - rect.left) + 'px';
      spot.style.top = (e.clientY - rect.top) + 'px';
    });
  });
};

/* ────────────────────────────────────────────────────────────
   11. CARD TILT — Subtle Perspective Tilt on Project Cards
   ──────────────────────────────────────────────────────────── */
const initCardTilt = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;  // -0.5 to 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
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
  initCanvas();
  initParallax();
  initGlowCards();
  initCardTilt();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
