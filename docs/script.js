/* ================================================================
   JONATHAN HUSSAINI PORTFOLIO — script.js
================================================================ */

// ----------------------------------------------------------------
// 1. NAVBAR — Scroll Effect + Hamburger Menu
// ----------------------------------------------------------------
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// Close nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Close nav on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ----------------------------------------------------------------
// 2. SCROLL REVEAL — Intersection Observer
// ----------------------------------------------------------------
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger sibling reveals within the same parent
      const siblings = entry.target.parentElement.querySelectorAll('.reveal:not(.visible)');
      siblings.forEach((el, idx) => {
        if (el === entry.target || entry.target.parentElement.contains(el)) {
          setTimeout(() => el.classList.add('visible'), idx * 80);
        }
      });
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ----------------------------------------------------------------
// 3. EBOOK MODAL
// ----------------------------------------------------------------
const modal          = document.getElementById('ebookModal');
const modalClose     = document.getElementById('modalClose');
const modalStep1     = document.getElementById('modalStep1');
const modalStep2     = document.getElementById('modalStep2');
const ebookForm      = document.getElementById('ebookForm');
const ebookSubmitBtn = document.getElementById('ebookSubmitBtn');

// Open triggers
const openTriggers = [
  document.getElementById('openEbookModal'),
  document.getElementById('openEbookModal2'),
  document.getElementById('openEbookModalFooter'),
].filter(Boolean);

openTriggers.forEach(btn => {
  btn.addEventListener('click', openModal);
});

function openModal() {
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  // Reset to step 1
  modalStep1.style.display = '';
  modalStep2.style.display = 'none';
  ebookForm.reset();
  resetCopyBtn();
}

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);

// Close on overlay click (outside the box)
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
});

// Form submit
ebookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name  = document.getElementById('ebookName').value.trim();
  const email = document.getElementById('ebookEmail').value.trim();

  // Basic validation
  if (!name) {
    shakeInput(document.getElementById('ebookName'));
    return;
  }
  if (!email || !isValidEmail(email)) {
    shakeInput(document.getElementById('ebookEmail'));
    return;
  }

  // Show loading state
  ebookSubmitBtn.textContent = '⏳ Processing...';
  ebookSubmitBtn.disabled = true;

  // Simulate processing delay (replace with real API/email call)
  setTimeout(() => {
    // Show thank you step
    document.getElementById('thanksName').textContent  = name;
    document.getElementById('thanksEmail').textContent = email;
    modalStep1.style.display = 'none';
    modalStep2.style.display = '';
    // Scroll modal to top
    document.querySelector('.modal-box').scrollTop = 0;
    // Re-enable button for next use
    ebookSubmitBtn.textContent = '✅ I\'ve Paid – Confirm My Order';
    ebookSubmitBtn.disabled = false;
  }, 1200);
});

// ----------------------------------------------------------------
// 4. COPY ACCOUNT NUMBER
// ----------------------------------------------------------------
function copyAccount() {
  const acct    = document.getElementById('acctNum').textContent.trim();
  const copyBtn = document.getElementById('copyAcct');

  navigator.clipboard.writeText(acct).then(() => {
    copyBtn.textContent = '✅ Copied!';
    copyBtn.classList.add('copied');
    setTimeout(resetCopyBtn, 2500);
  }).catch(() => {
    // Fallback for older browsers
    const ta = document.createElement('textarea');
    ta.value = acct;
    ta.style.position = 'fixed';
    ta.style.opacity  = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    copyBtn.textContent = '✅ Copied!';
    copyBtn.classList.add('copied');
    setTimeout(resetCopyBtn, 2500);
  });
}
window.copyAccount = copyAccount; // expose to onclick in HTML

function resetCopyBtn() {
  const copyBtn = document.getElementById('copyAcct');
  if (copyBtn) {
    copyBtn.textContent = '📋 Copy Account Number';
    copyBtn.classList.remove('copied');
  }
}

// ----------------------------------------------------------------
// 5. CONTACT FORM
// ----------------------------------------------------------------
const contactForm      = document.getElementById('contactForm');
const contactSuccess   = document.getElementById('contactSuccess');
const contactSubmitBtn = document.getElementById('contactSubmitBtn');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = document.getElementById('contactName').value.trim();
  const email   = document.getElementById('contactEmail').value.trim();
  const message = document.getElementById('contactMessage').value.trim();

  if (!name || !email || !message) return;
  if (!isValidEmail(email)) {
    shakeInput(document.getElementById('contactEmail'));
    return;
  }

  contactSubmitBtn.textContent = '⏳ Sending...';
  contactSubmitBtn.disabled = true;

  // Simulate send (replace with real backend / EmailJS / Formspree)
  setTimeout(() => {
    contactSuccess.style.display = 'block';
    contactForm.reset();
    contactSubmitBtn.textContent = 'Send Message ✉️';
    contactSubmitBtn.disabled = false;
    // Auto-hide after 6s
    setTimeout(() => { contactSuccess.style.display = 'none'; }, 6000);
  }, 1000);
});

// ----------------------------------------------------------------
// 6. UTILITIES
// ----------------------------------------------------------------
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function shakeInput(el) {
  el.style.animation = 'none';
  el.style.border    = '1.5px solid #ef4444';
  el.offsetHeight; // reflow
  el.style.animation = 'shake 0.4s ease';
  setTimeout(() => {
    el.style.border    = '';
    el.style.animation = '';
  }, 800);
}

// Inject shake keyframes
const style = document.createElement('style');
style.textContent = `
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%       { transform: translateX(-6px); }
  40%       { transform: translateX(6px); }
  60%       { transform: translateX(-4px); }
  80%       { transform: translateX(4px); }
}`;
document.head.appendChild(style);

// ----------------------------------------------------------------
// 7. FOOTER YEAR
// ----------------------------------------------------------------
const yearEl = document.getElementById('footerYear');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ----------------------------------------------------------------
// 8. SMOOTH SCROLL FOR ANCHOR LINKS
// ----------------------------------------------------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80; // account for fixed navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ----------------------------------------------------------------
// 9. ACTIVE NAV LINK ON SCROLL
// ----------------------------------------------------------------
const sections  = document.querySelectorAll('section[id]');
const navItems  = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + 100;
  sections.forEach(sec => {
    const top    = sec.offsetTop;
    const height = sec.offsetHeight;
    const id     = sec.getAttribute('id');
    if (scrollPos >= top && scrollPos < top + height) {
      navItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
});

// ----------------------------------------------------------------
// 10. SERVICE CARD ENTRANCE STAGGER
// ----------------------------------------------------------------
document.querySelectorAll('.service-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 60}ms`;
});
document.querySelectorAll('.portfolio-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 60}ms`;
});
document.querySelectorAll('.testimonial-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 80}ms`;
});
