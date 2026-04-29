/* ============================================
   Abu Bakar Siddique - Modern Portfolio JS
   Animations · 3D effects · Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. SCROLL PROGRESS BAR
  // ==========================================
  const progressBar = document.getElementById('scrollProgress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      progressBar.style.width = progress + '%';
    });
  }

  // ==========================================
  // 2. SIDEBAR TOGGLE
  // ==========================================
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  if (sidebarToggle && sidebar && sidebarOverlay) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      sidebarOverlay.classList.toggle('show');
      sidebarToggle.classList.toggle('open');
    });
    sidebarOverlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      sidebarOverlay.classList.remove('show');
      sidebarToggle.classList.remove('open');
    });
    // Close sidebar on link click
    sidebar.querySelectorAll('.sidebar-link').forEach(link => {
      link.addEventListener('click', () => {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('show');
        sidebarToggle.classList.remove('open');
      });
    });
  }

  // Sidebar active link highlight based on scroll
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  if (sidebarLinks.length > 0) {
    const sections = [];
    sidebarLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const section = document.querySelector(href);
        if (section) sections.push({ link, section });
      }
    });
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(({ link, section }) => {
        const top = section.offsetTop - 150;
        if (window.scrollY >= top) {
          current = link.getAttribute('href');
        }
      });
      sidebarLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === current);
      });
    });
  }

  // ==========================================
  // 3. NAV TOGGLE (Mobile)
  // ==========================================
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
      });
    });
  }

  // ==========================================
  // 4. BACK TO TOP
  // ==========================================
  const backTop = document.getElementById('backTop');
  if (backTop) {
    window.addEventListener('scroll', () => {
      backTop.classList.toggle('show', window.scrollY > 500);
    });
    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================
  // 5. FADE-IN ON SCROLL (Intersection Observer)
  // ==========================================
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    fadeEls.forEach(el => observer.observe(el));
  }

  // ==========================================
  // 6. 3D TILT ON CARDS (Mouse Move)
  // ==========================================
  const tiltCards = document.querySelectorAll('.card, .project-card, .freelance-card, .resume-card, .freelance-profile-card, .moment-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(30px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ==========================================
  // 7. CONTACT FORM (mailto fallback)
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
      }
      // Use mailto as fallback (no Formspree needed)
      const subject = encodeURIComponent(`Portfolio Message from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      window.location.href = `mailto:abs2003.edu@gmail.com?subject=${subject}&body=${body}`;
      // Show success
      contactForm.style.display = 'none';
      if (formSuccess) formSuccess.classList.add('show');
    });
  }

  // ==========================================
  // 8. HERO CONSTELLATION PARTICLES (Canvas)
  // ==========================================
  const heroCanvas = document.getElementById('heroCanvas');
  if (heroCanvas) {
    const ctx = heroCanvas.getContext('2d');
    let w, h, particles = [];
    const resize = () => {
      w = heroCanvas.width = heroCanvas.offsetWidth;
      h = heroCanvas.height = heroCanvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    const count = 60;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2 + 1
      });
    }
    function drawHeroParticles() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(225, 173, 1, 0.4)';
        ctx.fill();
      });
      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(225, 173, 1, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(drawHeroParticles);
    }
    drawHeroParticles();
  }

  // ==========================================
  // 9. RESEARCH NETWORK GRAPH (Canvas)
  // ==========================================
  const researchCanvas = document.getElementById('researchCanvas');
  if (researchCanvas) {
    const ctx = researchCanvas.getContext('2d');
    let w, h, nodes = [];
    const resize = () => {
      w = researchCanvas.width = researchCanvas.offsetWidth;
      h = researchCanvas.height = researchCanvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    const nodeCount = 25;
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 3 + 2
      });
    }
    function drawResearchGraph() {
      ctx.clearRect(0, 0, w, h);
      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(225, 173, 1, 0.3)';
        ctx.fill();
      });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(225, 173, 1, ${0.1 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(drawResearchGraph);
    }
    drawResearchGraph();
  }

  // ==========================================
  // 10. EXPERIENCE TIMELINE FLOW (Canvas)
  // ==========================================
  const expCanvas = document.getElementById('experienceCanvas');
  if (expCanvas) {
    const ctx = expCanvas.getContext('2d');
    let w, h, drops = [];
    const resize = () => {
      w = expCanvas.width = expCanvas.offsetWidth;
      h = expCanvas.height = expCanvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    for (let i = 0; i < 30; i++) {
      drops.push({
        x: Math.random() * w,
        y: Math.random() * h,
        speed: Math.random() * 1 + 0.3,
        r: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1
      });
    }
    function drawExpFlow() {
      ctx.clearRect(0, 0, w, h);
      drops.forEach(d => {
        d.y += d.speed;
        if (d.y > h) { d.y = -5; d.x = Math.random() * w; }
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(225, 173, 1, ${d.opacity})`;
        ctx.fill();
      });
      requestAnimationFrame(drawExpFlow);
    }
    drawExpFlow();
  }

  // ==========================================
  // 11. HERO FLOATING CODE SYMBOLS
  // ==========================================
  const heroCodeBg = document.querySelector('.hero-code-bg');
  if (heroCodeBg) {
    const symbols = ['{', '}', '<', '/>', '()', '=>', '[]', '++', '--', '/*', '*/', '&&', '||', '!', '?', ':', ';', '~', '@', '#', '$', '%', '^', '&', '*', '+', '=', '|', '\\', '`'];
    for (let i = 0; i < 20; i++) {
      const span = document.createElement('span');
      span.className = 'hero-code-symbol';
      span.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      span.style.left = Math.random() * 100 + '%';
      span.style.top = Math.random() * 100 + '%';
      span.style.fontSize = (Math.random() * 20 + 14) + 'px';
      span.style.setProperty('--dur', (Math.random() * 8 + 6) + 's');
      span.style.setProperty('--delay', (Math.random() * 5) + 's');
      heroCodeBg.appendChild(span);
    }
  }

  // ==========================================
  // 12. SKILLS FLOATING TAGS
  // ==========================================
  const skillsFloatBg = document.querySelector('.skills-floating-tags');
  if (skillsFloatBg) {
    const tags = ['Python', 'JavaScript', 'React', 'Node.js', 'TypeScript', 'CSS3', 'HTML5', 'Git', 'Docker', 'SQL', 'MongoDB', 'AWS', 'Linux', 'C++', 'Java', 'REST API', 'GraphQL', 'Next.js', 'Tailwind', 'Figma'];
    for (let i = 0; i < 12; i++) {
      const span = document.createElement('span');
      span.className = 'skill-tag-float';
      span.textContent = tags[Math.floor(Math.random() * tags.length)];
      span.style.left = Math.random() * 100 + '%';
      span.style.top = Math.random() * 100 + '%';
      span.style.setProperty('--dur', (Math.random() * 6 + 4) + 's');
      span.style.setProperty('--delay', (Math.random() * 4) + 's');
      skillsFloatBg.appendChild(span);
    }
  }

  // ==========================================
  // 13. FREELANCE PULSING DOTS
  // ==========================================
  const freelanceDotsBg = document.querySelector('.freelance-dots-bg');
  if (freelanceDotsBg) {
    for (let i = 0; i < 15; i++) {
      const dot = document.createElement('div');
      dot.className = 'client-dot-pulse';
      dot.style.left = Math.random() * 100 + '%';
      dot.style.top = Math.random() * 100 + '%';
      dot.style.setProperty('--delay', (Math.random() * 3) + 's');
      freelanceDotsBg.appendChild(dot);
    }
  }

  // ==========================================
  // 14. ACTIVITIES ORBITING ICONS
  // ==========================================
  const orbitBg = document.querySelector('.activities-orbit-bg');
  if (orbitBg) {
    const icons = ['🎓', '📚', '✈️', '🏆', '💻', '🎵', '📝', '🌍', '🎯', '⚡'];
    for (let i = 0; i < 6; i++) {
      const span = document.createElement('span');
      span.className = 'activity-orbit-icon';
      span.textContent = icons[i % icons.length];
      span.style.setProperty('--dur', (Math.random() * 10 + 15) + 's');
      span.style.setProperty('--delay', (Math.random() * 5) + 's');
      span.style.setProperty('--radius', (Math.random() * 80 + 60) + 'px');
      orbitBg.appendChild(span);
    }
  }

  // ==========================================
  // 15. AWARDS SPARKLE PARTICLES
  // ==========================================
  const sparkleBg = document.querySelector('.awards-sparkle-bg');
  if (sparkleBg) {
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'sparkle-particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.setProperty('--dur', (Math.random() * 3 + 2) + 's');
      particle.style.setProperty('--delay', (Math.random() * 3) + 's');
      sparkleBg.appendChild(particle);
    }
  }

  // ==========================================
  // 16. RESUME FLOATING ICONS
  // ==========================================
  const resumeFloatBg = document.querySelector('.resume-float-bg');
  if (resumeFloatBg) {
    const icons = ['📄', '📊', '📈', '📋', '📑', '📝', '🎓', '🏅'];
    for (let i = 0; i < 8; i++) {
      const span = document.createElement('span');
      span.className = 'resume-float-icon';
      span.textContent = icons[i % icons.length];
      span.style.left = Math.random() * 100 + '%';
      span.style.top = Math.random() * 100 + '%';
      span.style.setProperty('--dur', (Math.random() * 6 + 4) + 's');
      span.style.setProperty('--delay', (Math.random() * 4) + 's');
      resumeFloatBg.appendChild(span);
    }
  }

  // ==========================================
  // 17. BLOG FLOATING QUOTES
  // ==========================================
  const blogFloatBg = document.querySelector('.blog-float-bg');
  if (blogFloatBg) {
    const quotes = ['"', '"', '"', '"', '❝', '❞', '“', '”', '«', '»'];
    for (let i = 0; i < 10; i++) {
      const span = document.createElement('span');
      span.className = 'blog-float-quote';
      span.textContent = quotes[Math.floor(Math.random() * quotes.length)];
      span.style.left = Math.random() * 100 + '%';
      span.style.top = Math.random() * 100 + '%';
      span.style.setProperty('--dur', (Math.random() * 8 + 5) + 's');
      span.style.setProperty('--delay', (Math.random() * 4) + 's');
      blogFloatBg.appendChild(span);
    }
  }

  // ==========================================
  // 18. MOMENTS POLAROID FRAMES
  // ==========================================
  const momentsFloatBg = document.querySelector('.moments-float-bg');
  if (momentsFloatBg) {
    for (let i = 0; i < 8; i++) {
      const frame = document.createElement('div');
      frame.className = 'moments-float-frame';
      frame.style.left = Math.random() * 100 + '%';
      frame.style.top = Math.random() * 100 + '%';
      frame.style.width = (Math.random() * 40 + 40) + 'px';
      frame.style.height = (Math.random() * 40 + 40) + 'px';
      frame.style.setProperty('--dur', (Math.random() * 8 + 5) + 's');
      frame.style.setProperty('--delay', (Math.random() * 4) + 's');
      momentsFloatBg.appendChild(frame);
    }
  }

  // ==========================================
  // 19. CONTACT FLOATING ICONS
  // ==========================================
  const contactFloatBg = document.querySelector('.contact-float-bg');
  if (contactFloatBg) {
    const icons = ['✉️', '📧', '💬', '📨', '📩', '📞', '📍', '🌐'];
    for (let i = 0; i < 8; i++) {
      const span = document.createElement('span');
      span.className = 'contact-float-icon';
      span.textContent = icons[i % icons.length];
      span.style.left = Math.random() * 100 + '%';
      span.style.top = Math.random() * 100 + '%';
      span.style.setProperty('--dur', (Math.random() * 6 + 4) + 's');
      span.style.setProperty('--delay', (Math.random() * 4) + 's');
      contactFloatBg.appendChild(span);
    }
  }

  // ==========================================
  // 20. PROJECTS 3D CUBE
  // ==========================================
  const cubeWrapper = document.querySelector('.projects-cube-wrapper');
  if (cubeWrapper) {
    const cube = document.createElement('div');
    cube.className = 'cube-3d';
    const icons = ['💻', '📱', '🌐', '🤖', '🧠', '📊'];
    const faces = ['f1', 'f2', 'f3', 'f4', 'f5', 'f6'];
    faces.forEach((f, i) => {
      const face = document.createElement('div');
      face.className = `cube-face ${f}`;
      face.textContent = icons[i];
      cube.appendChild(face);
    });
    cubeWrapper.appendChild(cube);
  }

  // ==========================================
  // 21. INTERACTIVE MOMENTS (Like, Comment, Share)
  // ==========================================
  const momentGrid = document.getElementById('momentGrid');
  if (momentGrid) {
    // Moment data
    const momentsData = [
      {
        id: 'moment-1',
        name: 'Abu Bakar',
        location: 'Chongqing, China',
        image: 'assets/Chongqing.jpg',
        text: 'Exploring the beautiful city of Chongqing — where tradition meets modernity.',
        defaultLikes: 24,
        defaultComments: [
          { name: 'Alex', text: 'Amazing view! 🌆' },
          { name: 'Maria', text: 'Chongqing is on my bucket list!' }
        ]
      },
      {
        id: 'moment-2',
        name: 'Abu Bakar',
        location: 'Winter in China',
        image: 'assets/Winter%20in%20china.jpg',
        text: 'Winter wonderland — experiencing the magic of snowy landscapes in China.',
        defaultLikes: 31,
        defaultComments: [
          { name: 'Chen', text: 'So beautiful! ❄️' },
          { name: 'Sarah', text: 'I miss the snow!' }
        ]
      },
      {
        id: 'moment-3',
        name: 'Abu Bakar',
        location: 'With Friends',
        image: 'assets/With%20friends.png',
        text: 'Great times with amazing friends — building memories that last a lifetime.',
        defaultLikes: 42,
        defaultComments: [
          { name: 'John', text: 'Good times! 🎉' },
          { name: 'Priya', text: 'Friends forever!' }
        ]
      },
      {
        id: 'moment-4',
        name: 'Abu Bakar',
        location: 'Xiling Mountain',
        image: 'assets/Xiling%20mountain%20defu.jpg',
        text: 'Hiking Xiling Mountain — nature\'s beauty at its finest.',
        defaultLikes: 37,
        defaultComments: [
          { name: 'Wei', text: 'The view is breathtaking!' },
          { name: 'Emma', text: 'I love hiking too! 🏔️' }
        ]
      }
    ];

    // Load saved data from localStorage
    function loadMomentData(id, defaultLikes, defaultComments) {
      const saved = localStorage.getItem('moments_' + id);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch(e) {}
      }
      return { liked: false, likes: defaultLikes, comments: defaultComments };
    }

    function saveMomentData(id, data) {
      localStorage.setItem('moments_' + id, JSON.stringify(data));
    }

    // Render moments
    momentsData.forEach(m => {
      const data = loadMomentData(m.id, m.defaultLikes, m.defaultComments);
      const card = document.createElement('div');
      card.className = 'moment-card fade-in';
      card.id = m.id;
      card.innerHTML = `
        <div class="moment-header">
          <img src="assets/profile.jpg" alt="ABS" />
          <div><h3>${m.name}</h3><p>${m.location}</p></div>
        </div>
        <img src="${m.image}" alt="${m.location}" class="moment-media" loading="lazy" />
        <div class="moment-text">${m.text}</div>
        <div class="moment-actions">
          <span class="moment-like ${data.liked ? 'liked' : ''}" data-id="${m.id}">
            <i class="${data.liked ? 'fas' : 'far'} fa-heart"></i>
            <span class="count">${data.likes}</span>
          </span>
          <span class="moment-comment-toggle" data-id="${m.id}">
            <i class="far fa-comment"></i>
            <span class="count">${data.comments.length}</span>
          </span>
          <span class="moment-share" data-id="${m.id}">
            <i class="far fa-share-square"></i> Share
          </span>
        </div>
        <div class="moment-comments" id="comments-${m.id}">
          ${data.comments.map(c => `
            <div class="moment-comment-item">
              <img src="assets/profile.jpg" alt="${c.name}" />
              <div class="comment-body">
                <strong>${c.name}</strong>
                <p>${c.text}</p>
              </div>
            </div>
          `).join('')}
          <div class="moment-comment-input">
            <input type="text" placeholder="Write a comment..." class="comment-input" data-id="${m.id}" />
            <button class="comment-submit" data-id="${m.id}"><i class="fas fa-paper-plane"></i></button>
          </div>
        </div>
      `;
      momentGrid.appendChild(card);
    });

    // Re-observe fade-in elements
    const newFadeEls = momentGrid.querySelectorAll('.fade-in');
    if (newFadeEls.length) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      newFadeEls.forEach(el => observer.observe(el));
    }

    // Like handler
    momentGrid.addEventListener('click', (e) => {
      const likeBtn = e.target.closest('.moment-like');
      if (likeBtn) {
        const id = likeBtn.dataset.id;
        const data = loadMomentData(id, 0, []);
        data.liked = !data.liked;
        data.likes += data.liked ? 1 : -1;
        saveMomentData(id, data);
        likeBtn.classList.toggle('liked', data.liked);
        likeBtn.querySelector('i').className = data.liked ? 'fas fa-heart' : 'far fa-heart';
        likeBtn.querySelector('.count').textContent = data.likes;
        return;
      }

      // Comment toggle
      const commentToggle = e.target.closest('.moment-comment-toggle');
      if (commentToggle) {
        const id = commentToggle.dataset.id;
        const commentsDiv = document.getElementById('comments-' + id);
        if (commentsDiv) {
          commentsDiv.classList.toggle('open');
          if (commentsDiv.classList.contains('open')) {
            commentsDiv.querySelector('.comment-input')?.focus();
          }
        }
        return;
      }

      // Share handler
      const shareBtn = e.target.closest('.moment-share');
      if (shareBtn) {
        const id = shareBtn.dataset.id;
        const url = window.location.href.split('#')[0] + '#' + id;
        if (navigator.share) {
          navigator.share({ title: 'Life Beyond Code', url: url }).catch(() => {});
        } else {
          navigator.clipboard.writeText(url).then(() => {
            showShareToast('Link copied to clipboard! 📋');
          }).catch(() => {
            showShareToast('Share this moment: ' + url);
          });
        }
        return;
      }

      // Comment submit
      const submitBtn = e.target.closest('.comment-submit');
      if (submitBtn) {
        const id = submitBtn.dataset.id;
        const input = document.querySelector(`.comment-input[data-id="${id}"]`);
        if (input && input.value.trim()) {
          const data = loadMomentData(id, 0, []);
          data.comments.push({ name: 'Visitor', text: input.value.trim() });
          saveMomentData(id, data);
          // Re-render comments
          const commentsDiv = document.getElementById('comments-' + id);
          if (commentsDiv) {
            const commentHtml = data.comments.map(c => `
              <div class="moment-comment-item">
                <img src="assets/profile.jpg" alt="${c.name}" />
                <div class="comment-body">
                  <strong>${c.name}</strong>
                  <p>${c.text}</p>
                </div>
              </div>
            `).join('');
            commentsDiv.innerHTML = commentHtml + `
              <div class="moment-comment-input">
                <input type="text" placeholder="Write a comment..." class="comment-input" data-id="${id}" />
                <button class="comment-submit" data-id="${id}"><i class="fas fa-paper-plane"></i></button>
              </div>
            `;
            // Update comment count
            const toggle = document.querySelector(`.moment-comment-toggle[data-id="${id}"] .count`);
            if (toggle) toggle.textContent = data.comments.length;
          }
          input.value = '';
        }
        return;
      }
    });

    // Share toast helper
    function showShareToast(msg) {
      let toast = document.querySelector('.share-toast');
      if (!toast) {
        toast = document.createElement('div');
        toast.className = 'share-toast';
        document.body.appendChild(toast);
      }
      toast.textContent = msg;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3000);
    }
  }

});
