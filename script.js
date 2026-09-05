/**
 * Riyan Islam Shanto — Portfolio Scripts
 * Handles navigation, mobile menu, scroll reveal animations,
 * dynamic year, active link highlighting, and contact form feedback.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. DOM Elements
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const mainNav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const yearElement = document.getElementById('year');
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const revealElements = document.querySelectorAll('[data-reveal]');
  const downloadCvBtn = document.getElementById('download-cv');

  // 2. Set Dynamic Year in Footer
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 3. Mobile Navigation Menu Toggle
  if (hamburger && mainNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('is-open');
      mainNav.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking any navigation link
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('is-open');
        mainNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 4. Scroll Reveal Animations (IntersectionObserver)
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach((el) => el.classList.add('in-view'));
  }

  // 5. Active Navigation Link Highlighting on Scroll
  const updateActiveNavLink = () => {
    const scrollY = window.pageYOffset;
    const headerHeight = header ? header.offsetHeight : 80;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - headerHeight - 50;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  // 6. Contact Form Submission Handling
  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnHtml = submitBtn.innerHTML;

      // Loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
      formStatus.style.color = 'var(--trace)';
      formStatus.textContent = 'Processing your message...';

      // Simulate form submission delay
      setTimeout(() => {
        formStatus.style.color = '#33D69F';
        formStatus.textContent = 'Thank you! Your message has been sent successfully.';
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;

        // Clear status message after 5 seconds
        setTimeout(() => {
          formStatus.textContent = '';
        }, 5000);
      }, 1200);
    });
  }

  // 7. CV Download Button Handler
  if (downloadCvBtn) {
    downloadCvBtn.addEventListener('click', (e) => {
      if (downloadCvBtn.getAttribute('href') === '#') {
        e.preventDefault();
        alert('CV download will be available soon.');
      }
    });
  }
});