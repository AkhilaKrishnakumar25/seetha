/* ==========================================================================
   AKHILA P KRISHNAKUMAR — PORTFOLIO JAVASCRIPT
   Modern Animations, Scrollspy, Typing Effect & Modals
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Preloader handling
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (preloader) {
        preloader.classList.add('loaded');
      }
    }, 400);
  });

  // Fallback in case load already fired
  setTimeout(() => {
    if (preloader && !preloader.classList.contains('loaded')) {
      preloader.classList.add('loaded');
    }
  }, 1200);

  // 2. Animated Typing Effect
  const typedTextEl = document.getElementById('typedText');
  const roles = [
    'Aspiring Software Engineer',
    'B.Tech CSE Undergrad @ AJCE',
    'AI & Innovation Enthusiast',
    'Creative Problem Solver'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 80;
  const deletingSpeed = 40;
  const delayBetweenRoles = 2000;

  function typeEffect() {
    if (!typedTextEl) return;
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typedTextEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTextEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeEffect, delayBetweenRoles);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeEffect, 400);
    } else {
      setTimeout(typeEffect, isDeleting ? deletingSpeed : typingSpeed);
    }
  }
  typeEffect();

  // 3. Navbar Scrolled State & Scrollspy
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Navbar blur background intensifier
    if (navbar) {
      if (scrollPos > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Scrollspy active state
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });

    // 4. Back-to-Top Button Visibility
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
      if (scrollPos > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  // Back to top click action
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 5. Mobile Navigation Menu Toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      navToggle.textContent = navMenu.classList.contains('open') ? '✕' : '☰';
    });

    // Auto-close menu on clicking any navigation link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.textContent = '☰';
      });
    });
  }

  // 6. Scroll Reveal Observer (Smooth Fade & Slide-in)
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 7. Resume Modal Controls
  const resumeModal = document.getElementById('resumeModal');
  const openResumeBtn = document.getElementById('openResumeBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const closeCvAction = document.getElementById('closeCvAction');
  const downloadCvAction = document.getElementById('downloadCvAction');

  function openResume() {
    if (resumeModal) {
      resumeModal.classList.add('active');
      resumeModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeResume() {
    if (resumeModal) {
      resumeModal.classList.remove('active');
      resumeModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (openResumeBtn) openResumeBtn.addEventListener('click', openResume);
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeResume);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeResume);
  if (closeCvAction) closeCvAction.addEventListener('click', closeResume);

  if (downloadCvAction) {
    downloadCvAction.addEventListener('click', () => {
      // Simulate download feedback
      downloadCvAction.innerHTML = `<span>Preparing Resume...</span>`;
      setTimeout(() => {
        downloadCvAction.innerHTML = `<span>✓ Download Started</span>`;
        // Create dynamic downloadable text resume blob
        const resumeContent = `================================================
AKHILA P KRISHNAKUMAR — RESUME
Role: Aspiring Software Engineer
Education: B.Tech Computer Science Engineering (1st Year)
Institution: Amal Jyothi College of Engineering, Kerala, India
Tagline: "Turning Ideas into Innovation Through Code."
================================================

PROFILE SUMMARY:
Passionate first-year Computer Science Engineering student with an eager drive for programming, artificial intelligence, and innovative software solutions.

TECHNICAL SKILLS:
- Languages: C Programming, Python, JavaScript (Learning)
- Web Technologies: HTML5, CSS3, Modern Responsive Layouts, Glassmorphism
- Problem Solving: Algorithmic Thinking, Structured Modular Decomposition
- Design: UI/UX Principles, Wireframing, Ergonomics

KEY PROJECTS:
1. AI-Driven Market Linkage & Smart Cataloging
   - Smart India Hackathon (SIH) mobile application solution to uplift marginalized artisans.
2. C Programming & Algorithmic Projects Suite
   - Core low-level computing, memory management, and data structures.
3. Autonomous AI & Intelligent Web Systems (Upcoming)
   - Research and web applications integrating machine learning pipelines.

EXPERIENCE & LEADERSHIP:
- Radio Jockey (RJ) at AJCE College Radio
- Academic STEM Tutor at Local Tuition Centre
- Smart India Hackathon Participant

CONTACT & PROFILES:
- Email: akhila.p.krishnakumar@example.com
- LinkedIn: linkedin.com/in/akhila-p-krishnakumar
- GitHub: github.com/akhila-p-krishnakumar
- Location: Kerala, India
================================================`;
        const blob = new Blob([resumeContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Akhila_P_Krishnakumar_Resume.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        setTimeout(() => {
          downloadCvAction.innerHTML = `<span>Download PDF Resume</span>`;
          closeResume();
        }, 1500);
      }, 700);
    });
  }

  // 8. Project Details Modal Content
  const projectModal = document.getElementById('projectModal');
  const projectModalContent = document.getElementById('projectModalContent');
  const closeProjectModalBtn = document.getElementById('closeProjectModalBtn');
  const projectModalBackdrop = document.getElementById('projectModalBackdrop');
  const projectModalBtns = document.querySelectorAll('.project-modal-btn');

  const projectDetails = {
    'sih': {
      title: 'AI-Driven Market Linkage & Smart Cataloging',
      subtitle: 'Mobile Application for Marginalized Artisans (Smart India Hackathon)',
      badge: 'Smart India Hackathon',
      icon: '📱',
      description: 'This solution was conceptualized to address the economic bottleneck faced by traditional craftsmen and artisans in decentralized communities. Many artisans create extraordinary goods but lack digital literacy and cataloging tools.',
      points: [
        'AI-Assisted Photo-to-Catalog feature that extracts product features, materials, and tags automatically.',
        'Simplified mobile UI tailored for low-bandwidth environments and diverse regional languages.',
        'Direct connection to urban markets and buyers, eliminating exploitative middlemen.',
        'Developed as a flagship collaborative project for Smart India Hackathon.'
      ],
      tags: ['Smart India Hackathon', 'AI Automation', 'Mobile Architecture', 'Social Innovation']
    },
    'c-suite': {
      title: 'C Programming & Algorithmic Suite',
      subtitle: 'Core Systems, Memory Management & Algorithmic Logic',
      badge: 'First-Year Academic Engineering',
      icon: '💻',
      description: 'A structured collection of procedural C programs developed as part of first-year computer science coursework, focusing on foundational computing principles.',
      points: [
        'Implementation of fundamental data structures: linked structures, stacks, queues, and arrays.',
        'File handling and console-based database management systems for student records.',
        'Algorithmic benchmarking of sorting techniques (Bubble, Insertion, Selection, Merge Sort).',
        'Deep dive into pointer arithmetic, stack allocation, and memory safety.'
      ],
      tags: ['C Language', 'Memory Management', 'Data Structures', 'Algorithmic Optimization']
    },
    'future': {
      title: 'Autonomous AI & Intelligent Web Systems',
      subtitle: 'Upcoming Ventures & Experimental Web Architectures',
      badge: 'In Research & Development',
      icon: '🔮',
      description: 'An ongoing initiative exploring how client-side modern JavaScript and Python backend AI pipelines can converge into intuitive productivity applications.',
      points: [
        'Smart academic task prioritizer using natural language processing logic.',
        'Interactive data visualizer for engineering algorithms and computational models.',
        'Clean open-source contributions to developer toolkits and beginner resources.',
        'Continuous experimentation with modern frontend glassmorphic aesthetics.'
      ],
      tags: ['Artificial Intelligence', 'Python & ML', 'Modern Web', 'Research Roadmap']
    }
  };

  function openProjectModal(key) {
    const data = projectDetails[key];
    if (!data || !projectModalContent) return;

    projectModalContent.innerHTML = `
      <div style="text-align:center; margin-bottom: 1.5rem;">
        <span style="font-size:3rem; display:inline-block; margin-bottom:0.5rem;">${data.icon}</span>
        <span class="project-badge-tag" style="position:static; display:inline-block; margin-bottom:0.75rem;">${data.badge}</span>
        <h3 style="font-size:1.45rem; color:#fff; line-height:1.3; margin-bottom:0.35rem;">${data.title}</h3>
        <p style="color:var(--accent-cyan); font-size:0.9rem;">${data.subtitle}</p>
      </div>

      <div style="color:var(--text-muted); font-size:0.95rem; line-height:1.65; margin-bottom:1.5rem;">
        <p style="margin-bottom:1rem;">${data.description}</p>
        <h5 style="color:#fff; font-size:0.95rem; margin-bottom:0.5rem; text-transform:uppercase; letter-spacing:0.05em;">Key Highlights:</h5>
        <ul style="padding-left:1.25rem; display:flex; flex-direction:column; gap:0.4rem;">
          ${data.points.map(pt => `<li>${pt}</li>`).join('')}
        </ul>
      </div>

      <div style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-bottom:1.5rem;">
        ${data.tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}
      </div>

      <div style="text-align:center;">
        <button class="btn btn-outline btn-sm" id="closeProjectModalInnerBtn">Close Preview</button>
      </div>
    `;

    const innerCloseBtn = document.getElementById('closeProjectModalInnerBtn');
    if (innerCloseBtn) innerCloseBtn.addEventListener('click', closeProjectModal);

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (projectModal) {
      projectModal.classList.remove('active');
      projectModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  projectModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectKey = btn.getAttribute('data-project');
      openProjectModal(projectKey);
    });
  });

  if (closeProjectModalBtn) closeProjectModalBtn.addEventListener('click', closeProjectModal);
  if (projectModalBackdrop) projectModalBackdrop.addEventListener('click', closeProjectModal);

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeResume();
      closeProjectModal();
    }
  });

  // 9. Contact Form Handling
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const subject = document.getElementById('contactSubject').value.trim();
      const message = document.getElementById('contactMessage').value.trim();

      if (!name || !email || !message) {
        formStatus.textContent = 'Please fill out all required fields.';
        formStatus.className = 'form-status';
        return;
      }

      // Simulate sending with realistic feedback
      formStatus.textContent = 'Sending message...';
      formStatus.className = 'form-status';

      setTimeout(() => {
        formStatus.textContent = `Thank you, ${name}! Your message has been received. I will reply to ${email} soon.`;
        formStatus.className = 'form-status success';
        contactForm.reset();

        setTimeout(() => {
          formStatus.textContent = '';
        }, 8000);
      }, 700);
    });
  }

  // 10. Dynamic Current Year in Footer
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
