# Jonathan Hussaini Portfolio Website
## Setup & Deployment Guide

---

### 📁 File Structure
```
jonathan-hussaini-portfolio/
├── index.html     ← Main HTML page
├── style.css      ← All styles
├── script.js      ← All interactivity
└── README.md      ← This file
```

---

### 🖼️ Replacing Image Placeholders

Search for `img-placeholder` in `index.html` and replace each `<div class="img-placeholder ...">` block with:

```html
<!-- Hero photo -->
<img src="images/hero-photo.jpg" alt="Jonathan Hussaini" style="width:100%;height:100%;object-fit:cover;border-radius:32px;">

<!-- About photo -->
<img src="images/about-photo.jpg" alt="Jonathan Hussaini" style="width:100%;height:100%;object-fit:cover;">

<!-- Portfolio images: replace each portfolio-img div -->
<img src="images/project1.jpg" alt="Project Title" style="width:100%;height:200px;object-fit:cover;">
```

Create an `images/` folder and put your photos there.

---

### 📱 WhatsApp Link
Your WhatsApp link is already configured: `https://wa.link/3ifkob`
To change it, find/replace all instances in `index.html`.

---

### 🏦 Opay Payment Details
Already set in the modal and footer:
- **Bank:** Opay
- **Name:** Jonathan Hussaini
- **Account:** 9040240451

To update, search for `9040240451` in `index.html`.

---

### 📧 Making the Contact Form Actually Send Emails

**Option A — Formspree (Free, easiest):**
1. Sign up at https://formspree.io
2. Create a form, get your endpoint URL
3. In `index.html`, find `<form id="contactForm"` and add: `action="https://formspree.io/f/YOUR_ID" method="POST"`
4. In `script.js`, replace the setTimeout block with a real fetch() call

**Option B — EmailJS (Free tier):**
1. Sign up at https://emailjs.com
2. Add their SDK to `index.html`
3. Replace the setTimeout in the contact form handler with emailjs.send(...)

---

### 🚀 Free Deployment Options

**GitHub Pages (Recommended):**
1. Create a GitHub account and new repository
2. Upload your 3 files (index.html, style.css, script.js)
3. Go to Settings → Pages → Deploy from main branch
4. Your site will be live at `https://yourusername.github.io/repo-name`

**Netlify (Drag & Drop):**
1. Go to https://netlify.com
2. Drag your project folder into the deploy area
3. Live in 30 seconds with a free URL

**Custom Domain:**
After deploying, connect a custom domain like `jonathanhussaini.com` from your host's DNS settings.

---

### 🎨 Customisation Tips

- **Primary colour:** Change `--blue: #1e5cff` in `:root` in style.css
- **Fonts:** Replace `Playfair Display` and `DM Sans` links in the `<head>`
- **eBook price:** Add a price line in the modal payment-box section
- **Services:** Edit the service cards in the `#services` section
- **Portfolio:** Add real screenshots to the portfolio cards

---

### ✅ Browser Support
Chrome, Firefox, Safari, Edge — all modern browsers supported.
Mobile responsive: iOS & Android tested.
