/* ========================================
   Portfolio — Enhanced JavaScript
   Particles, cursor glow, magnetic buttons,
   parallax, scroll progress, skill bars,
   tilt effects, dynamic section rendering,
   and admin data loading.
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ——————————————————————————————————————
  // PARTICLE BACKGROUND
  // ——————————————————————————————————————
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null };

    function resizeCanvas() {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    }

    function createParticles() {
      particles = [];
      const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.4,
          speedY: (Math.random() - 0.5) * 0.4,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * 0.7})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x;
          const dy = p.y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        if (mouse.x !== null) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const force = (150 - dist) / 150;
            p.x += dx * force * 0.02;
            p.y += dy * force * 0.02;
          }
        }
      });
      requestAnimationFrame(drawParticles);
    }

    resizeCanvas();
    createParticles();
    drawParticles();

    window.addEventListener('resize', () => { resizeCanvas(); createParticles(); });
    canvas.addEventListener('mousemove', (e) => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
    canvas.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });
  }

  // ——————————————————————————————————————
  // CURSOR GLOW FOLLOWER
  // ——————————————————————————————————————
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow && window.innerWidth > 768) {
    let glowX = 0, glowY = 0, targetX = 0, targetY = 0;
    document.addEventListener('mousemove', (e) => { targetX = e.clientX; targetY = e.clientY; cursorGlow.classList.add('active'); });
    document.addEventListener('mouseleave', () => { cursorGlow.classList.remove('active'); });
    function animateGlow() { glowX += (targetX - glowX) * 0.08; glowY += (targetY - glowY) * 0.08; cursorGlow.style.left = glowX + 'px'; cursorGlow.style.top = glowY + 'px'; requestAnimationFrame(animateGlow); }
    animateGlow();
  }

  // ——————————————————————————————————————
  // SCROLL PROGRESS BAR
  // ——————————————————————————————————————
  const scrollProgress = document.getElementById('scrollProgress');
  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollProgress) scrollProgress.style.width = (scrollTop / docHeight) * 100 + '%';
  }

  // ——————————————————————————————————————
  // LOAD ADMIN DATA & RENDER ALL SECTIONS
  // ——————————————————————————————————————
  function loadAdminData() {
    const raw = localStorage.getItem('portfolioData');
    if (!raw) {
      renderCertificates(DEFAULT_CERTIFICATES);
      renderProjects(DEFAULT_PROJECTS);
      return;
    }

    try {
      const d = JSON.parse(raw);

      // --- Personal Info ---
      if (d.name) {
        const nameEl = document.querySelector('[data-field="name"]');
        if (nameEl) nameEl.innerHTML = `Hi, I'm <span class="gradient-text">${esc(d.name)}</span>`;
        document.querySelectorAll('.nav-logo').forEach((el) => {
          el.textContent = d.name || 'Akash S';
        });
        document.title = `${d.name} — ${d.title || 'Portfolio'}`;
      }

      if (d.bio) { const el = document.querySelector('[data-field="bio"]'); if (el) el.textContent = d.bio; }
      if (d.about1) { const el = document.querySelector('[data-field="about1"]'); if (el) el.textContent = d.about1; }
      if (d.about2) { const el = document.querySelector('[data-field="about2"]'); if (el) el.textContent = d.about2; }
      if (d.email) { const el = document.querySelector('[data-field="email"]'); if (el) { el.textContent = d.email; el.href = `mailto:${d.email}`; } }
      if (d.phone) { const el = document.querySelector('[data-field="phone"]'); if (el) { el.textContent = d.phone; el.href = `tel:${d.phone.replace(/[^+\d]/g, '')}`; } }
      if (d.location) { const el = document.querySelector('[data-field="location"]'); if (el) el.textContent = d.location; }
      if (d.linkedin) { const el = document.querySelector('[data-field="linkedin"]'); if (el) el.href = d.linkedin; }
      if (d.github) { const el = document.querySelector('[data-field="github"]'); if (el) el.href = d.github; }

      // --- Skills ---
      if (d.skills && d.skills.length > 0) {
        renderSkills(d.skills);
      }

      // --- Certificates ---
      if (d.certificates && Array.isArray(d.certificates)) {
        renderCertificates(d.certificates);
      }

      // --- Projects ---
      if (d.projects && d.projects.length >= 4) {
        renderProjects(d.projects);
      } else {
        renderProjects(DEFAULT_PROJECTS);
      }

      // --- Education ---
      if (d.education && d.education.length > 0) {
        renderEducation(d.education);
      }

      // --- Experience ---
      if (d.experience && d.experience.length > 0) {
        renderExperience(d.experience);
      }

    } catch (e) {
      console.warn('Failed to load admin data:', e);
    }
  }

  // --- HTML Escape ---
  function esc(str) { if (!str) return ''; return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

  // --- Render Skills ---
  function renderSkills(skills) {
    const grid = document.getElementById('skillsGrid');
    if (!grid) return;

    const categoryIcons = [
      `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
      `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
      `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
      `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>`,
      `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>`,
    ];

    grid.innerHTML = skills.map((cat, i) => `
      <div class="skill-category reveal">
        <div class="skill-category-header">
          <div class="skill-icon-wrap">${categoryIcons[i % categoryIcons.length]}</div>
          <h3>${esc(cat.category)}</h3>
        </div>
        <div class="skill-tags">
          ${cat.tags.split(',').map(t => t.trim()).filter(Boolean).map(t =>
            `<span class="skill-tag" data-level="advanced">${esc(t)}</span>`
          ).join('')}
        </div>
      </div>
    `).join('');
  }

  // --- Default Certificates Reference (Akash S - 12 Verified Credentials) ---
  const DEFAULT_CERTIFICATES = [
    { title: 'Data Science Internship Certification', issuer: 'JYESTA', date: 'January 2026', image: 'assets/cert_jyesta_internship.jpg', credentialUrl: 'https://www.jyesta.com' },
    { title: 'Certificate Program in AWS Cloud Architect', issuer: 'St Thomas College (Autonomous)', date: '2024 — 2025', image: 'assets/cert_aws_cloud_architect.jpg', credentialUrl: '' },
    { title: 'SQL (Basic)', issuer: 'HackerRank', date: 'June 2025', image: 'assets/cert_hackerrank_sql.jpg', credentialUrl: 'https://www.hackerrank.com/certificates/480A272B3A10' },
    { title: 'Data Visualization with Python', issuer: 'IBM', date: 'October 2024', image: 'assets/cert_ibm_data_vis.jpg', credentialUrl: 'https://courses.cognitiveclass.ai' },
    { title: 'Data Science 101', issuer: 'IBM', date: 'July 2024', image: 'assets/cert_ibm_data_science.jpg', credentialUrl: 'https://courses.cognitiveclass.ai' },
    { title: 'Data Science Methodology', issuer: 'IBM', date: 'July 2024', image: 'assets/cert_ibm_data_science_methodology.jpg', credentialUrl: 'https://courses.cognitiveclass.ai/certificates/5a63374c1ea14150b48a9c82ddf85cb9' },
    { title: 'SQL and Relational Databases 101', issuer: 'IBM', date: 'December 2024', image: 'assets/cert_ibm_sql_relational_db.jpg', credentialUrl: 'https://courses.cognitiveclass.ai/certificates/002c0088ede2458faafbe68319ed0499' },
    { title: 'NoSQL and DBaaS 101', issuer: 'IBM', date: 'December 2024', image: 'assets/cert_ibm_nosql_dbaas.jpg', credentialUrl: 'https://courses.cognitiveclass.ai/certificates/8fcf0103a07ca64494cf0db00bde0ef0' },
    { title: 'Containers, Kubernetes & OpenShift V2', issuer: 'IBM', date: 'December 2024', image: 'assets/cert_ibm_containers_k8s.jpg', credentialUrl: 'https://courses.cognitiveclass.ai/certificates/f5ba89494af0413eabd3880083f4fa34' },
    { title: 'Introduction to Cloud', issuer: 'IBM', date: 'July 2024', image: 'assets/cert_ibm_intro_cloud.jpg', credentialUrl: 'https://courses.cognitiveclass.ai/certificates/0b538297570a4414846daaaf975a0c42' },
    { title: 'Introduction to Open Source', issuer: 'IBM', date: 'December 2024', image: 'assets/cert_ibm_intro_open_source.jpg', credentialUrl: 'https://courses.cognitiveclass.ai/certificates/3282c01a34f445b38c314ca9ee09c8e7' },
    { title: 'Data Privacy Fundamentals', issuer: 'IBM', date: 'August 2024', image: 'assets/cert_ibm_data_privacy.jpg', credentialUrl: 'https://courses.cognitiveclass.ai/certificates/2b4bdee3375a4ccd8c4cc3424cc55140' }
  ];

  // --- Default Projects Reference (From Official Resume) ---
  const DEFAULT_PROJECTS = [
    {
      title: 'SmartCylinder — Gas Delivery Management Platform',
      image: 'assets/project_smartcylinder.svg',
      description: 'Built a full booking-to-delivery platform with three role-based dashboards (Admin, Staff, Customer), supporting online booking, real-time delivery tracking, and automated notifications. Designed the PostgreSQL schema and backend logic to support booking history and operational analytics used to track delivery efficiency.',
      tags: 'Django, Python, PostgreSQL, HTML, CSS, JavaScript',
      liveUrl: 'https://github.com/akashs08b/Smart-Cylinder',
      sourceUrl: 'https://github.com/akashs08b/Smart-Cylinder',
    },
    {
      title: 'CodeCorner — CLI Event Management System',
      image: 'assets/project_codecorner.svg',
      description: 'Developed a command-line application for managing coding competitions and hackathons, with separate Admin and User modules for event creation, registration, and participation. Migrated the data layer from MongoDB to PostgreSQL, redesigning the schema to support relational queries without losing existing functionality.',
      tags: 'Python, PostgreSQL, CLI, MongoDB Migration',
      liveUrl: 'https://github.com/akashs08b/CodeCorner',
      sourceUrl: 'https://github.com/akashs08b/CodeCorner',
    },
    {
      title: 'Huntington’s Disease Stage Prediction Using Machine Learning',
      image: 'assets/project_huntington_ml.svg',
      description: 'Developed a multiclass machine learning system for Huntington’s disease stage prediction using clinical, genetic, and patient-level features. Implemented data preprocessing, feature engineering, categorical encoding, and feature selection, followed by training and comparison of multiple classification algorithms, including CatBoost, XGBoost, LightGBM, Random Forest, Extra Trees, SVM, and MLP. Evaluated model performance using accuracy, precision, recall, F1-score, and confusion matrix to identify the most effective predictive approach.',
      tags: 'Python, Machine Learning, CatBoost, XGBoost, LightGBM, Random Forest, SVM, MLP',
      liveUrl: 'https://github.com/akashs08b',
      sourceUrl: 'https://github.com/akashs08b',
    },
    {
      title: 'YouTube Channel Analytics Dashboard | Tableau',
      image: 'assets/project_youtube_analytics.svg',
      description: 'Developed an interactive Tableau dashboard to analyze YouTube channel performance, audience engagement, content categories, geographic distribution, and key performance metrics. Created dynamic visualizations to identify top-performing channels, engagement trends, category-wise follower distribution, and audience interaction patterns, enabling clear and data-driven insights from complex datasets.',
      tags: 'Tableau, Data Analytics, Data Visualization, Audience Engagement, Performance Metrics',
      liveUrl: 'https://github.com/akashs08b',
      sourceUrl: 'https://github.com/akashs08b',
    },
  ];

  // --- Render Certificates ---
  function renderCertificates(certs) {
    const grid = document.getElementById('certificatesGrid');
    if (!grid) return;

    const certList = (certs !== undefined && certs !== null) ? certs : DEFAULT_CERTIFICATES;

    if (certList.length === 0) {
      grid.innerHTML = `
        <div class="empty-certs-message" style="grid-column: 1 / -1; text-align: center; padding: 3rem 1.5rem; color: var(--text-secondary, #a3a3a3); background: rgba(255,255,255,0.02); border: 1px dashed rgba(255,255,255,0.12); border-radius: 16px;">
          <p style="font-size: 1.1rem; font-weight: 500; margin-bottom: 0.5rem; color: #ffffff;">No certificates currently listed</p>
          <p style="font-size: 0.88rem;">Certificates can be uploaded and managed securely from the Admin Panel.</p>
        </div>
      `;
      return;
    }

    const cardsHtml = certList.map((cert, i) => {
      const imgSrc = cert.image ? cert.image : (DEFAULT_CERTIFICATES[i] && DEFAULT_CERTIFICATES[i].image) ? DEFAULT_CERTIFICATES[i].image : (i === 0 ? 'assets/cert_ibm_data_vis.png' : i === 1 ? 'assets/cert_ibm_data_science.png' : i === 2 ? 'assets/cert_aws_cloud_architect.png' : 'assets/cert_hackerrank_sql.png');
      const iss = (cert.issuer || '').toLowerCase();
      const issuerClass = iss.includes('jyesta') ? 'jyesta-badge' :
                          iss.includes('aws') || iss.includes('amazon') || iss.includes('thomas') ? 'aws-badge' : 
                          iss.includes('hackerrank') ? 'hackerrank-badge' :
                          iss.includes('google') ? 'google-badge' :
                          iss.includes('coursera') ? 'coursera-badge' : 'ibm-badge';
      return `
        <div class="cert-photo-card reveal" onclick="openCertModal('${esc(imgSrc)}', '${esc(cert.title)}', '${esc(cert.issuer)}', '${esc(cert.date)}')">
          <div class="cert-card-shine"></div>
          <div class="cert-img-container">
            <img src="${esc(imgSrc)}" alt="${esc(cert.title)}" class="cert-img" loading="lazy" />
            <div class="cert-hover-overlay">
              <div class="zoom-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
              </div>
              <span>Click to view certificate</span>
            </div>
          </div>
          <div class="cert-details">
            <div class="cert-header-meta">
              <span class="cert-issuer-badge ${issuerClass}">${esc(cert.issuer)}</span>
              <span class="cert-date-text">${esc(cert.date)}</span>
            </div>
            <h3 class="cert-title-text">${esc(cert.title)}</h3>
            <p class="cert-org">Issued by ${esc(cert.issuer)}</p>
            <div class="cert-view-btn">
              <span>View Full Photo</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
          </div>
        </div>
      `;
    }).join('');

    grid.innerHTML = cardsHtml;
    initTiltCards();
  }

  // --- Lightbox Modal Handlers ---
  window.openCertModal = function(imgSrc, title, issuer, date) {
    const modal = document.getElementById('certModal');
    const modalImg = document.getElementById('certModalImg');
    const modalTitle = document.getElementById('certModalTitle');
    const modalIssuer = document.getElementById('certModalIssuer');
    const modalDate = document.getElementById('certModalDate');
    const dlBtn = document.getElementById('certModalDownloadBtn');

    if (modalImg) modalImg.src = imgSrc;
    if (modalTitle) modalTitle.textContent = title;
    if (modalIssuer) modalIssuer.textContent = issuer;
    if (modalDate) modalDate.textContent = date;
    if (dlBtn) {
      dlBtn.href = imgSrc;
      dlBtn.download = (title || 'certificate').toLowerCase().replace(/[^a-z0-9]/g, '_') + '.jpg';
    }

    if (modal) {
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeCertModal = function() {
    const modal = document.getElementById('certModal');
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  // --- Toast Notification Helper ---
  function showToast(message) {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
      <span>${esc(message)}</span>
    `;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeCertModal();
    }
  });

  // --- Render Projects ---
  function renderProjects(projects) {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    const list = (projects && projects.length > 0) ? projects : DEFAULT_PROJECTS;

    grid.innerHTML = list.map((proj, i) => {
      const defaultImg = (DEFAULT_PROJECTS[i] && DEFAULT_PROJECTS[i].image) ? DEFAULT_PROJECTS[i].image : '';
      const imgSrc = proj.image || defaultImg;
      const tags = proj.tags ? proj.tags.split(',').map(t => t.trim()).filter(Boolean) : [];
      const liveLink = proj.liveUrl ? `<a href="${esc(proj.liveUrl)}" target="_blank" class="project-link" aria-label="View live project"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></a>` : '';
      const sourceLink = proj.sourceUrl ? `<a href="${esc(proj.sourceUrl)}" target="_blank" class="project-link" aria-label="View source"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg></a>` : '';
      const targetUrl = proj.sourceUrl || proj.liveUrl || 'https://github.com/akashs08b';

      return `
        <article class="project-card project-card-featured reveal" id="project-${i+1}">
          <div class="project-card-shine"></div>
          <div class="project-image">
            ${imgSrc ? `<img src="${esc(imgSrc)}" alt="${esc(proj.title)} Preview" class="project-img" loading="lazy">` : `
            <div class="project-image-placeholder" style="--hue: 0;">
              <div class="placeholder-pattern"></div>
              <div class="project-icon-large">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.5"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>
              </div>
            </div>`}
            ${(liveLink || sourceLink) ? `<div class="project-overlay">${liveLink}${sourceLink}</div>` : ''}
          </div>
          <div class="project-info">
            <div class="project-tags">${tags.map(t => `<span>${esc(t)}</span>`).join('')}</div>
            <h3 class="project-title">${esc(proj.title)}</h3>
            <p class="project-description">${esc(proj.description)}</p>
            <div class="project-action-bar">
              <a href="${esc(targetUrl)}" target="_blank" class="project-btn-primary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                View on GitHub
              </a>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // --- Render Education ---
  function renderEducation(eduList) {
    const container = document.getElementById('educationContainer');
    if (!container) return;

    container.innerHTML = eduList.map(edu => `
      <div class="education-card reveal">
        <div class="edu-icon-wrap">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1 4 3 6 3s6-2 6-3v-5"/></svg>
        </div>
        <div class="edu-content">
          <div class="edu-period">${esc(edu.period)}</div>
          <h3>${esc(edu.degree)}</h3>
          <p class="edu-institution">${esc(edu.institution)}</p>
          <p class="edu-description">${esc(edu.description)}</p>
        </div>
      </div>
    `).join('');
  }

  // --- Render Experience ---
  function renderExperience(expList) {
    const container = document.getElementById('experienceTimeline');
    if (!container) return;

    container.innerHTML = expList.map(exp => {
      const tags = exp.tags ? exp.tags.split(',').map(t => t.trim()).filter(Boolean) : [];
      return `
        <div class="timeline-item reveal">
          <div class="timeline-marker"><div class="timeline-marker-pulse"></div></div>
          <div class="timeline-card">
            <div class="timeline-card-shine"></div>
            <div class="timeline-period">${esc(exp.period)}</div>
            <h3>${esc(exp.role)}</h3>
            <p class="timeline-company">${esc(exp.company)}</p>
            <p>${esc(exp.description)}</p>
            <div class="timeline-tags">${tags.map(t => `<span>${esc(t)}</span>`).join('')}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Load admin data first, then init animations
  loadAdminData();

  // ——————————————————————————————————————
  // SCROLL REVEAL (Intersection Observer)
  // ——————————————————————————————————————
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-split');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealElements.forEach((el) => revealObserver.observe(el));
  }
  initScrollReveal();

  // ——————————————————————————————————————
  // NAVBAR
  // ——————————————————————————————————————
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');

  function handleScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 50) { navbar.classList.add('scrolled'); } else { navbar.classList.remove('scrolled'); }

    let current = '';
    sections.forEach((section) => { if (scrollY >= section.offsetTop - 120) current = section.getAttribute('id'); });
    navLinks.forEach((link) => { link.classList.remove('active'); if (link.getAttribute('href') === `#${current}`) link.classList.add('active'); });

    updateScrollProgress();
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ——————————————————————————————————————
  // MOBILE NAV TOGGLE
  // ——————————————————————————————————————
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });

  navMenu.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => { navMenu.classList.remove('active'); navToggle.classList.remove('active'); document.body.style.overflow = ''; });
  });

  // ——————————————————————————————————————
  // TYPING EFFECT
  // ——————————————————————————————————————
  const phrases = [
    'data-driven insights',
    'interactive dashboards',
    'Python automation scripts',
    'machine learning models',
    'clean visualizations',
    'SQL-powered analytics',
  ];

  const typingEl = document.getElementById('typingText');
  let phraseIndex = 0, charIndex = 0, isDeleting = false;

  function typeWriter() {
    const currentPhrase = phrases[phraseIndex];
    if (!isDeleting) {
      typingEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentPhrase.length) { isDeleting = true; setTimeout(typeWriter, 2000); return; }
      setTimeout(typeWriter, 55 + Math.random() * 35);
    } else {
      typingEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) { isDeleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; setTimeout(typeWriter, 400); return; }
      setTimeout(typeWriter, 25);
    }
  }
  typeWriter();

  // ——————————————————————————————————————
  // ANIMATED COUNTERS
  // ——————————————————————————————————————
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (entry.isIntersecting) { animateCounter(entry.target); counterObserver.unobserve(entry.target); } });
  }, { threshold: 0.5 });
  statNumbers.forEach((el) => counterObserver.observe(el));

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const start = performance.now();
    function update(now) {
      const progress = Math.min((now - start) / 2000, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - progress, 3)));
      if (progress < 1) requestAnimationFrame(update); else el.textContent = target;
    }
    requestAnimationFrame(update);
  }

  // ——————————————————————————————————————
  // SKILL BARS ANIMATION
  // ——————————————————————————————————————
  function initSkillBars() {
    const skillBarObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bars = entry.target.querySelectorAll('.skill-bar[data-width]');
          bars.forEach((bar, i) => { setTimeout(() => { bar.style.setProperty('--bar-width', bar.dataset.width + '%'); bar.classList.add('animated'); }, i * 200); });
          skillBarObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    document.querySelectorAll('.skill-bar-wrap').forEach((wrap) => skillBarObserver.observe(wrap));
  }
  initSkillBars();

  // ——————————————————————————————————————
  // SMOOTH SCROLL
  // ——————————————————————————————————————
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const el = document.querySelector(id);
      if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  // ——————————————————————————————————————
  // CONTACT FORM
  // ——————————————————————————————————————
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const originalHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = `<span>Message Sent!</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`;
    submitBtn.style.background = '#ffffff';
    submitBtn.style.color = '#000000';
    submitBtn.disabled = true;
    setTimeout(() => { submitBtn.innerHTML = originalHTML; submitBtn.style.background = ''; submitBtn.disabled = false; contactForm.reset(); }, 3000);
  });

  // ——————————————————————————————————————
  // 3D TILT on CARDS (re-init after render)
  // ——————————————————————————————————————
  function initTiltCards() {
    document.querySelectorAll('.project-card, .cert-card').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left, y = e.clientY - rect.top;
        const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -3;
        const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 3;
        card.style.transform = `translateY(-8px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        const shine = card.querySelector('.project-card-shine, .cert-card-shine');
        if (shine) {
          shine.style.background = `radial-gradient(circle at ${(x/rect.width)*100}% ${(y/rect.height)*100}%, rgba(255,255,255,0.04) 0%, transparent 60%)`;
          shine.style.opacity = '1';
        }
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        const shine = card.querySelector('.project-card-shine, .cert-card-shine');
        if (shine) shine.style.opacity = '0';
      });
    });
  }
  initTiltCards();

  // ——————————————————————————————————————
  // MAGNETIC BUTTONS
  // ——————————————————————————————————————
  document.querySelectorAll('.magnetic-btn').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      btn.style.transform = `translate(${(e.clientX - rect.left - rect.width/2) * 0.15}px, ${(e.clientY - rect.top - rect.height/2) * 0.15}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });

  // ——————————————————————————————————————
  // SKILL TAG STAGGER
  // ——————————————————————————————————————
  function initSkillStagger() {
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.skill-tag').forEach((tag, i) => {
            tag.style.transitionDelay = `${i * 60}ms`;
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0)';
          });
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.skill-category').forEach((cat) => {
      cat.querySelectorAll('.skill-tag').forEach((tag) => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(12px)';
        tag.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      });
      skillObserver.observe(cat);
    });
  }
  initSkillStagger();

  // ——————————————————————————————————————
  // PARALLAX ON HERO ORBS
  // ——————————————————————————————————————
  const orbs = document.querySelectorAll('.gradient-orb');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    orbs.forEach((orb, i) => { orb.style.transform = `translateY(${scrollY * (0.15 + i * 0.05)}px)`; });
  }, { passive: true });

});
