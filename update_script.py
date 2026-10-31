import json

# Update script.js with real certificates and project images
with open('d:/pf/script.js', 'r', encoding='utf-8') as f:
    js = f.read()

# 1. New DEFAULT_CERTIFICATES block
new_default_certs = '''  // --- Default Certificates Reference (Akash S - 12 Verified Credentials) ---
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
  ];'''

# Replace DEFAULT_CERTIFICATES in script.js
import re
js = re.sub(r'  // --- Default Certificates Reference ---[\s\S]*?\];', new_default_certs, js)

# 2. New DEFAULT_PROJECTS block with images
new_default_projects = '''  // --- Default Projects Reference (From Official Resume) ---
  const DEFAULT_PROJECTS = [
    {
      title: 'SmartCylinder — Gas Delivery Management Platform',
      image: 'assets/project_smartcylinder.svg',
      description: 'Built a full booking-to-delivery platform with three role-based dashboards (Admin, Staff, Customer), supporting online booking, real-time delivery tracking, and automated notifications. Designed the PostgreSQL schema and backend logic to support booking history and operational analytics used to track delivery efficiency.',
      tags: 'Django, Python, PostgreSQL, HTML, CSS, JavaScript',
      liveUrl: 'https://github.com/Akash01110/smartcylinder',
      sourceUrl: 'https://github.com/Akash01110/smartcylinder',
    },
    {
      title: 'CodeCorner — CLI Event Management System',
      image: 'assets/project_codecorner.svg',
      description: 'Developed a command-line application for managing coding competitions and hackathons, with separate Admin and User modules for event creation, registration, and participation. Migrated the data layer from MongoDB to PostgreSQL, redesigning the schema to support relational queries without losing existing functionality.',
      tags: 'Python, PostgreSQL, CLI, MongoDB Migration',
      liveUrl: 'https://github.com/Akash01110/MiniProject-CodeCorner',
      sourceUrl: 'https://github.com/Akash01110/MiniProject-CodeCorner',
    },
    {
      title: 'Huntington’s Disease Stage Prediction Using Machine Learning',
      image: 'assets/project_huntington_ml.svg',
      description: 'Developed a multiclass machine learning system for Huntington’s disease stage prediction using clinical, genetic, and patient-level features. Implemented data preprocessing, feature engineering, categorical encoding, and feature selection, followed by training and comparison of multiple classification algorithms, including CatBoost, XGBoost, LightGBM, Random Forest, Extra Trees, SVM, and MLP. Evaluated model performance using accuracy, precision, recall, F1-score, and confusion matrix to identify the most effective predictive approach.',
      tags: 'Python, Machine Learning,  XGBoost,  Random Forest,Extra trees',
      liveUrl: 'https://github.com/Akash01110/Huntingtons-disease-prediction-using-Ml',
      sourceUrl: 'https://github.com/Akash01110/Huntingtons-disease-prediction-using-Ml',
    },
    {
      title: 'YouTube Channel Analytics Dashboard | Tableau',
      image: 'assets/project_youtube_analytics.svg',
      description: 'Developed an interactive Tableau dashboard to analyze YouTube channel performance, audience engagement, content categories, geographic distribution, and key performance metrics. Created dynamic visualizations to identify top-performing channels, engagement trends, category-wise follower distribution, and audience interaction patterns, enabling clear and data-driven insights from complex datasets.',
      tags: 'Tableau, Data Analytics, Data Visualization, Audience Engagement, Performance Metrics',
      liveUrl: 'https://lnkd.in/p/e73VYfhf',
      sourceUrl: 'https://lnkd.in/p/e73VYfhf',
    },
  ];'''

js = re.sub(r'  // --- Default Projects Reference \(From Official Resume\) ---[\s\S]*?\];', new_default_projects, js)

# 3. Update loadAdminData in script.js
old_load_admin_check = '''    if (!raw) {
      renderCertificates(DEFAULT_CERTIFICATES);
      return;
    }'''

new_load_admin_check = '''    if (!raw) {
      renderCertificates(DEFAULT_CERTIFICATES);
      renderProjects(DEFAULT_PROJECTS);
      return;
    }'''
js = js.replace(old_load_admin_check, new_load_admin_check)

old_proj_render_check = '''      // --- Projects ---
      if (d.projects && d.projects.length >= 4) {
        renderProjects(d.projects);
      }'''

new_proj_render_check = '''      // --- Projects ---
      if (d.projects && d.projects.length >= 4) {
        renderProjects(d.projects);
      } else {
        renderProjects(DEFAULT_PROJECTS);
      }'''
js = js.replace(old_proj_render_check, new_proj_render_check)

# 4. Update renderProjects to render image
old_render_projects_def = '''  // --- Render Projects ---
  function renderProjects(projects) {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    const list = (projects && projects.length > 0) ? projects : DEFAULT_PROJECTS;

    grid.innerHTML = list.map((proj, i) => {
      const tags = proj.tags ? proj.tags.split(',').map(t => t.trim()).filter(Boolean) : [];
      const liveLink = proj.liveUrl ? `<a href="${esc(proj.liveUrl)}" target="_blank" class="project-link" aria-label="View live project"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></a>` : '';
      const sourceLink = proj.sourceUrl ? `<a href="${esc(proj.sourceUrl)}" target="_blank" class="project-link" aria-label="View source"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg></a>` : '';
      const targetUrl = proj.sourceUrl || proj.liveUrl || 'https://github.com/akashs08b';

      return `
        <article class="project-card project-card-featured reveal" id="project-${i+1}">
          <div class="project-card-shine"></div>
          <div class="project-image">
            <div class="project-image-placeholder" style="--hue: 0;">
              <div class="placeholder-pattern"></div>
              <div class="project-icon-large">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.5"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>
              </div>
            </div>
            ${(liveLink || sourceLink) ? `<div class="project-overlay">${liveLink}${sourceLink}</div>` : ''}
          </div>'''

new_render_projects_def = '''  // --- Render Projects ---
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
          </div>'''

js = js.replace(old_render_projects_def, new_render_projects_def)

# 5. Update renderCertificates issuer check for JYESTA
old_cert_render = '''      const iss = (cert.issuer || '').toLowerCase();
      const issuerClass = iss.includes('aws') || iss.includes('amazon') ? 'aws-badge' : 
                          iss.includes('hackerrank') ? 'hackerrank-badge' :
                          iss.includes('google') ? 'google-badge' :
                          iss.includes('coursera') ? 'coursera-badge' : 'ibm-badge';'''

new_cert_render = '''      const iss = (cert.issuer || '').toLowerCase();
      const issuerClass = iss.includes('jyesta') ? 'jyesta-badge' :
                          iss.includes('aws') || iss.includes('amazon') || iss.includes('thomas') ? 'aws-badge' : 
                          iss.includes('hackerrank') ? 'hackerrank-badge' :
                          iss.includes('google') ? 'google-badge' :
                          iss.includes('coursera') ? 'coursera-badge' : 'ibm-badge';'''

js = js.replace(old_cert_render, new_cert_render)

with open('d:/pf/script.js', 'w', encoding='utf-8') as f:
    f.write(js)

print("Updated script.js successfully")

