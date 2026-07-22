/*
  document-theme.js
  Drop this file next to your HTML and add:
    <script src="document-theme.js"></script>
  to the <head> or end of <body>. It injects all styling, the
  dark-mode toggle button, and the theme logic automatically.
  Just write plain semantic HTML (h1, p, ul, figure, table, etc.)
  in your document — no classes or inline styles needed.
*/
(function () {
    const CSS = `
    body {
      max-width: 980px;
      margin: 60px auto;
      padding: 0 24px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
      font-size: 17px;
      line-height: 1.65;
      color: #2b2b2b;
      background: #fdfdfd;
    }

    body::after {
      content: "";
      display: table;
      clear: both;
    }

    h1, h2, h3, p, ul, ol, blockquote, table, hr, pre {
      max-width: 640px;
    }

    h1 {
      font-size: 2.1em;
      font-weight: 700;
      margin: 0 0 0.2em;
      color: #111;
      letter-spacing: -0.01em;
    }

    h2 {
      font-size: 1.5em;
      font-weight: 600;
      margin: 1.6em 0 0.5em;
      color: #111;
      border-bottom: 1px solid #e2e2e2;
      padding-bottom: 0.3em;
    }

    h3 {
      font-size: 1.2em;
      font-weight: 600;
      margin: 1.4em 0 0.4em;
      color: #222;
    }

    p {
      margin: 0 0 1em;
    }

    a {
      color: #1a5fb4;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    ul, ol {
      margin: 0 0 1em;
      padding-left: 1.4em;
    }

    li {
      margin-bottom: 0.4em;
    }

    blockquote {
      margin: 1.2em 0;
      padding: 0.6em 1.2em;
      border-left: 3px solid #d0d0d0;
      color: #555;
      font-style: italic;
      background: #f7f7f7;
    }

    code {
      background: #f2f2f2;
      padding: 0.15em 0.4em;
      border-radius: 4px;
      font-size: 0.9em;
      font-family: "SFMono-Regular", Consolas, Menlo, monospace;
    }

    pre {
      background: #f2f2f2;
      padding: 1em;
      border-radius: 6px;
      overflow-x: auto;
      margin: 1.2em 0;
    }

    pre code {
      background: none;
      padding: 0;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 1.2em 0;
    }

    th, td {
      text-align: left;
      padding: 0.6em 0.8em;
      border-bottom: 1px solid #e2e2e2;
    }

    th {
      font-weight: 600;
      color: #111;
      border-bottom: 2px solid #ccc;
    }

    hr {
      border: none;
      border-top: 1px solid #e2e2e2;
      margin: 2em 0;
    }

    img {
      max-width: 100%;
      display: block;
      border-radius: 8px;
    }

    figure {
      position: relative;
      float: right;
      clear: right;
      width: 260px;
      margin: 0 0 1.5em 2em;
    }

    figure.inline {
      float: none;
      clear: both;
      width: 100%;
      max-width: 640px;
      margin: 1.8em 0;
    }

    figure img {
      width: 100%;
      box-shadow: 0 1px 3px rgba(0,0,0,0.12);
      cursor: zoom-in;
    }

    figcaption {
      margin-top: 0.6em;
      font-size: 0.85em;
      color: #777;
      text-align: center;
    }

    body.dark figure img {
      box-shadow: 0 1px 3px rgba(0,0,0,0.4);
    }

    body.dark figcaption {
      color: #999;
    }

    @media (max-width: 900px) {
      h1, h2, h3, p, ul, ol, blockquote, table, hr, pre {
        max-width: none;
      }

      figure {
        float: none;
        width: 100%;
        margin: 1.8em 0;
      }

      figure.inline {
        max-width: none;
      }
    }

    /* Lightbox */
    #lightbox-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.85);
      z-index: 1000;
      align-items: center;
      justify-content: center;
      overflow: auto;
      cursor: zoom-out;
    }

    #lightbox-overlay.open {
      display: flex;
    }

    #lightbox-overlay img {
      display: block;
      margin: auto;
      box-shadow: 0 10px 40px rgba(0,0,0,0.5);
      border-radius: 4px;
    }

    body.lightbox-lock {
      overflow: hidden;
    }

    strong {
      color: #111;
    }

    small {
      color: #777;
    }

    subtitle {
      display: inline-block;
      font-size: .9em;
      transform: translateY(-1em);
    }

    #theme-toggle {
      position: fixed;
      top: 20px;
      right: 20px;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      border: 1px solid #ccc;
      background: #fff;
      color: #333;
      cursor: pointer;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    #theme-toggle svg {
      width: 18px;
      height: 18px;
      fill: none;
      stroke: currentColor;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    #theme-toggle .icon-moon {
      display: none;
    }

    body.dark #theme-toggle .icon-sun {
      display: none;
    }

    body.dark #theme-toggle .icon-moon {
      display: block;
    }

    #theme-toggle:hover {
      background: #f2f2f2;
    }

    body.dark {
      background: #1a1a1a;
      color: #d8d8d8;
    }

    body.dark h1,
    body.dark h2,
    body.dark h3,
    body.dark strong {
      color: #f0f0f0;
    }

    body.dark h2 {
      border-bottom-color: #3a3a3a;
    }

    body.dark a {
      color: #6ea8f7;
    }

    body.dark blockquote {
      background: #242424;
      border-left-color: #4a4a4a;
      color: #b5b5b5;
    }

    body.dark code,
    body.dark pre {
      background: #242424;
      color: #e0e0e0;
    }

    body.dark th,
    body.dark td {
      border-bottom-color: #3a3a3a;
    }

    body.dark th {
      border-bottom-color: #555;
    }

    body.dark hr {
      border-top-color: #3a3a3a;
    }

    body.dark small {
      color: #999;
    }

    body.dark #theme-toggle {
      background: #2a2a2a;
      color: #e0e0e0;
      border-color: #444;
    }

    body.dark #theme-toggle:hover {
      background: #333;
    }
  `;

    const BUTTON_HTML = `
    <button id="theme-toggle" aria-label="Toggle dark mode">
      <svg class="icon-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"></circle><line x1="12" y1="2" x2="12" y2="4"></line><line x1="12" y1="20" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="6.34" y2="6.34"></line><line x1="17.66" y1="17.66" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="4" y2="12"></line><line x1="20" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="6.34" y2="17.66"></line><line x1="17.66" y1="6.34" x2="19.07" y2="4.93"></line></svg>
      <svg class="icon-moon" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
    </button>
  `;

    const LIGHTBOX_HTML = `
    <div id="lightbox-overlay" aria-hidden="true">
      <img id="lightbox-img" alt="">
    </div>
  `;

    function applyTheme(theme) {
        document.body.classList.toggle('dark', theme === 'dark');
    }

    function toggleTheme() {
        const isDark = document.body.classList.contains('dark');
        const newTheme = isDark ? 'light' : 'dark';
        applyTheme(newTheme);
        try {
            localStorage.setItem('theme', newTheme);
        } catch (e) {
            // localStorage unavailable in this context — theme just won't persist
        }
    }

    function sizeLightboxImage(img) {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const nw = img.naturalWidth || vw;
        const nh = img.naturalHeight || vh;
        // Fit within the screen (like object-fit: contain), and never
        // upscale past the image's original size — displayed size is
        // min(original size, screen-fit size).
        const fitScale = Math.min(vw / nw, vh / nh);
        const scale = Math.min(1, fitScale);
        img.style.width = (nw * scale) + 'px';
        img.style.height = (nh * scale) + 'px';
    }

    function openLightbox(src, alt) {
        const overlay = document.getElementById('lightbox-overlay');
        const img = document.getElementById('lightbox-img');
        img.style.width = '';
        img.style.height = '';
        img.alt = alt || '';
        img.src = src;

        const applySize = () => sizeLightboxImage(img);
        if (img.complete && img.naturalWidth) {
            applySize();
        } else {
            img.onload = applySize;
        }

        overlay.classList.add('open');
        document.body.classList.add('lightbox-lock');
    }

    function closeLightbox() {
        const overlay = document.getElementById('lightbox-overlay');
        overlay.classList.remove('open');
        document.body.classList.remove('lightbox-lock');
    }

    function init() {
        // Inject styles
        const style = document.createElement('style');
        style.textContent = CSS;
        document.head.appendChild(style);

        // Inject theme toggle button
        const buttonWrapper = document.createElement('div');
        buttonWrapper.innerHTML = BUTTON_HTML.trim();
        const button = buttonWrapper.firstElementChild;
        button.addEventListener('click', toggleTheme);
        document.body.prepend(button);

        // Inject lightbox overlay
        const lightboxWrapper = document.createElement('div');
        lightboxWrapper.innerHTML = LIGHTBOX_HTML.trim();
        document.body.appendChild(lightboxWrapper.firstElementChild);

        // Click any figure image (side rail or inline) to zoom
        document.addEventListener('click', (e) => {
            const img = e.target.closest('figure img');
            if (img) {
                openLightbox(img.src, img.alt);
            }
        });

        // Click the overlay (including the enlarged image) to close
        document.getElementById('lightbox-overlay').addEventListener('click', closeLightbox);

        // Escape key closes the lightbox
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeLightbox();
        });

        // Apply saved or preferred theme
        let saved = null;
        try {
            saved = localStorage.getItem('theme');
        } catch (e) {
            // ignore
        }
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(saved || (prefersDark ? 'dark' : 'light'));
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();