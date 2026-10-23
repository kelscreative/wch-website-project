/**
 * WISDOM AND COUNSEL HOUSE (WCH) - OFFICIAL APPLICATION SCRIPT
 * Handles mobile drawer, smooth navigation, scrollspy, modal drawers, and interactive continuum.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileDrawer();
  initStickyHeader();
  initScrollSpyAndSmoothScroll();
  initContinuumInteractions();
  initModals();
  initInquiryForms();
  initScrollReveals();
});

/* ==========================================================================
   MOBILE MENU DRAWER
   ========================================================================== */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const closeBtn = document.getElementById('mobileCloseBtn');
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('mobileDrawerOverlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer || !overlay) return;

  function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    toggleBtn.setAttribute('aria-expanded', 'true');
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    toggleBtn.setAttribute('aria-expanded', 'false');
  }

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   SCROLLSPY & SMOOTH SCROLLING
   ========================================================================== */
function initScrollSpyAndSmoothScroll() {
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const sections = document.querySelectorAll('section[id], footer[id]');
  const headerHeight = 76;

  // Smooth scroll with header offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Intersection Observer for active nav state
  const observerOptions = {
    root: null,
    rootMargin: `-${headerHeight}px 0px -40% 0px`,
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   INTERACTIVE PROPHETIC CONTINUUM
   ========================================================================== */
function initContinuumInteractions() {
  const pills = document.querySelectorAll('.continuum-pill');
  const detailsBox = document.getElementById('continuumDetails');
  
  if (!detailsBox) return;

  const stepData = {
    revelation: {
      title: "01 — Revelation",
      body: "Recognising, receiving, testing, understanding, and responsibly stewarding what God communicates. Revelation must always align with canonical Scripture and produce holiness rather than sensationalism."
    },
    wisdom: {
      title: "02 — Wisdom",
      body: "Understanding and applying God's ways in life, relationships, decisions, character, and governance. Wisdom is the principal thing—the foundational skill for righteous stewardship in the world."
    },
    counsel: {
      title: "03 — Counsel",
      body: "Biblical wisdom and godly guidance for decisions, personal development, character formation, and reconciliation. Helping people navigate complex decisions through the illumination of the Holy Spirit."
    },
    responsibility: {
      title: "04 — Responsibility",
      body: "The ethical weight of revelation. What God reveals is never for careless exhibition; it requires disciplined stewardship, accountability, moral sobriety, and faithful action."
    },
    formation: {
      title: "05 — Formation",
      body: "Moving beyond information into maturity, Christlike character, humility, discipline, obedience, and service before God and men. The ultimate goal of all divine counsel is Christ formed in you."
    }
  };

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      const step = pill.dataset.step;
      if (!step || !stepData[step]) return;

      pills.forEach(p => p.classList.remove('active-highlight'));
      pill.classList.add('active-highlight');

      detailsBox.innerHTML = `
        <div style="animation: fadeIn 0.3s ease; text-align: center; max-width: 600px; margin: 18px auto 0; padding: 14px 20px; background: rgba(255,255,255,0.85); border-radius: 12px; border: 1px solid rgba(4,27,50,0.08); box-shadow: 0 4px 12px rgba(4,27,50,0.04);">
          <strong style="color: #041B32; font-family: 'Cormorant Garamond', serif; font-size: 18px; display: block; margin-bottom: 4px;">${stepData[step].title}</strong>
          <span style="font-size: 13.5px; color: #334155; line-height: 1.5;">${stepData[step].body}</span>
        </div>
      `;
    });
  });
}

/* ==========================================================================
   MODAL CONTROLLER
   ========================================================================== */
function initModals() {
  const triggers = document.querySelectorAll('[data-modal-target]');
  const closeButtons = document.querySelectorAll('.modal-close-btn, [data-modal-close]');
  const backdrops = document.querySelectorAll('.modal-backdrop');

  function openModal(modalId) {
    const targetModal = document.getElementById(modalId);
    if (!targetModal) return;
    targetModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.getAttribute('data-modal-target');
      openModal(modalId);
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const parentModal = btn.closest('.modal-backdrop');
      closeModal(parentModal);
    });
  });

  backdrops.forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeModal(backdrop);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      backdrops.forEach(b => closeModal(b));
    }
  });
}

/* ==========================================================================
   MINISTRY INQUIRY & CONTACT FORMS
   - Directly integrated to send to:
     wisdomandcounselhouse@gmail.com
     harrisonihunwa@icloud.com
   ========================================================================== */
function initInquiryForms() {
  const forms = [
    { formId: 'ministryInquiryForm', statusId: 'inquiryFormStatus' },
    { formId: 'contactPageForm', statusId: 'contactFormStatus' }
  ];

  forms.forEach(({ formId, statusId }) => {
    const form = document.getElementById(formId);
    const statusMsg = document.getElementById(statusId);

    if (!form || !statusMsg) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Submit Ministry Inquiry';

      const nameInput = form.querySelector('[name="name"]');
      const emailInput = form.querySelector('[name="email"]');
      const messageInput = form.querySelector('[name="message"]');
      const categoryInput = form.querySelector('[name="category"]');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';
      const category = categoryInput ? categoryInput.value : 'General Inquiry';

      if (!name || !email || !message) {
        statusMsg.style.display = 'block';
        statusMsg.innerHTML = '<div style="color: #DC2626; padding: 10px; font-size: 13.5px;">Please fill out your name, email, and message.</div>';
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Transmitting to Ministry Leadership...';
      }

      statusMsg.style.display = 'block';
      statusMsg.innerHTML = '<div style="color: #041B32; font-size: 13.5px; padding: 8px;">Transmitting inquiry...</div>';

      try {
        const payload = {
          name,
          email,
          category,
          message,
          _cc: 'harrisonihunwa@icloud.com',
          _subject: `New WCH Inquiry: ${category} from ${name}`,
          _template: 'table'
        };

        const response = await fetch('https://formsubmit.co/ajax/wisdomandcounselhouse@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          form.reset();
          if (submitBtn) submitBtn.style.display = 'none';
          statusMsg.innerHTML = `
            <div style="background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 12px; padding: 20px; text-align: center; margin-top: 14px;">
              <h4 style="font-family: 'Cormorant Garamond', serif; font-size: 22px; color: #166534; margin-bottom: 8px;">Inquiry Delivered</h4>
              <p style="font-size: 14px; color: #14532D; margin-bottom: 8px; line-height: 1.6;">
                Thank you, ${name}. Your message has been routed directly to <strong>wisdomandcounselhouse@gmail.com</strong> and <strong>harrisonihunwa@icloud.com</strong>.
              </p>
              <span style="font-size: 12px; color: #4B5563;">A ministry coordinator will review your communication and respond in due course.</span>
            </div>
          `;
        } else {
          throw new Error('Direct endpoint response non-200');
        }
      } catch (err) {
        // Fallback: Mailto link preaddressed to both required emails
        const mailtoLink = `mailto:wisdomandcounselhouse@gmail.com?cc=harrisonihunwa@icloud.com&subject=${encodeURIComponent('WCH Ministry Inquiry: ' + category)}&body=${encodeURIComponent('Full Name: ' + name + '\nEmail: ' + email + '\nCategory: ' + category + '\n\nMessage:\n' + message)}`;

        statusMsg.innerHTML = `
          <div style="background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 12px; padding: 18px; text-align: center; margin-top: 14px;">
            <p style="font-size: 14px; color: #1E3A8A; margin-bottom: 12px; line-height: 1.6;">
              Your inquiry has been formulated. Click below to deliver your message directly to <strong>wisdomandcounselhouse@gmail.com</strong> and <strong>harrisonihunwa@icloud.com</strong>:
            </p>
            <a href="${mailtoLink}" class="btn-primary-dark" style="display: inline-flex; margin: 0 auto; text-decoration: none;">
              Send via Email App →
            </a>
          </div>
        `;
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      }
    });
  });
}


/* ==========================================================================
   STICKY HEADER SCROLL STATE (AMPLIQ HQ INSPIRED)
   - Gracefully compacts and deepens blur and shadow upon downward scroll
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   SCROLL REVEALS & MOTION ORCHESTRATION (AMPLIQ HQ INSPIRED)
   - Smooth entrance with subtle upward rise, scale, and blur clearing
   - Staggered child reveals for card grids
   - Fully respects prefers-reduced-motion
   - Unobserves after initial reveal to eliminate repetitive triggers & lag
   ========================================================================== */
function initScrollReveals() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return;
  }

  document.documentElement.classList.add('motion-ready');

  const singleTargets = document.querySelectorAll(`
    .content-block-card,
    .launch-card,
    .founder-grid,
    .section-header-centered,
    .movement-header,
    .cta-section .container,
    .continuum-section .section-title-sm,
    .continuum-section .section-subtitle-sm,
    .continuum-track
  `);

  const staggerContainers = document.querySelectorAll(`
    .pillars-grid,
    .chambers-list,
    .cards-grid-dual,
    .teachings-grid,
    .launch-columns-grid,
    .values-pill-grid,
    .culture-pairs-grid
  `);

  if (!('IntersectionObserver' in window)) {
    singleTargets.forEach(el => el.classList.add('revealed'));
    staggerContainers.forEach(c => c.classList.add('revealed'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.08
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  singleTargets.forEach(el => {
    el.classList.add('reveal-on-scroll');
    revealObserver.observe(el);
  });

  staggerContainers.forEach(container => {
    container.classList.add('reveal-stagger');
    revealObserver.observe(container);
  });

  requestAnimationFrame(() => {
    const windowHeight = window.innerHeight;
    document.querySelectorAll('.reveal-on-scroll, .reveal-stagger').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < windowHeight * 0.88) {
        el.classList.add('revealed');
        revealObserver.unobserve(el);
      }
    });
  });
}
