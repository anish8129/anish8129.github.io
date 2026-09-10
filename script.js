const MAX_PROJECTS = 6;

const LANG_COLORS = {
  JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5",
  Go: "#00ADD8", Java: "#b07219", Rust: "#dea584", Ruby: "#701516",
  "C++": "#f34b7d", C: "#555555", Shell: "#89e051", HTML: "#e34c26",
  CSS: "#563d7c", Dockerfile: "#384d54", HCL: "#844FBA",
};

const ICONS = {
  github: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>',
  linkedin: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
  email: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
  resume: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
  externalLink: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>',
};

function esc(str) {
  const d = document.createElement("div");
  d.textContent = str;
  return d.innerHTML;
}

// Theme
const themeToggle = document.getElementById("theme-toggle");
const savedTheme = localStorage.getItem("theme") ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
document.documentElement.setAttribute("data-theme", savedTheme);
themeToggle.addEventListener("click", () => {
  const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

// Mobile menu
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");
hamburger.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

// Render functions
function renderHero(p) {
  const initials = p.name.split(" ").map(w => w[0]).join("");
  document.getElementById("nav-logo").textContent = initials;

  document.getElementById("hero-content").innerHTML = `
    <p class="hero-greeting">Hi, I'm</p>
    <h1 class="hero-name">${esc(p.name)}</h1>
    <p class="hero-title">${esc(p.title)}</p>
    <p class="hero-desc">${esc(p.description)}</p>
    <div class="hero-cta">
      <a href="#experience" class="btn btn-primary">View My Work</a>
      <a href="#contact" class="btn btn-outline">Get in Touch</a>
    </div>
    <div class="hero-socials">
      ${p.github ? `<a href="https://github.com/${esc(p.github)}" target="_blank" rel="noopener" aria-label="GitHub">${ICONS.github}</a>` : ""}
      ${p.linkedin ? `<a href="https://linkedin.com/in/${esc(p.linkedin)}" target="_blank" rel="noopener" aria-label="LinkedIn">${ICONS.linkedin}</a>` : ""}
      ${p.email ? `<a href="mailto:${esc(p.email)}" aria-label="Email">${ICONS.email}</a>` : ""}
      ${p.resumeUrl ? `<a href="${esc(p.resumeUrl)}" target="_blank" rel="noopener" aria-label="Resume">${ICONS.resume}</a>` : ""}
    </div>
  `;

  document.getElementById("footer-text").textContent = `Built by ${p.name}`;
  document.title = `${p.name} — Portfolio`;
}

function renderAbout(about) {
  const paragraphs = about.map(t => `<p>${esc(t)}</p>`).join("");
  document.getElementById("about-content").innerHTML = `
    <h2 class="section-title">About Me</h2>
    <div class="about-grid">
      <div class="about-text">
        ${paragraphs}
        <div class="about-stats">
          <div class="stat">
            <span class="stat-number">8+</span>
            <span class="stat-label">Years Experience</span>
          </div>
          <div class="stat">
            <span class="stat-number" id="stat-repos">--</span>
            <span class="stat-label">Public Repos</span>
          </div>
          <div class="stat">
            <span class="stat-number" id="stat-stars">--</span>
            <span class="stat-label">Total Stars</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderSkills(skills) {
  const categories = Object.entries(skills).map(([name, tags]) => `
    <div class="skill-category">
      <h3>${esc(name)}</h3>
      <div class="skill-tags">
        ${tags.map(t => `<span class="skill-tag">${esc(t)}</span>`).join("")}
      </div>
    </div>
  `).join("");

  document.getElementById("skills-content").innerHTML = `
    <h2 class="section-title">Skills & Technologies</h2>
    <div class="skills-grid">${categories}</div>
  `;
}

function renderExperience(experience) {
  const items = experience.map(e => `
    <div class="timeline-item">
      <div class="timeline-marker"></div>
      <div class="timeline-content">
        <div class="timeline-header">
          <h3>${esc(e.title)}</h3>
          <span class="timeline-company">${esc(e.company)}</span>
        </div>
        <span class="timeline-date">${esc(e.startDate)} – ${esc(e.endDate)}</span>
        <p>${esc(e.description)}</p>
      </div>
    </div>
  `).join("");

  document.getElementById("experience-content").innerHTML = `
    <h2 class="section-title">Experience</h2>
    <div class="timeline">${items}</div>
  `;
}

function renderEducation(education) {
  const items = education.map(e => `
    <div class="timeline-item">
      <div class="timeline-marker"></div>
      <div class="timeline-content">
        <div class="timeline-header">
          <h3>${esc(e.degree)}</h3>
          <span class="timeline-company">${esc(e.institution)}</span>
        </div>
        <span class="timeline-date">${esc(e.startYear)} – ${esc(e.endYear)}</span>
      </div>
    </div>
  `).join("");

  document.getElementById("education-content").innerHTML = `
    <h2 class="section-title">Education</h2>
    <div class="timeline">${items}</div>
  `;
}

function renderProjects(projectsConfig, github) {
  const section = document.getElementById("projects");
  const navProjectsLink = document.querySelector('a[href="#projects"]');

  if (!projectsConfig.enabled) {
    section.style.display = "none";
    if (navProjectsLink) navProjectsLink.parentElement.style.display = "none";
    return;
  }

  section.style.display = "";
  if (navProjectsLink) navProjectsLink.parentElement.style.display = "";

  document.getElementById("projects-cta").innerHTML = `
    <a href="https://github.com/${esc(github)}" target="_blank" rel="noopener" class="btn btn-outline">
      View All on GitHub ${ICONS.externalLink}
    </a>
  `;

  fetchGitHubData(github, projectsConfig.featured);
}

async function fetchGitHubData(username, featured) {
  const grid = document.getElementById("projects-grid");
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    if (!res.ok) throw new Error("GitHub API error");
    const repos = await res.json();

    let selected;
    if (featured && featured.length > 0) {
      const featuredLower = featured.map(f => f.toLowerCase());
      selected = featuredLower
        .map(name => repos.find(r => r.name.toLowerCase() === name))
        .filter(Boolean);
    } else {
      selected = repos
        .filter(r => !r.fork)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, MAX_PROJECTS);
    }

    grid.innerHTML = selected.map(repo => `
      <a href="${repo.html_url}" target="_blank" rel="noopener" class="project-card fade-in">
        <div class="project-card-header">
          <svg class="project-card-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
          <svg class="project-card-link" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
        </div>
        <h3>${repo.name}</h3>
        <p>${repo.description || "No description provided."}</p>
        <div class="project-card-footer">
          ${repo.language ? `<span><span class="lang-dot" style="background:${LANG_COLORS[repo.language] || "#999"}"></span> ${repo.language}</span>` : ""}
          ${repo.stargazers_count > 0 ? `<span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> ${repo.stargazers_count}</span>` : ""}
          ${repo.forks_count > 0 ? `<span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9"/><line x1="12" y1="12" x2="12" y2="15"/></svg> ${repo.forks_count}</span>` : ""}
        </div>
      </a>
    `).join("");

    const reposEl = document.getElementById("stat-repos");
    const starsEl = document.getElementById("stat-stars");
    if (reposEl) reposEl.textContent = repos.filter(r => !r.fork).length;
    if (starsEl) starsEl.textContent = repos.reduce((s, r) => s + r.stargazers_count, 0);
    observeFadeIns();
  } catch {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;color:var(--text-secondary);padding:48px 0;"><p>Could not load projects from GitHub.</p></div>`;
  }
}

function observeFadeIns() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));
}

function renderContact(profile) {
  document.getElementById("contact-actions").innerHTML = `
    <div class="contact-links">
      <a href="mailto:${esc(profile.email)}" class="btn btn-primary">
        ${ICONS.email} Email Me
      </a>
      ${profile.linkedin ? `<a href="https://linkedin.com/in/${esc(profile.linkedin)}" target="_blank" rel="noopener" class="btn btn-outline">${ICONS.linkedin} LinkedIn</a>` : ""}
      ${profile.github ? `<a href="https://github.com/${esc(profile.github)}" target="_blank" rel="noopener" class="btn btn-outline">${ICONS.github} GitHub</a>` : ""}
    </div>
  `;
}

// Init
async function init() {
  try {
    const res = await fetch("data.json");
    const data = await res.json();
    renderHero(data.profile);
    renderAbout(data.about);
    renderSkills(data.skills);
    renderExperience(data.experience);
    renderEducation(data.education);
    renderProjects(data.projects, data.profile.github);
    renderContact(data.profile);
  } catch (err) {
    console.error("Failed to load data.json:", err);
  }
  document.querySelectorAll(".section").forEach(s => s.classList.add("fade-in"));
  observeFadeIns();
}

init();
