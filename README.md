# Akash S — Data Science & Analytics Portfolio

A modern, high-performance developer portfolio built with a **Canva-inspired editorial luxury dark theme**, featuring:
- **Editorial Hero Showcase**: High-contrast dramatic studio portrait with ambient backlighting, glowing halo, and floating glassmorphic credentials.
- **Certificate Showcase & Lightbox**: Full-resolution interactive certificate preview with 1-click download on the main portfolio page.
- **Built-in Admin Panel** (`/admin.html`): Secure management panel to upload new certificate credentials (drag & drop with auto-compression), edit details, reorder, and delete certificates, plus manage personal info, skills, projects, and JSON backup.
- **Responsive & Modern Design**: Google Fonts (Outfit, Plus Jakarta Sans, JetBrains Mono), smooth micro-interactions, magnetic buttons, and glassmorphism.

---

## 🚀 How to Host It (Free Hosting Options)

### Option 1: GitHub Pages (Recommended — 100% Free & Linked to your GitHub)

1. Create a new repository on your GitHub account (e.g. `portfolio` or `akashs08b.github.io`).
2. Open PowerShell or Terminal in this folder (`d:\pf`) and run:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio release"
   git branch -M main
   git remote add origin https://github.com/akashs08b/<YOUR_REPO_NAME>.git
   git push -u origin main
   ```
3. In your GitHub repository:
   - Go to **Settings** > **Pages** (in the left sidebar).
   - Under **Build and deployment** > **Branch**, select `main` and `/ (root)`.
   - Click **Save**.
4. Your site will be live at:
   `https://akashs08b.github.io/<YOUR_REPO_NAME>/` (or `https://akashs08b.github.io/` if repo name is `akashs08b.github.io`).

---

### Option 2: Netlify Drop (Easiest — Live in 10 Seconds without Git)

1. Visit [app.netlify.com/drop](https://app.netlify.com/drop) in your browser.
2. Drag and drop the `pf` folder directly into the browser window.
3. Netlify will immediately upload and provide you with a live URL (e.g. `https://akash-s-portfolio.netlify.app`).
4. You can change the subdomain or connect a custom domain in Site Settings.

---

### Option 3: Vercel (Instant 1-Command CLI Deployment)

If you have Node.js / npm installed:
```bash
npx vercel
```
Follow the prompts (accept default options by pressing Enter), and Vercel will give you a live production URL instantly.

---

## 📁 Project Structure

```
pf/
├── assets/
│   ├── akash_portrait.jpg           # Studio portrait photo
│   ├── cert_ibm_data_vis.png        # IBM Data Visualization Certificate
│   ├── cert_ibm_data_science.png    # IBM Data Science 101 Certificate
│   ├── cert_aws_cloud_architect.png # AWS Cloud Architect Certificate
│   └── cert_hackerrank_sql.png      # HackerRank SQL Certificate
├── index.html                       # Main portfolio landing page
├── admin.html                       # Admin panel for content & certificates
├── style.css                        # Canva-inspired theme & design system
├── script.js                        # Interactions, upload modal, & dynamic rendering
├── vercel.json                      # Vercel deployment configuration
└── README.md                        # Documentation & hosting guide
```

---

## 🔒 Admin Panel Access

- URL: Navigate to `/admin.html` or click the gear icon in the footer of the portfolio.
- Default Password: `akash123`
- From the admin panel, you can update all portfolio fields and export/sync your data as JSON anytime.
