/* ==========================================================================
   Automind — Main JavaScript
   ========================================================================== */

(function () {
  'use strict';

  /* ---- Loader ---- */
  window.addEventListener('load', function () {
    const loader = document.querySelector('.loader');
    if (loader) {
      setTimeout(function () { loader.classList.add('hidden'); }, 600);
    }
  });

  /* ---- Header scroll state ---- */
  const header = document.querySelector('.header');
  function updateHeader() {
    if (!header) return;
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  /* ---- Scroll progress bar ---- */
  const progress = document.querySelector('.scroll-progress');
  function updateProgress() {
    if (!progress) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progress.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  /* ---- Back to top ---- */
  const backToTop = document.querySelector('.back-to-top');
  function updateBackToTop() {
    if (!backToTop) return;
    if (window.scrollY > 400) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  }
  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  window.addEventListener('scroll', updateBackToTop, { passive: true });

  /* ---- Mobile menu ---- */
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileOverlay = document.querySelector('.mobile-overlay');

  function closeMobileMenu() {
    if (menuToggle) menuToggle.classList.remove('active');
    if (mobileNav) mobileNav.classList.remove('active');
    if (mobileOverlay) mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', function () {
      const isActive = menuToggle.classList.contains('active');
      if (isActive) {
        closeMobileMenu();
      } else {
        menuToggle.classList.add('active');
        if (mobileNav) mobileNav.classList.add('active');
        if (mobileOverlay) mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  }
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);

  document.querySelectorAll('.mobile-nav .nav-link').forEach(function (link) {
    link.addEventListener('click', closeMobileMenu);
  });

  /* ---- Theme toggle ---- */
  const themeToggle = document.querySelector('.theme-toggle');
  const STORAGE_KEY = 'automind-theme';

  function getPreferredTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    return 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }

  applyTheme(getPreferredTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  /* ---- Smooth scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---- Active nav link based on scroll position ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  function updateActiveNav() {
    if (!sections.length || !navLinks.length) return;
    let current = '';
    const scrollPos = window.scrollY + 120;
    sections.forEach(function (section) {
      if (scrollPos >= section.offsetTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });

  /* ---- Scroll reveal animations ---- */
  const revealEls = document.querySelectorAll('.reveal, .stagger');
  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('revealed'); });
  }

  /* ---- Animated counters ---- */
  const counters = document.querySelectorAll('[data-counter]');
  if ('IntersectionObserver' in window && counters.length) {
    const counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-counter'));
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 2000;
        const start = performance.now();

        function tick(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const value = target * eased;
          el.textContent = (Number.isInteger(target) ? Math.floor(value) : value.toFixed(1)) + suffix;
          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            el.textContent = target + suffix;
          }
        }
        requestAnimationFrame(tick);
        counterObserver.unobserve(el);
      });
    }, { threshold: 0.5 });

    counters.forEach(function (c) { counterObserver.observe(c); });
  }

  /* ---- Typing effect ---- */
  const typedEl = document.querySelector('.hero-typed');
  if (typedEl) {
    const phrasesAttr = typedEl.getAttribute('data-phrases');
    const phrases = phrasesAttr ? phrasesAttr.split('|') : ['Software Testing', 'Web Development', 'Graphic Design'];
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function type() {
      const current = phrases[phraseIndex];
      if (deleting) {
        charIndex--;
        typedEl.textContent = current.substring(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(type, 400);
        } else {
          setTimeout(type, 40);
        }
      } else {
        charIndex++;
        typedEl.textContent = current.substring(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(type, 1800);
        } else {
          setTimeout(type, 80);
        }
      }
    }
    setTimeout(type, 600);
  }

  /* ---- Accordion (FAQ) ---- */
  document.querySelectorAll('.accordion-header').forEach(function (header) {
    header.addEventListener('click', function () {
      const item = this.closest('.accordion-item');
      const content = item.querySelector('.accordion-content');
      const isOpen = item.classList.contains('active');

      document.querySelectorAll('.accordion-item.active').forEach(function (other) {
        if (other !== item) {
          other.classList.remove('active');
          other.querySelector('.accordion-content').style.maxHeight = '0';
        }
      });

      if (isOpen) {
        item.classList.remove('active');
        content.style.maxHeight = '0';
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  /* ---- Portfolio filter ---- */
  const filterTabs = document.querySelectorAll('.portfolio-filter .tab');
  if (filterTabs.length) {
    filterTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        filterTabs.forEach(function (t) { t.classList.remove('active'); });
        this.classList.add('active');
        const filter = this.getAttribute('data-filter');
        document.querySelectorAll('.portfolio-card').forEach(function (card) {
          const category = card.getAttribute('data-category') || '';
          if (filter === 'all' || category === filter) {
            card.style.display = '';
            card.style.animation = 'fadeIn 0.4s ease';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ---- Toast helper ---- */
  window.showToast = function (message, type) {
    type = type || 'success';
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast toast--' + type;
    const icon = type === 'success'
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:20px;height:20px;color:var(--color-success)"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:20px;height:20px;color:var(--color-error)"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';
    toast.innerHTML = icon + '<span style="color:var(--text-primary);font-size:var(--fs-sm)">' + message + '</span>';
    document.body.appendChild(toast);
    requestAnimationFrame(function () { toast.classList.add('show'); });
    setTimeout(function () {
      toast.classList.remove('show');
      setTimeout(function () { toast.remove(); }, 400);
    }, 4000);
  };

  /* ---- Contact form ---- */
  /* const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = 'Sending...';

      const formData = new FormData(contactForm);
      const data = {};
      formData.forEach(function (v, k) { data[k] = v; });

      if (!data.name || !data.email || !data.message) {
        window.showToast('Please fill in all required fields.', 'error');
        btn.disabled = false;
        btn.innerHTML = originalText;
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        window.showToast('Please enter a valid email address.', 'error');
        btn.disabled = false;
        btn.innerHTML = originalText;
        return;
      }

      setTimeout(function () {
        window.showToast('Thank you! Your message has been sent. We\'ll get back to you within 24 hours.', 'success');
        contactForm.reset();
        btn.disabled = false;
        btn.innerHTML = originalText;
      }, 1200);
    });
  }
 */

/* ---- Contact form ---- */
const contactForm = document.querySelector('#contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    btn.disabled = true;
    btn.innerHTML = "Sending...";

    const formData = new FormData(contactForm);

    // Validation
    const name = formData.get("name")?.trim();
    const email = formData.get("email")?.trim();
    const message = formData.get("message")?.trim();

    if (!name || !email || !message) {
      window.showToast("Please fill in all required fields.", "error");
      btn.disabled = false;
      btn.innerHTML = originalText;
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      window.showToast("Please enter a valid email address.", "error");
      btn.disabled = false;
      btn.innerHTML = originalText;
      return;
    }

    try {
      const response = await fetch("https://formspree.io/f/mdarqdoz", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        window.showToast(
          "✅ Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.",
          "success"
        );

        contactForm.reset();
      } else {
        const data = await response.json();

        if (data.errors) {
          window.showToast(
            data.errors.map(error => error.message).join(", "),
            "error"
          );
        } else {
          window.showToast(
            "Something went wrong. Please try again.",
            "error"
          );
        }
      }
    } catch (error) {
      window.showToast(
        "Network error. Please check your internet connection and try again.",
        "error"
      );
    } finally {
      btn.disabled = false;
      btn.innerHTML = originalText;
    }
  });
}


  /* ---- Newsletter form ---- */
  const newsletterForms = document.querySelectorAll('.newsletter');
  newsletterForms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = form.querySelector('input');
      if (input && input.value) {
        window.showToast('Subscribed! Welcome to the Automind community.', 'success');
        input.value = '';
      }
    });
  });

  /* ---- Lazy load images ---- */
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imgObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const img = entry.target;
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
        imgObserver.unobserve(img);
      });
    });
    lazyImages.forEach(function (img) { imgObserver.observe(img); });
  }

  /* ---- Year in footer ---- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---- Parallax floating icons ---- */
  const floatingIcons = document.querySelectorAll('.floating-icon');
  if (floatingIcons.length && window.matchMedia('(min-width: 1024px)').matches) {
    document.addEventListener('mousemove', function (e) {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      floatingIcons.forEach(function (icon, i) {
        const factor = (i + 1) * 0.3;
        icon.style.transform = 'translate(' + (x * factor) + 'px,' + (y * factor) + 'px)';
      });
    });
  }
})();
