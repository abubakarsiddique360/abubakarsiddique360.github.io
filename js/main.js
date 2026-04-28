const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
let mouseX = -100;
let mouseY = -100;
let ringX = -100;
let ringY = -100;

if (cursor && cursorRing) {
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
  });

  const animateRing = () => {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;
    requestAnimationFrame(animateRing);
  };
  animateRing();
}

const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  if (!progressBar) return;
  const scrollTop = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  progressBar.style.width = `${(scrollTop / height) * 100}%`;
}, { passive: true });

const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
  let current = '';
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 140) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}, { passive: true });

const navToggle = document.getElementById('nav-toggle');
const navLinksWrap = document.getElementById('nav-links');
if (navToggle && navLinksWrap) {
  navToggle.addEventListener('click', () => {
    navLinksWrap.classList.toggle('open');
  });
  navLinksWrap.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navLinksWrap.classList.remove('open'));
  });
}

const roleEl = document.getElementById('typewriter');
if (roleEl) {
  const roles = roleEl.dataset.roles ? roleEl.dataset.roles.split('|') : [];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typeRole = () => {
    if (!roles.length) return;
    const current = roles[roleIndex];
    const next = isDeleting ? current.slice(0, charIndex - 1) : current.slice(0, charIndex + 1);
    roleEl.textContent = next;

    if (!isDeleting && next.length === current.length) {
      isDeleting = true;
      setTimeout(typeRole, 1600);
      return;
    }
    if (isDeleting && next.length === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeRole, 500);
      return;
    }

    charIndex = next.length;
    setTimeout(typeRole, isDeleting ? 60 : 90);
  };

  setTimeout(typeRole, 600);
}

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const tiltTargets = document.querySelectorAll('[data-tilt]');
if (!prefersReduced) {
  tiltTargets.forEach((card) => {
    let rect;
    card.addEventListener('pointermove', (event) => {
      rect = rect || card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -10;
      const rotateY = ((x / rect.width) - 0.5) * 10;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    });
    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
      rect = null;
    });
  });
}

const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
