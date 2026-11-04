/**
 * Md Talha Hussain Tawhid - Portfolio Main Interactive Script
 * Modern UI/UX interactions, theme switching, book library filtering, and animations
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management (Dark/Light Mode)
  initTheme();

  // 2. Dynamic Typing Animation for Hero Roles
  initTypingEffect();

  // 3. Mobile Navigation Menu Toggle
  initMobileNav();

  // 4. ScrollSpy and Sticky Nav state
  initScrollSpy();

  // 5. Stat Counter on Scroll
  initStatCounters();

  // 6. Project Filter Tabs
  initProjectFilters();

  // 7. Complete Book Catalog Filters & Live Search
  initBookFilters();

  // 7.1. Auto-Rotating Book Showcase Carousel
  initBookCarousel();

  // 8. Modals (Book preview, Award detail, Project detail)
  initModals();

  // 9. Contact Form Handling & Toast Feedback
  initContactForm();

  // 10. Quick Copy Email Functionality
  initEmailCopy();

  // 11. Back to top button
  initBackToTop();

  // 12. Hero Profile Photo Slideshow
  initHeroSlideshow();

  // 13. 3D Interactive Particle Universe Canvas
  initHero3DCanvas();

  // 14. Universal 3D Card Tilt & Specular Glare
  init3DCardTilt();

  // 15. Ask Tawhid AI Floating Chatbot Widget
  initTawhidAIChat();

  // 16. Ambient Cursor Spotlight Torch
  initAmbientCursorTorch();

  // 17. Magnetic Buttons Micro-Interaction
  initMagneticButtons();

  // 18. Staggered Scroll-Triggered Reveal Animation
  initScrollReveal();

  // 19. Interactive Resume / CV Viewer & PDF Download Modal
  initResumeModal();

  // 20. Luxury UI Audio Feedback Engine
  initAudioEngine();

  // 21. Command Palette / Spotlight Quick Search (Ctrl + K)
  initCommandPalette();

  // 22. Real-Time Sylhet Timezone Clock & Availability Status
  initLiveSylhetClock();

  // 23. Mobile Quick Floating Dock
  initMobileDock();
});


/* ===================================================================
   1. Theme Management
   =================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  
  const savedTheme = localStorage.getItem('tawhid-portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
  } else if (!prefersDark) {
    document.documentElement.setAttribute('data-theme', 'light');
    updateThemeIcon('light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeIcon('dark');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('tawhid-portfolio-theme', newTheme);
      updateThemeIcon(newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'light') {
      themeIcon.className = 'fas fa-moon text-amber-500 text-lg transition-transform duration-300 rotate-180';
    } else {
      themeIcon.className = 'fas fa-sun text-amber-400 text-lg transition-transform duration-300 rotate-0';
    }
  }
}

/* ===================================================================
   2. Dynamic Typing Animation
   =================================================================== */
function initTypingEffect() {
  const typingElement = document.getElementById('typing-roles');
  if (!typingElement) return;

  const roles = [
    "AI-Native Developer & Prompt Engineer",
    "Head of Marketing @ Shah Sultan's IELTS Academy",
    "Building Web Apps with HTML, CSS, JavaScript, Java & AI",
    "Author of 20+ Business & Tech Books (Kobo, Google Play & Amazon)",
    "Top Performer Award Winner (2024-25 & 2025-26)",
    "Digital Marketer & Growth Strategist"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 90;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = 40;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 80;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingDelay = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingDelay = 400;
    }

    setTimeout(type, typingDelay);
  }

  type();
}

/* ===================================================================
   3. Mobile Navigation Menu Toggle
   =================================================================== */
function initMobileNav() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('mobile-menu-close');
  const mobileNav = document.getElementById('mobile-nav-drawer');
  const backdrop = document.getElementById('mobile-nav-backdrop');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  function openMenu() {
    if (mobileNav) {
      mobileNav.classList.remove('translate-x-full');
      mobileNav.classList.add('translate-x-0');
      if (backdrop) {
        backdrop.classList.remove('hidden');
        setTimeout(() => backdrop.classList.add('opacity-100'), 10);
      }
      document.body.style.overflow = 'hidden';
      if (window.playUiAudio) window.playUiAudio('click');
    }
  }

  function closeMenu() {
    if (mobileNav) {
      mobileNav.classList.add('translate-x-full');
      mobileNav.classList.remove('translate-x-0');
      if (backdrop) {
        backdrop.classList.remove('opacity-100');
        setTimeout(() => backdrop.classList.add('hidden'), 300);
      }
      document.body.style.overflow = '';
    }
  }

  if (menuBtn) menuBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (backdrop) backdrop.addEventListener('click', closeMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* ===================================================================
   4. ScrollSpy and Sticky Nav
   =================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.desktop-nav-link');
  const header = document.getElementById('main-header');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    if (header) {
      if (scrollY > 50) {
        header.classList.add('shadow-lg', 'border-b', 'border-white/10');
      } else {
        header.classList.remove('shadow-lg');
      }
    }

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        desktopLinks.forEach(link => {
          link.classList.remove('text-amber-400', 'font-bold');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('text-amber-400', 'font-bold');
          }
        });
      }
    });
  });
}

/* ===================================================================
   5. Animated Stat Counters
   =================================================================== */
function initStatCounters() {
  const counters = document.querySelectorAll('.stat-counter');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const suffix = counter.getAttribute('data-suffix') || '';
          const prefix = counter.getAttribute('data-prefix') || '';
          let count = 0;
          const duration = 1800;
          const stepTime = 30;
          const steps = duration / stepTime;
          const increment = target / steps;

          const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
              counter.textContent = `${prefix}${target}${suffix}`;
              clearInterval(timer);
            } else {
              counter.textContent = `${prefix}${Math.floor(count)}${suffix}`;
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('stats-highlight-section');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* ===================================================================
   6. Project Filter Tabs
   =================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => {
        b.classList.remove('bg-amber-500', 'text-navy-950', 'active', 'border-amber-400');
        b.classList.add('bg-slate-800/60', 'text-slate-300', 'border-white/10');
      });
      btn.classList.add('bg-amber-500', 'text-navy-950', 'active', 'border-amber-400');
      btn.classList.remove('bg-slate-800/60', 'text-slate-300', 'border-white/10');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filter === 'all' || category.includes(filter)) {
          card.classList.remove('hidden');
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.classList.add('hidden');
          }, 300);
        }
      });
    });
  });
}

/* ===================================================================
   7. Complete Book Catalog Filters & Live Search
   =================================================================== */
function initBookFilters() {
  const filterBtns = document.querySelectorAll('.book-filter-btn');
  const bookCards = document.querySelectorAll('.book-item');
  const searchInput = document.getElementById('book-search-input');
  const noBooksFound = document.getElementById('no-books-found');

  let currentCategory = 'all';
  let searchQuery = '';

  function applyFilters() {
    let visibleCount = 0;

    bookCards.forEach(card => {
      const category = card.getAttribute('data-book-category') || '';
      const textContent = card.textContent.toLowerCase();

      const matchesCategory = (currentCategory === 'all' || category.includes(currentCategory));
      const matchesSearch = (!searchQuery || textContent.includes(searchQuery));

      if (matchesCategory && matchesSearch) {
        card.classList.remove('hidden');
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
        visibleCount++;
      } else {
        card.classList.add('hidden');
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
      }
    });

    if (noBooksFound) {
      if (visibleCount === 0) {
        noBooksFound.classList.remove('hidden');
      } else {
        noBooksFound.classList.add('hidden');
      }
    }
  }

  // Filter Buttons Click
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentCategory = btn.getAttribute('data-book-filter');

      filterBtns.forEach(b => {
        b.classList.remove('bg-amber-500', 'text-navy-950', 'active', 'border-amber-400');
        b.classList.add('bg-slate-800/60', 'text-slate-300', 'border-white/10');
      });
      btn.classList.add('bg-amber-500', 'text-navy-950', 'active', 'border-amber-400');
      btn.classList.remove('bg-slate-800/60', 'text-slate-300', 'border-white/10');

      applyFilters();
    });
  });

  // Live Search Input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      applyFilters();
    });
  }
}

/* ===================================================================
   8. Interactive Modals
   =================================================================== */
function initModals() {
  const modalBackdrop = document.getElementById('general-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close-btn');

  function openModal(titleHtml, bodyHtml) {
    if (!modalBackdrop) return;
    modalTitle.innerHTML = titleHtml;
    modalBody.innerHTML = bodyHtml;
    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Expose globally so contact form and other features can trigger modal easily
  window.openPortfolioModal = openModal;
  window.closePortfolioModal = closeModal;

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop?.classList.contains('active')) {
      closeModal();
    }
  });



  // Helper for generating sample chapter excerpts based on book title
  function getBookChapterSample(title, topic) {
    const t = (title || '').toLowerCase();
    if (t.includes('karpathy')) {
      return {
        chapterNum: 'Chapter 1',
        chapterTitle: 'From Software 1.0 to Software 2.0 & Autonomous Agentic Loops',
        readTime: '4 min read',
        content: `
          <h4>1.1 The Paradigm Inversion</h4>
          <p>In classical computing—what Andrej Karpathy articulated as <strong>Software 1.0</strong>—programmers explicitly scripted deterministic rules. Logic took the form of <code>if-else</code> trees, finite state machines, and relational schemas. Every edge case had to be anticipated in the developer's neocortex before a single instruction was committed to bytecode.</p>
          <blockquote>"In Software 2.0, code is not written by humans; it is found by optimization algorithms in the parameter space of neural networks." — Andrej Karpathy</blockquote>
          <p>This marked a monumental inversion. Instead of coding search algorithms, we code the loss function, configure compute clusters, and let backpropagation discover the computational weights. But as we step into the modern era, we observe the birth of <strong>Software 3.0: Autonomous Agentic Architectures</strong>.</p>
          <h4>1.2 The Anatomy of Modern Agentic Loops</h4>
          <p>An agent is not merely an LLM prompt. An agent is an iterative closed-loop system equipped with sensory observation, step reflection, tool execution, and error recovery. When an agent fails, it diagnoses the stack trace, modifies its context window, and retries. For technical founders, building defensibility no longer means hoarding raw model weights—it means orchestrating resilient evaluation harnesses, domain-specific memory layers, and high-velocity continuous deployment loops.</p>
          <p>In this book, we unpack the concrete mental models required to build, evaluate, and scale these frontier intelligence engines from first principles.</p>
        `
      };
    } else if (t.includes('sales')) {
      return {
        chapterNum: 'Chapter 1',
        chapterTitle: 'The Psychology of High-Ticket Trust & Objection Neutralization',
        readTime: '3 min read',
        content: `
          <h4>1.1 The Certainty Deficit</h4>
          <p>The fatal error in modern selling is believing that buyers make decisions based on feature checklists. In high-ticket transactions—whether securing enterprise software contracts or enrolling international students in premium academic programs—buyers do not purchase products. <strong>Buyers purchase certainty</strong>.</p>
          <blockquote>"Every objection voiced by a prospect is fundamentally a symptom of unaddressed post-purchase anxiety."</blockquote>
          <h4>1.2 Neutralizing Hesitation Through Value Architecture</h4>
          <p>When an applicant or client says <em>"It's too expensive"</em> or <em>"I need to think about it"</em>, they are rarely objecting to financial cost. They are communicating that the perceived delta between their current state and the promised transformation is unclear. Top-performing marketing leaders don't counter with pressure; they architect proof systems, de-risk the commitment, and present the opportunity as the mathematically superior path.</p>
        `
      };
    } else {
      return {
        chapterNum: 'Chapter 1',
        chapterTitle: `Foundations of Modern ${topic || 'System Design'}`,
        readTime: '3 min read',
        content: `
          <h4>1.1 Core Principles and Architecture</h4>
          <p>Mastery of any complex domain begins with ruthless simplification. In "${escapeHtml(title)}", we examine how foundational mechanics govern real-world outcomes. Whether deploying distributed applications or designing high-performance campaigns, the underlying invariants remain consistent: reduce friction, maximize feedback velocity, and maintain rigorous telemetry.</p>
          <blockquote>"Complexity is easy; clarity and elegant execution require mastery."</blockquote>
          <p>This chapter examines the core taxonomy and lays the empirical groundwork for the advanced strategies explored throughout this volume.</p>
        `
      };
    }
  }

  function showBookModalDetails(data) {
    const isKobo = (data.platform || '').includes('Kobo');
    const badgeClass = isKobo ? 'bg-rose-500/20 text-rose-400 border-rose-500/30' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    const btnClass = isKobo ? 'btn-primary' : 'btn-emerald';
    const icon = isKobo ? 'fas fa-bookmark' : 'fab fa-google-play';
    const waText = encodeURIComponent(`Hi Tawhid, I am interested in ordering/purchasing your book "${data.title}" (${data.platform}).`);

    openModal(
      `<span class="text-white font-bold"><i class="${icon} mr-2 text-amber-400"></i>${data.title}</span>`,
      `
      <div class="space-y-5 text-slate-300">
        <div class="grid grid-cols-1 sm:grid-cols-12 gap-5 items-start">
          <div class="sm:col-span-4 flex justify-center">
            <img src="${data.cover}" alt="${data.title}" class="rounded-xl shadow-xl border border-white/10 max-h-64 object-contain bg-navy-950 p-2">
          </div>
          <div class="sm:col-span-8 space-y-3">
            <div class="flex flex-wrap items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${badgeClass}">
                ${data.platform}
              </span>
              <span class="px-2.5 py-0.5 rounded-full bg-white/5 text-amber-400 text-xs font-mono font-bold border border-white/10">
                ${data.price}
              </span>
              <span class="text-xs text-slate-400 font-mono">${data.date}</span>
            </div>
            <h4 class="text-lg font-bold text-white">${data.title}</h4>
            <p class="text-xs text-slate-400 font-mono">Author: Md Talha Hussain Tawhid • Topic: ${data.topic}</p>
            <div class="p-3 bg-white/5 rounded-xl border border-white/5 text-xs text-slate-300 leading-relaxed">
              ${data.desc || 'Official digital publication authored by Md Talha Hussain Tawhid. Available worldwide for immediate reading and digital download.'}
            </div>
            <div class="text-[11px] text-slate-400 font-mono">
              Catalog / ISBN Identifier: <span class="text-white">${data.isbn}</span>
            </div>
          </div>
        </div>

        <div class="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/10">
          <button type="button" id="read-chapter-sample-btn" class="btn-secondary text-xs py-2 px-4 border-amber-500/40 text-amber-300 hover:text-white flex items-center gap-1.5 cursor-pointer">
            <i class="fas fa-book-open text-amber-400"></i>
            <span>Read Free Sample (Chapter 1)</span>
          </button>
          <div class="flex items-center gap-2">
            <a href="https://wa.me/8801711729858?text=${waText}" target="_blank" rel="noopener" class="btn-emerald text-xs py-2 px-3.5" title="Order via WhatsApp">
              <i class="fab fa-whatsapp"></i> Order on WhatsApp
            </a>
            <a href="${data.url}" target="_blank" rel="noopener" class="${btnClass} text-xs py-2 px-4">
              <span>View on Store</span>
              <i class="fas fa-external-link-alt ml-1.5 text-[10px]"></i>
            </a>
          </div>
        </div>
      </div>
      `
    );

    // Bind sample reader trigger
    const sampleBtn = document.getElementById('read-chapter-sample-btn');
    if (sampleBtn) {
      sampleBtn.addEventListener('click', () => {
        window.openBookSampleReader(data);
      });
    }
  }

  window.openBookSampleReader = function(data) {
    if (typeof data === 'string') {
      data = {
        title: arguments[0] || 'The Karpathy Mindset',
        platform: arguments[1] || 'Google Play Books',
        url: arguments[2] || 'https://play.google.com/store/search?q=The+Karpathy+Mindset&c=books',
        cover: arguments[3] || 'assets/images/google_play_opt/6FQPY604J3K.jpg',
        topic: arguments[4] || 'AI Ventures & Tech Strategy',
        desc: arguments[5] || '',
        price: arguments[6] || '$4.99',
        date: arguments[7] || '2024-2026',
        isbn: arguments[8] || '6FQPY604J3K'
      };
    }

    const sample = getBookChapterSample(data.title, data.topic);
    const waText = encodeURIComponent(`Hi Tawhid, I read the free sample chapter of "${data.title}" and would like to order the complete book.`);

    openModal(
      `<span class="text-white font-bold flex items-center gap-2">
        <i class="fas fa-book-reader text-amber-400"></i>
        <span>Sample Reader: ${data.title}</span>
      </span>`,
      `
      <div class="book-reader-wrapper">
        <!-- Reader Toolbar -->
        <div class="reader-toolbar">
          <div class="flex items-center gap-2">
            <button type="button" id="reader-back-btn" class="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-amber-400 text-xs font-medium transition-colors flex items-center gap-1.5 border border-white/10 cursor-pointer">
              <i class="fas fa-arrow-left text-[10px]"></i> Back to Overview
            </button>
            <span class="hidden sm:inline-block text-[11px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
              <i class="far fa-clock text-amber-400 mr-1"></i>${sample.readTime}
            </span>
          </div>

          <!-- Font Size Controls -->
          <div class="flex items-center gap-1.5 text-xs text-slate-400">
            <span class="text-[10px] font-mono uppercase tracking-wider mr-1">Font:</span>
            <button type="button" id="font-decrease-btn" class="w-7 h-7 rounded bg-white/5 hover:bg-white/10 text-white font-bold text-xs flex items-center justify-center border border-white/10 cursor-pointer" title="Smaller font">A-</button>
            <button type="button" id="font-reset-btn" class="w-7 h-7 rounded bg-white/5 hover:bg-white/10 text-amber-400 font-bold text-xs flex items-center justify-center border border-white/10 cursor-pointer" title="Default font">A</button>
            <button type="button" id="font-increase-btn" class="w-7 h-7 rounded bg-white/5 hover:bg-white/10 text-white font-bold text-xs flex items-center justify-center border border-white/10 cursor-pointer" title="Larger font">A+</button>
          </div>
        </div>

        <!-- Reader Text Viewport -->
        <div class="reader-viewport">
          <div class="mb-4 pb-3 border-b border-white/10">
            <span class="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block">${sample.chapterNum}</span>
            <h3 class="text-lg sm:text-xl font-extrabold text-white mt-1">${sample.chapterTitle}</h3>
            <p class="text-xs text-slate-400 font-mono mt-0.5">From "${data.title}" by Md Talha Hussain Tawhid</p>
          </div>

          <div id="reader-body-content" class="reader-body">
            ${sample.content}
          </div>
        </div>

        <!-- Reader Footer CTAs -->
        <div class="p-4 bg-white/[0.02] border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div class="text-xs text-slate-400">
            <span class="text-white font-medium">Enjoyed this free preview?</span> Full digital edition available worldwide.
          </div>
          <div class="flex items-center gap-2">
            <a href="https://wa.me/8801711729858?text=${waText}" target="_blank" rel="noopener" class="btn-emerald text-xs py-2 px-3.5">
              <i class="fab fa-whatsapp mr-1"></i> Order on WhatsApp
            </a>
            <a href="${data.url}" target="_blank" rel="noopener" class="btn-primary text-xs py-2 px-4">
              <span>Get Full Edition (${data.price})</span>
              <i class="fas fa-arrow-right ml-1.5 text-[10px]"></i>
            </a>
          </div>
        </div>
      </div>
      `
    );

    // Bind back button
    const backBtn = document.getElementById('reader-back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        showBookModalDetails(data);
      });
    }

    // Font size controls
    const bodyContent = document.getElementById('reader-body-content');
    let currentFontSize = 15;
    document.getElementById('font-decrease-btn')?.addEventListener('click', () => {
      if (currentFontSize > 12) {
        currentFontSize -= 1.5;
        if (bodyContent) bodyContent.style.fontSize = currentFontSize + 'px';
      }
    });
    document.getElementById('font-reset-btn')?.addEventListener('click', () => {
      currentFontSize = 15;
      if (bodyContent) bodyContent.style.fontSize = currentFontSize + 'px';
    });
    document.getElementById('font-increase-btn')?.addEventListener('click', () => {
      if (currentFontSize < 22) {
        currentFontSize += 1.5;
        if (bodyContent) bodyContent.style.fontSize = currentFontSize + 'px';
      }
    });

    if (window.playUiAudio) window.playUiAudio('modal');
  };

  // Modal Triggers for Quick Book Previews across all 30 titles
  const bookQuickBtns = document.querySelectorAll('.book-quick-preview-btn');
  bookQuickBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const data = {
        title: btn.getAttribute('data-title'),
        platform: btn.getAttribute('data-platform'),
        price: btn.getAttribute('data-price'),
        cover: btn.getAttribute('data-cover'),
        url: btn.getAttribute('data-url'),
        isbn: btn.getAttribute('data-isbn'),
        date: btn.getAttribute('data-date'),
        topic: btn.getAttribute('data-topic'),
        desc: btn.getAttribute('data-desc')
      };
      showBookModalDetails(data);
    });
  });

  // Modal Triggers for Awards & Photographic Credentials
  const awardBtns = document.querySelectorAll('.award-modal-trigger');
  awardBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const awardYear = btn.getAttribute('data-year') || '';
      const awardDate = btn.getAttribute('data-date') || '';
      const awardTitle = btn.getAttribute('data-title') || `Top Performer Award (${awardYear})`;
      const awardSubtitle = btn.getAttribute('data-subtitle') || "British Council IELTS • Shah Sultan's IELTS Academy";
      const awardImage = btn.getAttribute('data-image') || (awardYear === '2024-25' ? 'assets/images/awards/trophy_excellence_2024_25.jpg' : 'assets/images/awards/award_ceremony_2025_26.jpg');
      const awardInscription = btn.getAttribute('data-inscription') || '';
      const awardDesc = btn.getAttribute('data-desc') || "Conferred in recognition of outstanding leadership, innovative multi-channel digital marketing execution, brand scaling, and exponential student enrollment expansion at Shah Sultan's IELTS Academy.";

      openModal(
        `<span class="text-amber-400 font-bold"><i class="fas fa-trophy mr-2 text-amber-400"></i>${awardTitle}</span>`,
        `
        <div class="space-y-5 text-slate-300">
          <div class="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center bg-gradient-to-b from-amber-500/10 to-transparent p-4 sm:p-5 rounded-2xl border border-amber-500/20">
            <div class="sm:col-span-5 flex justify-center">
              <div class="relative group rounded-xl overflow-hidden border border-amber-500/30 shadow-2xl max-h-72 bg-navy-950 p-1">
                <img src="${awardImage}" alt="${awardTitle}" class="w-full h-full object-contain rounded-lg max-h-64 sm:max-h-72">
              </div>
            </div>
            <div class="sm:col-span-7 space-y-2.5">
              <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-500/30">
                <i class="fas fa-check-circle text-emerald-400"></i> Authenticated Credential
              </div>
              <h3 class="text-xl sm:text-2xl font-bold text-white">${awardTitle}</h3>
              <p class="text-amber-400 font-medium text-sm">${awardSubtitle}</p>
              ${awardDate ? `<p class="text-xs text-slate-400 font-mono"><i class="far fa-calendar-alt mr-1 text-amber-400"></i> ${awardDate}</p>` : ''}
              ${awardInscription ? `<div class="p-3 rounded-xl bg-white/5 border border-white/10 text-xs italic text-slate-300"><i class="fas fa-quote-left mr-1.5 text-amber-400/80"></i>${awardInscription}</div>` : ''}
            </div>
          </div>

          <div class="space-y-3 text-sm">
            <h5 class="text-white font-semibold flex items-center gap-2">
              <i class="fas fa-certificate text-amber-400 text-xs"></i>
              <span>Award Criteria & Institutional Impact:</span>
            </h5>
            <p class="text-slate-300 text-xs sm:text-sm leading-relaxed">${awardDesc}</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div class="p-3 bg-white/5 rounded-xl border border-white/5">
                <span class="text-[10px] text-slate-400 uppercase font-mono block">Honoree</span>
                <span class="text-white font-semibold text-sm">Md Talha Hussain Tawhid</span>
                <span class="text-[11px] text-amber-400/90 block">Marketing Head & Graphic Designer</span>
              </div>
              <div class="p-3 bg-white/5 rounded-xl border border-white/5">
                <span class="text-[10px] text-slate-400 uppercase font-mono block">Conferred For / By</span>
                <span class="text-white font-semibold text-sm">Shah Sultan's IELTS Academy</span>
                <span class="text-[11px] text-emerald-400 block">British Council IELTS Partners Meet</span>
              </div>
            </div>
          </div>
        </div>
        `
      );
    });
  });

  // Modal Triggers for Academic & Vocational Certificates
  const certBtns = document.querySelectorAll('.cert-modal-trigger');
  certBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const title = btn.getAttribute('data-title') || 'Certificate Verification';
      const issuer = btn.getAttribute('data-issuer') || 'Bangladesh Technical Education Board';
      const reg = btn.getAttribute('data-reg') || '';
      const year = btn.getAttribute('data-year') || '';
      const grade = btn.getAttribute('data-grade') || '';
      const image = btn.getAttribute('data-image') || '';
      const verifyUrl = btn.getAttribute('data-verify') || '';
      const skills = btn.getAttribute('data-skills')?.split('|') || [];
      const desc = btn.getAttribute('data-desc') || '';

      const skillBadges = skills.map(s => `<span class="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-200"><i class="fas fa-check text-emerald-400 mr-1.5 text-[10px]"></i>${s}</span>`).join('');

      openModal(
        `<span class="text-white font-bold"><i class="fas fa-certificate mr-2 text-amber-400"></i>${title}</span>`,
        `
        <div class="space-y-5 text-slate-300">
          <div class="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center bg-gradient-to-b from-amber-500/10 to-transparent p-4 sm:p-5 rounded-2xl border border-amber-500/20">
            <div class="sm:col-span-5 flex justify-center">
              <div class="relative group rounded-xl overflow-hidden border border-amber-500/30 shadow-2xl max-h-80 bg-navy-950 p-1">
                <img src="${image}" alt="${title}" class="w-full h-full object-contain rounded-lg max-h-72">
              </div>
            </div>
            <div class="sm:col-span-7 space-y-2.5">
              <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
                <i class="fas fa-check-circle"></i> Authenticated Credential
              </div>
              <h3 class="text-xl sm:text-2xl font-bold text-white">${title}</h3>
              <p class="text-amber-400 font-medium text-sm">${issuer}</p>
              <div class="flex flex-wrap gap-2 text-xs font-mono text-slate-400 pt-1">
                ${year ? `<span class="px-2 py-0.5 rounded bg-white/5 border border-white/10">${year}</span>` : ''}
                ${grade ? `<span class="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold">Grade: ${grade}</span>` : ''}
                ${reg ? `<span class="px-2 py-0.5 rounded bg-white/5 border border-white/10">Reg: ${reg}</span>` : ''}
              </div>
            </div>
          </div>

          <div class="space-y-3 text-sm">
            ${desc ? `<p class="text-slate-300 text-xs sm:text-sm leading-relaxed">${desc}</p>` : ''}
            ${skills.length > 0 ? `
              <div>
                <h5 class="text-white font-semibold text-xs uppercase tracking-wider mb-2">Competencies &amp; Assessed Units:</h5>
                <div class="flex flex-wrap gap-1.5">${skillBadges}</div>
              </div>
            ` : ''}
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div class="p-3 bg-white/5 rounded-xl border border-white/5">
                <span class="text-[10px] text-slate-400 uppercase font-mono block">Recipient</span>
                <span class="text-white font-semibold text-sm">Md Talha Hussain Tawhid</span>
                <span class="text-[11px] text-slate-400 block">S/O Md Jamil Hussain &amp; Mst Moshuda Khanom</span>
              </div>
              <div class="p-3 bg-white/5 rounded-xl border border-white/5">
                <span class="text-[10px] text-slate-400 uppercase font-mono block">Official Verification</span>
                <span class="text-emerald-400 font-semibold text-sm"><i class="fas fa-shield-alt mr-1"></i> Original Document Verified</span>
                ${verifyUrl ? `<a href="${verifyUrl}" target="_blank" rel="noopener" class="text-[11px] text-amber-400 hover:underline block mt-0.5">${verifyUrl}</a>` : '<span class="text-[11px] text-slate-400 block">Sylhet, Bangladesh</span>'}
              </div>
            </div>
          </div>
        </div>
        `
      );
    });
  });

  // Project details trigger
  const projectBtns = document.querySelectorAll('.project-detail-trigger');
  projectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const title = btn.getAttribute('data-title') || '';
      const tech = btn.getAttribute('data-tech') || '';
      const desc = btn.getAttribute('data-desc') || '';
      const githubUrl = btn.getAttribute('data-github') || 'https://github.com/tawhid2005';
      const liveUrl = btn.getAttribute('data-live') || '';
      const features = btn.getAttribute('data-features')?.split('|') || [];

      let featureList = features.map(f => `<li class="flex items-start gap-2"><i class="fas fa-check-circle text-emerald-400 mt-1 text-xs"></i><span>${f}</span></li>`).join('');

      openModal(
        `<span class="text-white font-bold"><i class="fas fa-laptop-code mr-2 text-amber-400"></i>${title}</span>`,
        `
        <div class="space-y-4 text-slate-300">
          <div class="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-300 flex items-center justify-between">
            <span><i class="fas fa-code-branch mr-1.5"></i>Tech: ${tech}</span>
            <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">AI-Supercharged</span>
          </div>
          <p class="text-sm leading-relaxed">${desc}</p>
          <div class="space-y-2">
            <h5 class="text-white font-semibold text-sm">Key Features & Architecture:</h5>
            <ul class="text-sm space-y-1.5 text-slate-300">
              ${featureList}
            </ul>
          </div>
          <div class="pt-4 flex flex-wrap justify-end gap-3 border-t border-white/10">
            ${liveUrl ? `
              <a href="${liveUrl}" target="_blank" rel="noopener" class="btn-primary text-xs py-2 px-4">
                <i class="fas fa-external-link-alt mr-1.5 text-[10px]"></i> Launch Live App
              </a>
            ` : ''}
            <a href="${githubUrl}" target="_blank" rel="noopener" class="btn-secondary text-xs py-2 px-4">
              <i class="fab fa-github mr-1.5"></i> View Repository
            </a>
          </div>
        </div>
        `
      );
    });
  });
}

/* ===================================================================
   9. Contact Form Handling (WhatsApp & Gmail Dual Dispatch)
   =================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('portfolio-contact-form');
  const messageInput = document.getElementById('contact-message');
  const charCounter = document.getElementById('char-count');
  const directWaBtn = document.getElementById('direct-send-whatsapp-btn');
  const directGmBtn = document.getElementById('direct-send-gmail-btn');

  const TARGET_WHATSAPP = '8801711729858';
  const TARGET_EMAIL = 'tawhidh2005@gmail.com';

  if (messageInput && charCounter) {
    messageInput.addEventListener('input', () => {
      const len = messageInput.value.length;
      charCounter.textContent = `${len}/500`;
      if (len > 450) {
        charCounter.classList.add('text-amber-400');
      } else {
        charCounter.classList.remove('text-amber-400');
      }
    });
  }

  function validateAndGetFormData() {
    const nameEl = document.getElementById('contact-name');
    const emailEl = document.getElementById('contact-email');
    const subjectEl = document.getElementById('contact-subject');

    const name = nameEl ? nameEl.value.trim() : '';
    const email = emailEl ? emailEl.value.trim() : '';
    const subject = subjectEl ? subjectEl.value : 'General Inquiry';
    const message = messageInput ? messageInput.value.trim() : '';

    if (!name || !email || !message) {
      showToast('Please fill in all required fields (Name, Email, Message).', 'error');
      if (!name && nameEl) nameEl.focus();
      else if (!email && emailEl) emailEl.focus();
      else if (!message && messageInput) messageInput.focus();
      return null;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Please enter a valid email address.', 'error');
      if (emailEl) emailEl.focus();
      return null;
    }

    return { name, email, subject, message };
  }

  function sendViaWhatsApp(data) {
    const waText = 
      `*New Portfolio Inquiry for Md Talha Hussain Tawhid*\n\n` +
      `👤 *Client Name:* ${data.name}\n` +
      `📧 *Client Email:* ${data.email}\n` +
      `📌 *Domain / Topic:* ${data.subject}\n\n` +
      `💬 *Message Details:*\n${data.message}\n\n` +
      `_Direct inquiry via Tawhid's Portfolio Website_`;

    const waUrl = `https://wa.me/${TARGET_WHATSAPP}?text=${encodeURIComponent(waText)}`;
    window.open(waUrl, '_blank');

    if (contactForm) contactForm.reset();
    if (charCounter) charCounter.textContent = '0/500';
    showToast(`Opening WhatsApp for Tawhid (+880 1711-729858)...`, 'success');
  }

  function sendViaGmail(data) {
    const mailSubject = `[Portfolio Inquiry] ${data.subject} - from ${data.name}`;
    const mailBody = 
      `Hello Md Talha Hussain Tawhid,\n\n` +
      `You have received a new inquiry from your portfolio website:\n\n` +
      `--------------------------------------------------\n` +
      `Client Name: ${data.name}\n` +
      `Client Email: ${data.email}\n` +
      `Inquiry Domain: ${data.subject}\n` +
      `--------------------------------------------------\n\n` +
      `Client Message:\n${data.message}\n\n` +
      `---\nSender Email: ${data.email}\nSent via Portfolio Contact Form`;

    // Gmail Web Compose direct link
    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(TARGET_EMAIL)}&su=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
    
    // Fallback mailto URL for default mail clients
    const mailtoUrl = `mailto:${encodeURIComponent(TARGET_EMAIL)}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

    const newWin = window.open(gmailComposeUrl, '_blank');
    if (!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
      window.location.href = mailtoUrl;
    }

    if (contactForm) contactForm.reset();
    if (charCounter) charCounter.textContent = '0/500';
    showToast(`Opening Gmail compose to ${TARGET_EMAIL}...`, 'success');
  }

  function showChoiceModal(data) {
    if (typeof window.openPortfolioModal !== 'function') {
      // Fallback if modal system not ready
      sendViaWhatsApp(data);
      return;
    }

    const titleHtml = `
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-lg shadow-inner">
          <i class="fas fa-paper-plane"></i>
        </div>
        <div>
          <h3 class="text-xl font-display font-bold text-white">Choose How to Send</h3>
          <p class="text-xs text-slate-400">Select where you'd like your message delivered</p>
        </div>
      </div>
    `;

    const bodyHtml = `
      <div class="space-y-4 py-1">
        <!-- Message Summary Preview -->
        <div class="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300">
          <div class="flex items-center justify-between mb-1.5 pb-1.5 border-b border-white/10">
            <span class="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Message Summary</span>
            <span class="text-[11px] text-amber-400 font-mono"><i class="fas fa-check-circle mr-1"></i>Ready to dispatch</span>
          </div>
          <div class="text-white font-medium mb-1"><i class="fas fa-user text-amber-400 mr-1.5"></i> <span class="font-bold text-amber-300">${escapeHtml(data.name)}</span> (${escapeHtml(data.email)})</div>
          <div class="text-slate-300 mb-2"><i class="fas fa-tag text-amber-400 mr-1.5"></i> <span class="text-slate-400">Subject:</span> ${escapeHtml(data.subject)}</div>
          <div class="p-2.5 rounded-lg bg-navy-950/70 border border-white/5 text-slate-300 italic text-[11px] line-clamp-3">
            "${escapeHtml(data.message)}"
          </div>
        </div>

        <p class="text-xs font-semibold text-slate-300 uppercase tracking-wider">Send your message directly via:</p>

        <!-- Two Prominent Dispatch Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <!-- Option 1: WhatsApp -->
          <button type="button" id="modal-send-whatsapp-btn" class="group p-4 rounded-2xl bg-gradient-to-br from-emerald-950/70 via-emerald-900/40 to-navy-900 border border-emerald-500/40 hover:border-emerald-400 transition-all text-left flex flex-col justify-between hover:scale-[1.02] shadow-lg hover:shadow-emerald-500/20 cursor-pointer">
            <div class="flex items-center justify-between mb-3">
              <div class="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-inner">
                <i class="fab fa-whatsapp"></i>
              </div>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <i class="fas fa-bolt mr-1"></i>Instant Chat
              </span>
            </div>
            <div>
              <h4 class="font-bold text-white text-base group-hover:text-emerald-300 transition-colors">WhatsApp Direct</h4>
              <p class="text-[12px] text-slate-300 mt-1.5 leading-snug">
                Opens WhatsApp with your details pre-typed to Tawhid's official number (<strong class="text-white">+880 1711-729858</strong>).
              </p>
            </div>
            <div class="mt-4 pt-3 border-t border-emerald-500/20 flex items-center text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
              <span>Send via WhatsApp</span>
              <i class="fas fa-arrow-right ml-2"></i>
            </div>
          </button>

          <!-- Option 2: Gmail -->
          <button type="button" id="modal-send-gmail-btn" class="group p-4 rounded-2xl bg-gradient-to-br from-red-950/70 via-amber-950/40 to-navy-900 border border-red-500/40 hover:border-red-400 transition-all text-left flex flex-col justify-between hover:scale-[1.02] shadow-lg hover:shadow-red-500/20 cursor-pointer">
            <div class="flex items-center justify-between mb-3">
              <div class="w-12 h-12 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center text-2xl group-hover:bg-red-500 group-hover:text-white transition-all shadow-inner">
                <i class="fas fa-envelope"></i>
              </div>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/20 text-red-300 border border-red-500/30">
                <i class="fas fa-at mr-1"></i>Official Mail
              </span>
            </div>
            <div>
              <h4 class="font-bold text-white text-base group-hover:text-red-300 transition-colors">Gmail Compose</h4>
              <p class="text-[12px] text-slate-300 mt-1.5 leading-snug">
                Opens Gmail compose pre-filled with subject and message directly to <strong class="text-white">tawhidh2005@gmail.com</strong>.
              </p>
            </div>
            <div class="mt-4 pt-3 border-t border-red-500/20 flex items-center text-xs font-semibold text-red-400 group-hover:translate-x-1 transition-transform">
              <span>Send via Gmail</span>
              <i class="fas fa-arrow-right ml-2"></i>
            </div>
          </button>
        </div>

        <div class="pt-2 text-center">
          <button type="button" id="modal-cancel-send-btn" class="text-xs text-slate-400 hover:text-white transition-colors underline cursor-pointer">
            <i class="fas fa-arrow-left mr-1"></i> Edit Message / Go Back
          </button>
        </div>
      </div>
    `;

    window.openPortfolioModal(titleHtml, bodyHtml);

    // Bind modal buttons
    const mWaBtn = document.getElementById('modal-send-whatsapp-btn');
    const mGmBtn = document.getElementById('modal-send-gmail-btn');
    const mCancelBtn = document.getElementById('modal-cancel-send-btn');

    if (mWaBtn) {
      mWaBtn.addEventListener('click', () => {
        if (typeof window.closePortfolioModal === 'function') window.closePortfolioModal();
        sendViaWhatsApp(data);
      });
    }

    if (mGmBtn) {
      mGmBtn.addEventListener('click', () => {
        if (typeof window.closePortfolioModal === 'function') window.closePortfolioModal();
        sendViaGmail(data);
      });
    }

    if (mCancelBtn) {
      mCancelBtn.addEventListener('click', () => {
        if (typeof window.closePortfolioModal === 'function') window.closePortfolioModal();
      });
    }
  }

  // Handle Form Submit -> Opens the WhatsApp / Gmail Option Modal
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = validateAndGetFormData();
      if (!data) return;
      showChoiceModal(data);
    });
  }

  // Handle Direct WhatsApp Button on the form
  if (directWaBtn) {
    directWaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const data = validateAndGetFormData();
      if (!data) return;
      sendViaWhatsApp(data);
    });
  }

  // Handle Direct Gmail Button on the form
  if (directGmBtn) {
    directGmBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const data = validateAndGetFormData();
      if (!data) return;
      sendViaGmail(data);
    });
  }
}

// Helper to escape HTML safely
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* ===================================================================
   10. Quick Copy Email Functionality
   =================================================================== */
function initEmailCopy() {
  const copyBtns = document.querySelectorAll('.copy-email-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-email') || 'tawhidh2005@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Email copied to clipboard: ${email}`, 'success');
        const originalText = btn.innerHTML;
        btn.innerHTML = `<i class="fas fa-check text-emerald-400 mr-1.5"></i> Copied!`;
        setTimeout(() => {
          btn.innerHTML = originalText;
        }, 2200);
      }).catch(() => {
        showToast(`Email: ${email}`, 'info');
      });
    });
  });
}

/* ===================================================================
   11. Back to top button
   =================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ===================================================================
   Helper: Toast Notification Dispatcher
   =================================================================== */
function showToast(message, type = 'info') {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';

  let iconHtml = '<i class="fas fa-info-circle text-cyan-400 text-lg"></i>';
  if (type === 'success') {
    iconHtml = '<i class="fas fa-check-circle text-emerald-400 text-lg"></i>';
  } else if (type === 'error') {
    iconHtml = '<i class="fas fa-exclamation-triangle text-rose-400 text-lg"></i>';
  }

  toast.innerHTML = `
    ${iconHtml}
    <div class="text-sm font-medium">${message}</div>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 20);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 350);
  }, 4000);
}


/* ===================================================================
   12. Interactive Auto-Rotating Book Showcase (Carousel)
   Auto-advances every 2.5s with animated progress bar and smooth crossfade
   =================================================================== */
function initBookCarousel() {
  const container     = document.getElementById('featured-books-carousel');
  const slides        = document.querySelectorAll('.carousel-slide');
  const dots          = document.querySelectorAll('.carousel-dot');
  const counter       = document.getElementById('carousel-slide-counter');
  const prevBtn       = document.getElementById('carousel-prev-btn');
  const nextBtn       = document.getElementById('carousel-next-btn');
  const playToggleBtn = document.getElementById('carousel-play-toggle');
  const progressBar   = document.getElementById('carousel-progress-bar');

  if (!slides || slides.length === 0) return;

  let currentIdx       = 0;
  let isPlaying        = true;
  let progressTimer    = null;
  const SLIDE_INTERVAL = 2500; // Exact 2.5 seconds
  const PROGRESS_TICK  = 50;   // Update every 50ms for buttery-smooth progress bar
  let elapsedMs        = 0;

  function showSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    currentIdx = index;

    slides.forEach((slide, i) => {
      if (i === currentIdx) {
        slide.classList.remove('slide-hidden', 'opacity-0', 'pointer-events-none', 'z-0', 'absolute', 'hidden');
        slide.classList.add('slide-active', 'opacity-100', 'z-10', 'pointer-events-auto', 'relative');
        slide.style.display = 'block';
      } else {
        slide.classList.remove('slide-active', 'opacity-100', 'z-10', 'pointer-events-auto', 'relative');
        slide.classList.add('slide-hidden', 'opacity-0', 'pointer-events-none', 'z-0', 'hidden');
        slide.style.display = 'none';
      }
    });

    dots.forEach((dot, i) => {
      if (i === currentIdx) {
        dot.className = 'carousel-dot h-2.5 rounded-full transition-all duration-300 bg-amber-400 w-8';
      } else {
        dot.className = 'carousel-dot h-2.5 rounded-full transition-all duration-300 bg-white/20 w-2.5 hover:bg-white/40';
      }
    });

    if (counter) {
      counter.textContent = `${currentIdx + 1} / ${slides.length}`;
    }

    // Reset progress indicator
    elapsedMs = 0;
    if (progressBar) {
      progressBar.style.width = '0%';
    }
  }

  function startAutoPlay() {
    stopAutoPlay();
    isPlaying = true;
    elapsedMs = 0;

    if (playToggleBtn) {
      playToggleBtn.innerHTML = '<i class="fas fa-pause"></i>';
      playToggleBtn.title = 'Pause Auto-rotation';
    }

    progressTimer = setInterval(() => {
      elapsedMs += PROGRESS_TICK;
      if (progressBar) {
        const pct = Math.min(100, (elapsedMs / SLIDE_INTERVAL) * 100);
        progressBar.style.width = `${pct}%`;
      }
      if (elapsedMs >= SLIDE_INTERVAL) {
        elapsedMs = 0;
        showSlide(currentIdx + 1);
      }
    }, PROGRESS_TICK);
  }

  function stopAutoPlay() {
    isPlaying = false;
    if (progressTimer) {
      clearInterval(progressTimer);
      progressTimer = null;
    }
    if (playToggleBtn) {
      playToggleBtn.innerHTML = '<i class="fas fa-play"></i>';
      playToggleBtn.title = 'Play Auto-rotation';
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showSlide(currentIdx - 1);
      if (isPlaying) startAutoPlay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showSlide(currentIdx + 1);
      if (isPlaying) startAutoPlay();
    });
  }

  if (playToggleBtn) {
    playToggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (isPlaying) {
        stopAutoPlay();
        if (typeof showToast === 'function') showToast('Auto-rotation paused', 'info');
      } else {
        startAutoPlay();
        if (typeof showToast === 'function') showToast('Auto-rotation resumed', 'info');
      }
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSlide = parseInt(dot.getAttribute('data-goto-slide'), 10);
      if (!isNaN(targetSlide)) {
        showSlide(targetSlide);
        if (isPlaying) startAutoPlay();
      }
    });
  });

  // Keyboard navigation when focused
  container?.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      showSlide(currentIdx - 1);
      if (isPlaying) startAutoPlay();
    }
    if (e.key === 'ArrowRight') {
      showSlide(currentIdx + 1);
      if (isPlaying) startAutoPlay();
    }
  });

  // Touch Swipe Gesture Navigation for Mobile Devices
  let bookTouchStartX = 0;
  if (container) {
    container.addEventListener('touchstart', (e) => {
      bookTouchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
      const bookTouchEndX = e.changedTouches[0].screenX;
      const diff = bookTouchStartX - bookTouchEndX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          showSlide(currentIdx + 1);
        } else {
          showSlide(currentIdx - 1);
        }
        if (isPlaying) startAutoPlay();
      }
    }, { passive: true });
  }

  // Initialize first slide and start auto-rotation
  showSlide(0);
  startAutoPlay();
}

/* ===================================================================
   12. Hero Profile Photo Slideshow
   Auto-rotates every 2.5s with crossfade + subtle Ken Burns zoom.
   Dot indicators are clickable. Pauses on hover.
   =================================================================== */
function initHeroSlideshow() {
  const slides = document.querySelectorAll('.hero-slide');
  // Touch Swipe for Mobile on Hero Slideshow
  const heroContainer = document.getElementById('hero-slideshow');
  let heroTouchStartX = 0;
  if (heroContainer) {
    heroContainer.addEventListener('touchstart', (e) => {
      heroTouchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    heroContainer.addEventListener('touchend', (e) => {
      const heroTouchEndX = e.changedTouches[0].screenX;
      const diff = heroTouchStartX - heroTouchEndX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          goTo(current + 1);
        } else {
          goTo(current - 1);
        }
        startTimer();
      }
    }, { passive: true });
  }

  const dots   = document.querySelectorAll('.hero-dot');
  if (!slides.length) return;

  let current  = 0;
  let timer    = null;
  const INTERVAL = 2500; // 2.5 seconds

  function goTo(index) {
    // Hide current slide
    slides[current].classList.remove('opacity-100', 'scale-100');
    slides[current].classList.add('opacity-0', 'scale-105');
    dots[current].classList.remove('bg-amber-400', 'w-4', 'h-2');
    dots[current].classList.add('bg-white/30', 'w-1.5', 'h-1.5');

    // Update index (loop around)
    current = (index + slides.length) % slides.length;

    // Show next slide
    slides[current].classList.remove('opacity-0', 'scale-105');
    slides[current].classList.add('opacity-100', 'scale-100');
    dots[current].classList.remove('bg-white/30', 'w-1.5', 'h-1.5');
    dots[current].classList.add('bg-amber-400', 'w-4', 'h-2');

    // Update live slide counter badge
    const counterBadge = document.getElementById('hero-slide-counter');
    if (counterBadge) {
      counterBadge.textContent = `0${current + 1} / 0${slides.length}`;
    }
  }

  function startTimer() {
    stopTimer();
    timer = setInterval(() => goTo(current + 1), INTERVAL);
  }

  function stopTimer() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  // Wire up dot buttons for manual navigation
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      goTo(i);
      startTimer(); // reset interval after manual click
    });
  });

  // Pause on hover, resume on leave
  const wrapper = document.getElementById('hero-slideshow');
  if (wrapper) {
    wrapper.addEventListener('mouseenter', stopTimer);
    wrapper.addEventListener('mouseleave', startTimer);
  }

  // Init first dot active state
  dots[0].classList.add('w-4', 'h-2', 'bg-amber-400');
  dots[0].classList.remove('w-1.5', 'h-1.5', 'bg-white/30');

  // Start the slideshow
  startTimer();
}

/* ===================================================================
   13. Interactive 3D Particle Universe Canvas (Hero)
   =================================================================== */
function initHero3DCanvas() {
  const canvas = document.getElementById('hero-3d-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let animationFrameId = null;
  let isVisible = true;

  function resize() {
    const parent = canvas.parentElement;
    if (!parent) return;
    const rect = parent.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
  }

  resize();
  window.addEventListener('resize', resize);

  // 3D Particles
  const PARTICLE_COUNT = 85;
  const particles = [];
  const colors = [
    'rgba(245, 158, 11, ',  // Amber
    'rgba(251, 191, 36, ',  // Gold
    'rgba(6, 182, 212, ',   // Cyan
    'rgba(52, 211, 153, '   // Emerald
  ];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: (Math.random() - 0.5) * 800,
      y: (Math.random() - 0.5) * 600,
      z: (Math.random() - 0.5) * 800,
      radius: Math.random() * 2 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      baseAlpha: Math.random() * 0.6 + 0.25,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      vz: (Math.random() - 0.5) * 0.35
    });
  }

  let targetAngleX = 0;
  let targetAngleY = 0;
  let angleX = 0;
  let angleY = 0;

  window.addEventListener('mousemove', (e) => {
    const normX = (e.clientX / window.innerWidth - 0.5) * 2;
    const normY = (e.clientY / window.innerHeight - 0.5) * 2;
    targetAngleY = normX * 0.35;
    targetAngleX = -normY * 0.25;
  });

  // IntersectionObserver to pause when hero is scrolled away
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isVisible = entry.isIntersecting;
      if (isVisible && !animationFrameId) {
        loop();
      }
    });
  }, { threshold: 0.05 });

  const heroSec = document.getElementById('hero');
  if (heroSec) observer.observe(heroSec);

  const FOV = 420;

  function loop() {
    if (!isVisible) {
      animationFrameId = null;
      return;
    }

    ctx.clearRect(0, 0, width, height);

    // Smooth lerp for mouse angles
    angleX += (targetAngleX - angleX) * 0.05;
    angleY += (targetAngleY - angleY) * 0.05;

    // Idle rotation
    const idleRotY = angleY + 0.0015;
    const idleRotX = angleX;

    const cosY = Math.cos(idleRotY);
    const sinY = Math.sin(idleRotY);
    const cosX = Math.cos(idleRotX);
    const sinX = Math.sin(idleRotX);

    const projected = [];

    // Project 3D particles to 2D
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Move particle
      p.x += p.vx;
      p.y += p.vy;
      p.z += p.vz;

      // Wrap boundaries
      if (p.x > 400) p.x = -400;
      if (p.x < -400) p.x = 400;
      if (p.y > 300) p.y = -300;
      if (p.y < -300) p.y = 300;
      if (p.z > 400) p.z = -400;
      if (p.z < -400) p.z = 400;

      // 3D Rotation
      const x1 = p.x * cosY - p.z * sinY;
      const z1 = p.z * cosY + p.x * sinY;

      const y1 = p.y * cosX - z1 * sinX;
      const z2 = z1 * cosX + p.y * sinX;

      // Perspective projection
      const depth = z2 + FOV;
      if (depth <= 10) continue;

      const scale = FOV / depth;
      const projX = x1 * scale + width / 2;
      const projY = y1 * scale + height / 2;
      const alpha = Math.min(Math.max((z2 + 400) / 800, 0.1), 0.95) * p.baseAlpha;

      projected.push({
        x: projX,
        y: projY,
        scale: scale,
        radius: p.radius * scale,
        color: p.color,
        alpha: alpha
      });
    }

    // Connect close 3D particles with glowing neural lines
    const lineDist = 95;
    for (let i = 0; i < projected.length; i++) {
      for (let j = i + 1; j < projected.length; j++) {
        const p1 = projected[i];
        const p2 = projected[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < lineDist) {
          const lineAlpha = (1 - dist / lineDist) * 0.22 * ((p1.alpha + p2.alpha) / 2);
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(245, 158, 11, ${lineAlpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Draw projected nodes
    for (let i = 0; i < projected.length; i++) {
      const p = projected[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(p.radius, 0.6), 0, Math.PI * 2);
      ctx.fillStyle = `${p.color}${p.alpha})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = p.color + '0.7)';
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    animationFrameId = requestAnimationFrame(loop);
  }

  loop();
}

/* ===================================================================
   14. Universal 3D Card Tilt & Specular Glare (Cards & Highlights)
   =================================================================== */
function init3DCardTilt() {
  const tiltElements = document.querySelectorAll('.tilt-3d, .project-item');
  if (!tiltElements.length) return;

  tiltElements.forEach(el => {
    // Ensure glare element exists
    if (!el.querySelector('.tilt-glare')) {
      const glare = document.createElement('div');
      glare.className = 'tilt-glare';
      el.appendChild(glare);
    }

    const maxTilt = parseFloat(el.getAttribute('data-tilt-max')) || 10;

    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const normX = (x / rect.width) - 0.5;
      const normY = (y / rect.height) - 0.5;

      const tiltY = normX * maxTilt;
      const tiltX = -normY * maxTilt;

      el.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;

      // Set specular glare position
      el.style.setProperty('--glare-x', `${x}px`);
      el.style.setProperty('--glare-y', `${y}px`);
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  });
}

/* ===================================================================
   15. "Ask Tawhid AI" Floating Chatbot Assistant Logic
   =================================================================== */
function initTawhidAIChat() {
  const toggleBtn = document.getElementById('ai-chat-toggle-btn');
  const chatWindow = document.getElementById('tawhid-ai-chat-window');
  const closeBtn = document.getElementById('ai-chat-close-btn');
  const clearBtn = document.getElementById('ai-chat-clear-btn');
  const chatForm = document.getElementById('ai-chat-form');
  const chatInput = document.getElementById('ai-chat-input');
  const messagesContainer = document.getElementById('ai-chat-messages');

  if (!toggleBtn || !chatWindow || !messagesContainer) return;

  // Toggle chat window visibility
  toggleBtn.addEventListener('click', () => {
    chatWindow.classList.toggle('active');
    if (chatWindow.classList.contains('active') && chatInput) {
      setTimeout(() => chatInput.focus(), 300);
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      chatWindow.classList.remove('active');
    });
  }

  // Clear chat
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      messagesContainer.innerHTML = `
        <div class="flex gap-2.5 items-start">
          <div class="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
            <i class="fas fa-robot"></i>
          </div>
          <div class="space-y-2 max-w-[85%]">
            <div class="p-3 rounded-2xl rounded-tl-sm bg-white/10 border border-white/10 text-slate-200 leading-relaxed shadow-sm">
              Hello! 👋 I'm <strong>Tawhid's Virtual AI Twin</strong>. I can answer any questions about his <strong>20+ published books</strong>, <strong>AI & web development work</strong>, <strong>IELTS marketing achievements</strong>, or arrange an interview.
            </div>
            <div class="text-[10px] text-slate-400 font-semibold uppercase tracking-wider pl-1">
              Suggested questions:
            </div>
            <div class="flex flex-wrap gap-1.5" id="ai-quick-chips">
              <button type="button" class="ai-chip px-2.5 py-1 rounded-full bg-white/5 hover:bg-amber-500/20 hover:text-amber-300 border border-white/10 text-[11px] text-slate-300 transition-all text-left cursor-pointer" data-question="What books has Tawhid published?">
                📚 Top Published Books
              </button>
              <button type="button" class="ai-chip px-2.5 py-1 rounded-full bg-white/5 hover:bg-emerald-500/20 hover:text-emerald-300 border border-white/10 text-[11px] text-slate-300 transition-all text-left cursor-pointer" data-question="How can I hire Tawhid or get in touch?">
                💼 How to Hire Tawhid
              </button>
              <button type="button" class="ai-chip px-2.5 py-1 rounded-full bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-300 border border-white/10 text-[11px] text-slate-300 transition-all text-left cursor-pointer" data-question="What tech stack does he use?">
                💻 Tech Stack & AI Workflow
              </button>
              <button type="button" class="ai-chip px-2.5 py-1 rounded-full bg-white/5 hover:bg-amber-500/20 hover:text-amber-300 border border-white/10 text-[11px] text-slate-300 transition-all text-left cursor-pointer" data-question="Tell me about his British Council Awards">
                🏆 British Council Awards
              </button>
            </div>
          </div>
        </div>
      `;
      if (typeof showToast === 'function') showToast('Chat reset to welcome screen.', 'info');
    });
  }

  // Delegated click listener on container (prevents duplicate event listener stacking)
  messagesContainer.addEventListener('click', (e) => {
    const chip = e.target.closest('.ai-chip');
    if (!chip) return;
    e.preventDefault();
    const q = chip.getAttribute('data-question') || chip.textContent.trim();
    if (q) handleUserQuery(q);
  });

  // Handle form submission
  if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = chatInput ? chatInput.value.trim() : '';
      if (!query) return;
      handleUserQuery(query);
      if (chatInput) chatInput.value = '';
    });
  }

  function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function appendUserBubble(text) {
    const bubble = document.createElement('div');
    bubble.className = 'flex justify-end';
    bubble.innerHTML = `
      <div class="p-3 rounded-2xl rounded-tr-sm bg-gradient-to-r from-amber-500 to-amber-600 text-navy-950 font-medium max-w-[85%] leading-relaxed shadow-md">
        ${escapeHtml(text)}
      </div>
    `;
    messagesContainer.appendChild(bubble);
    scrollToBottom();
  }

  function appendAiResponse(htmlContent) {
    const bubble = document.createElement('div');
    bubble.className = 'flex gap-2.5 items-start';
    bubble.innerHTML = `
      <div class="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs flex-shrink-0 mt-0.5 shadow-inner">
        <i class="fas fa-robot"></i>
      </div>
      <div class="p-3 rounded-2xl rounded-tl-sm bg-white/10 border border-white/10 text-slate-200 max-w-[85%] leading-relaxed shadow-sm">
        ${htmlContent}
      </div>
    `;
    messagesContainer.appendChild(bubble);
    scrollToBottom();
  }

  function showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.id = 'ai-typing-indicator';
    indicator.className = 'flex gap-2.5 items-start';
    indicator.innerHTML = `
      <div class="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
        <i class="fas fa-robot"></i>
      </div>
      <div class="p-3 rounded-2xl rounded-tl-sm bg-white/5 border border-white/5 flex items-center gap-1 text-slate-400">
        <span class="ai-typing-dot"></span>
        <span class="ai-typing-dot"></span>
        <span class="ai-typing-dot"></span>
      </div>
    `;
    messagesContainer.appendChild(indicator);
    scrollToBottom();
  }

  function removeTypingIndicator() {
    const indicator = document.getElementById('ai-typing-indicator');
    if (indicator) indicator.remove();
  }

  // Core AI Knowledge Matcher
  function generateAIResponse(q) {
    const query = q.toLowerCase();

    // Books / Publications
    if (query.includes('book') || query.includes('publish') || query.includes('karpathy') || query.includes('sales') || query.includes('author') || query.includes('বই') || query.includes('লেকা')) {
      return `
        <div class="space-y-2">
          <p>📚 <strong>Tawhid is a Prolific Published Author</strong> with over <strong>20+ published titles</strong> across Google Play Books and Rakuten Kobo.</p>
          <ul class="space-y-1 text-[11px] text-slate-300 list-disc pl-4">
            <li><strong class="text-amber-300">The Karpathy Mindset:</strong> Scaling AI Ventures — lessons from OpenAI to Anthropic ($4.99).</li>
            <li><strong class="text-rose-300">Masters of Sales:</strong> Strategies & Stories from Frontline Enterprise Closers.</li>
            <li><strong>AI & Technology:</strong> Prompt engineering, Software 2.0, autonomous agents.</li>
          </ul>
          <div class="pt-1.5 flex flex-wrap gap-2">
            <a href="#all-books" class="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[11px] font-semibold border border-amber-500/30">
              <i class="fas fa-book-open mr-1"></i> View All 20+ Books
            </a>
            <a href="https://play.google.com/store/search?q=Md+Talha+Hussain+Tawhid&c=books" target="_blank" rel="noopener" class="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold">
              <i class="fab fa-google-play mr-1"></i> Google Play
            </a>
          </div>
        </div>
      `;
    }

    // Hiring / Contact / WhatsApp / Email
    if (query.includes('hire') || query.includes('contact') || query.includes('reach') || query.includes('whatsapp') || query.includes('email') || query.includes('যোগাযোগ') || query.includes('হায়ার') || query.includes('কাজ')) {
      return `
        <div class="space-y-2">
          <p>⚡ <strong>Ready to collaborate with Tawhid!</strong> He is actively open for high-impact roles, consulting, marketing campaigns, and web automation projects.</p>
          <div class="p-2.5 rounded-xl bg-navy-950/80 border border-white/10 space-y-1.5 text-[11px]">
            <div class="flex items-center justify-between">
              <span class="text-slate-400"><i class="fab fa-whatsapp text-emerald-400 mr-1.5"></i>WhatsApp:</span>
              <a href="https://wa.me/8801711729858" target="_blank" class="text-emerald-400 font-mono font-bold hover:underline">+880 1711-729858</a>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-slate-400"><i class="fas fa-envelope text-red-400 mr-1.5"></i>Email:</span>
              <a href="mailto:tawhidh2005@gmail.com" class="text-amber-300 font-mono hover:underline">tawhidh2005@gmail.com</a>
            </div>
          </div>
          <div class="pt-1">
            <a href="#contact" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-navy-950 text-[11px] font-bold">
              <span>Go to Contact Form</span> <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      `;
    }

    // Tech Stack / Coding / Projects / AI Coder
    if (query.includes('tech') || query.includes('stack') || query.includes('code') || query.includes('project') || query.includes('java') || query.includes('javascript') || query.includes('ai') || query.includes('প্রজেক্ট') || query.includes('স্কিল')) {
      return `
        <div class="space-y-2">
          <p>💻 <strong>AI-Native Developer & Software Builder</strong></p>
          <p class="text-[11px] text-slate-300">
            Tawhid codes primarily in <strong class="text-amber-400">HTML5, CSS3, JavaScript (ES6+) & Java</strong>. He supercharges his workflow with <strong class="text-white">Generative AI & Prompt Engineering</strong> to rapidly ship production-grade portals, games, and reservation tools.
          </p>
          <p class="text-[11px] text-slate-300">
            Featured GitHub Repositories (18+ repos): <em>RentFlow Booking Engine, Medical Specialty Registry, SSIA Jalalpur Finance Portal, Cyber Threat Quiz.</em>
          </p>
          <div class="pt-1 flex gap-2">
            <a href="#projects" class="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[11px] font-semibold border border-amber-500/30">
              <i class="fas fa-code mr-1"></i> Browse 11 Projects
            </a>
            <a href="https://github.com/tawhid2005?tab=repositories" target="_blank" rel="noopener" class="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold">
              <i class="fab fa-github mr-1"></i> GitHub Repos
            </a>
          </div>
        </div>
      `;
    }

    // Awards / British Council / Top Performer
    if (query.includes('award') || query.includes('british council') || query.includes('trophy') || query.includes('honor') || query.includes('ielts') || query.includes('shah sultan') || query.includes('এওয়ার্ড') || query.includes('পুরস্কার')) {
      return `
        <div class="space-y-2">
          <p>🏆 <strong>2x Top Performer Award Winner</strong></p>
          <p class="text-[11px] text-slate-300">
            As the <strong>Head of Marketing at Shah Sultan's IELTS Academy</strong>, Tawhid was awarded the coveted <strong>Star Performer / Top Performer Trophy</strong> for two consecutive sessions:
          </p>
          <ul class="space-y-1 text-[11px] text-slate-300 list-disc pl-4">
            <li><strong class="text-amber-400">Top Performer Award 2024-25</strong></li>
            <li><strong class="text-amber-400">Top Performer Award 2025-26</strong></li>
            <li>Accredited by the <strong>British Council</strong> for driving 240%+ admission growth and brand visibility.</li>
          </ul>
          <a href="#experience" class="inline-block px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 text-[11px] font-semibold border border-amber-500/30">
            <i class="fas fa-award mr-1"></i> View Trophy & Ceremony Photos
          </a>
        </div>
      `;
    }

    // Caregiving / Medical / IT Diploma
    if (query.includes('care') || query.includes('nurse') || query.includes('medical') || query.includes('health') || query.includes('diploma') || query.includes('bteb') || query.includes('starlight')) {
      return `
        <div class="space-y-2">
          <p>🏥 <strong>Healthcare Caregiving & BTEB IT Diploma</strong></p>
          <p class="text-[11px] text-slate-300">
            Along with marketing and technology, Tawhid holds professional credentials in:
          </p>
          <ul class="space-y-1 text-[11px] text-slate-300 list-disc pl-4">
            <li><strong>Certified Clinical Caregiver:</strong> Specialized in patient mobility, vital signs monitoring, medication compliance, and eldercare.</li>
            <li><strong>IT & Office Application Diploma:</strong> Bangladesh Technical Education Board (BTEB) certified.</li>
            <li><strong>Higher Secondary Certificate (HSC):</strong> Starlight College, Sylhet.</li>
          </ul>
          <a href="#caregiving" class="inline-block px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold border border-emerald-500/30">
            <i class="fas fa-user-nurse mr-1"></i> View Caregiving Experience
          </a>
        </div>
      `;
    }

    // Fallback / General
    return `
      <div class="space-y-2">
        <p>I understand! Md Talha Hussain Tawhid is a multifaceted professional: <strong>Head of Marketing</strong>, <strong>Author of 20+ Books</strong>, and <strong>AI-Native Software Developer</strong> based in Sylhet, Bangladesh.</p>
        <p class="text-[11px] text-slate-300">You can ask me specifically about:</p>
        <div class="flex flex-wrap gap-1.5 pt-1">
          <button type="button" class="ai-chip px-2 py-0.5 rounded-full bg-white/5 hover:bg-amber-500/20 text-[10px] text-amber-300 border border-white/10" data-question="What books has Tawhid published?">📚 Published Books</button>
          <button type="button" class="ai-chip px-2 py-0.5 rounded-full bg-white/5 hover:bg-emerald-500/20 text-[10px] text-emerald-300 border border-white/10" data-question="How can I hire Tawhid or get in touch?">💼 Contact & Hire</button>
          <button type="button" class="ai-chip px-2 py-0.5 rounded-full bg-white/5 hover:bg-cyan-500/20 text-[10px] text-cyan-300 border border-white/10" data-question="What tech stack does he use?">💻 Projects & Code</button>
        </div>
      </div>
    `;
  }

  let isGenerating = false;

  function handleUserQuery(query) {
    if (isGenerating || !query) return;
    isGenerating = true;

    appendUserBubble(query);
    showTypingIndicator();

    setTimeout(() => {
      removeTypingIndicator();
      const responseHtml = generateAIResponse(query);
      appendAiResponse(responseHtml);
      isGenerating = false;
    }, 400);
  }
}

/* ===================================================================
   16. Ambient Cursor Spotlight Torch
   =================================================================== */
function initAmbientCursorTorch() {
  const torch = document.getElementById('ambient-cursor-glow');
  if (!torch) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;
  let isMoving = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isMoving) {
      isMoving = true;
      requestAnimationFrame(renderTorch);
    }
  });

  function renderTorch() {
    currentX += (mouseX - currentX) * 0.15;
    currentY += (mouseY - currentY) * 0.15;

    torch.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;

    if (Math.abs(mouseX - currentX) > 0.5 || Math.abs(mouseY - currentY) > 0.5) {
      requestAnimationFrame(renderTorch);
    } else {
      isMoving = false;
    }
  }
}

/* ===================================================================
   17. Magnetic Buttons Micro-Interaction
   =================================================================== */
function initMagneticButtons() {
  const magneticBtns = document.querySelectorAll('.btn-magnetic');
  if (!magneticBtns.length) return;

  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Subtle magnetic attraction
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });
}

/* ===================================================================
   18. Staggered Scroll-Triggered Reveal Animation
   =================================================================== */
function initScrollReveal() {
  const targetElements = document.querySelectorAll('.reveal-on-scroll, section > div > div.grid, .glass-card, .timeline-card');
  if (!targetElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
  });

  targetElements.forEach(el => {
    el.classList.add('reveal-on-scroll');
    observer.observe(el);
  });
}

/* ===================================================================
   19. Interactive Resume / CV Viewer & PDF Download Modal
   =================================================================== */
function initResumeModal() {
  const cvBtn = document.getElementById('download-cv-btn');
  if (!cvBtn) return;

  // Dedicated Executive A4 Printable CV HTML Generator
  function getExecutiveA4CvHtml() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Md_Talha_Hussain_Tawhid_CV.pdf</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 12mm 15mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #0f172a;
      background: #ffffff;
      line-height: 1.45;
      font-size: 9.5pt;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .cv-wrap {
      max-width: 800px;
      margin: 0 auto;
    }
    /* Header */
    .cv-header {
      border-bottom: 2.5px solid #0f172a;
      padding-bottom: 10px;
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .cv-name {
      font-size: 21pt;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.5px;
      text-transform: uppercase;
    }
    .cv-subtitle {
      font-size: 10.5pt;
      font-weight: 700;
      color: #b45309;
      margin-top: 2px;
    }
    .cv-contact-box {
      text-align: right;
      font-size: 8.5pt;
      color: #334155;
      line-height: 1.45;
    }
    .cv-contact-box a {
      color: #0f172a;
      text-decoration: none;
      font-weight: 600;
    }
    /* Section Headings */
    .sec-h {
      font-size: 10.5pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 1.5px solid #cbd5e1;
      padding-bottom: 2px;
      margin-top: 10px;
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    /* Summary */
    .summary-text {
      font-size: 9pt;
      color: #334155;
      line-height: 1.5;
      text-align: justify;
    }
    /* Accolades & Highlights */
    .highlights-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 6px;
      margin: 6px 0;
    }
    .h-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 3.5px solid #d97706;
      padding: 5px 8px;
      border-radius: 4px;
    }
    .h-card strong {
      display: block;
      color: #0f172a;
      font-size: 8.5pt;
    }
    .h-card span {
      font-size: 7.5pt;
      color: #475569;
    }
    /* Experience */
    .job-item {
      margin-bottom: 8px;
    }
    .job-top {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .job-role {
      font-size: 9.5pt;
      font-weight: 700;
      color: #0f172a;
    }
    .job-company {
      color: #b45309;
      font-weight: 600;
      font-size: 9pt;
    }
    .job-meta {
      font-size: 8pt;
      color: #64748b;
      font-family: monospace;
      font-weight: 600;
    }
    .job-bullets {
      padding-left: 16px;
      font-size: 8.5pt;
      color: #334155;
      margin-top: 3px;
    }
    .job-bullets li {
      margin-bottom: 2px;
      line-height: 1.4;
    }
    /* Two-column Layout for Books & Education */
    .two-col {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 12px;
    }
    /* Skills Pills */
    .pill {
      display: inline-block;
      padding: 1px 6px;
      border-radius: 3px;
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      font-size: 7.8pt;
      margin: 1px 2px;
      color: #0f172a;
      font-weight: 500;
    }
    .cert-item {
      margin-bottom: 6px;
      padding: 5px 8px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
    }
    .cert-item strong {
      font-size: 8.8pt;
      color: #0f172a;
      display: block;
    }
    .cert-item span {
      font-size: 7.8pt;
      color: #047857;
      font-weight: 600;
    }
    .pub-book {
      margin-bottom: 4px;
      font-size: 8.5pt;
    }
    .pub-book strong {
      color: #0f172a;
    }
    .pub-book span {
      color: #64748b;
      font-size: 7.5pt;
    }
    @media print {
      body {
        margin: 0;
        padding: 0;
      }
    }
  </style>
</head>
<body>
  <div class="cv-wrap">
    
    <!-- Header -->
    <header class="cv-header">
      <div>
        <h1 class="cv-name">Md Talha Hussain Tawhid</h1>
        <div class="cv-subtitle">Head of Marketing • Published Author (20+ Books) • AI Developer & Certified Caregiver</div>
      </div>
      <div class="cv-contact-box">
        <div><strong>Location:</strong> Sylhet, Bangladesh</div>
        <div><strong>Phone / WhatsApp:</strong> +880 1711-729858</div>
        <div><strong>Email:</strong> tawhidh2005@gmail.com</div>
        <div><strong>Portfolio:</strong> tawhid.dev • <strong>GitHub:</strong> github.com/tawhid2005</div>
      </div>
    </header>

    <!-- Executive Summary -->
    <section>
      <div class="sec-h">Executive Career Profile</div>
      <p class="summary-text">
        High-performance growth marketing leader, published intellectual property author, and AI-native developer with an accredited foundation in clinical healthcare and computer systems. Conferred the <strong>2x Top Performer Award (British Council recognized, 2024-25 & 2025-26)</strong> for driving a record <strong>240%+ admissions expansion</strong> at Shah Sultan's IELTS Academy. Globally published author of <strong>20+ strategic and technical books</strong> on Google Play Books, Rakuten Kobo, and Amazon. Certified in Clinical Caregiving (NTVQF Level II) and Computer Applications (BTEB), seamlessly blending strategic acquisition, rigorous execution, and frontier artificial intelligence workflows.
      </p>
    </section>

    <!-- Key Accolades & Performance Milestones -->
    <section>
      <div class="sec-h">Key Honors & Performance Milestones</div>
      <div class="highlights-grid">
        <div class="h-card">
          <strong>2x Top Performer Award</strong>
          <span>2024-25 & 2025-26 Honor • British Council Recognized</span>
        </div>
        <div class="h-card" style="border-left-color: #059669;">
          <strong>240%+ Admissions Surge</strong>
          <span>Record Student Lead Acquisition & Paid Funnel Scale</span>
        </div>
        <div class="h-card" style="border-left-color: #0284c7;">
          <strong>20+ Published Books</strong>
          <span>International Distribution (Google Play, Kobo & Amazon)</span>
        </div>
      </div>
    </section>

    <!-- Professional Experience -->
    <section>
      <div class="sec-h">Professional Experience</div>

      <div class="job-item">
        <div class="job-top">
          <div>
            <span class="job-role">Head of Marketing</span> — 
            <span class="job-company">Shah Sultan's IELTS Academy</span>
          </div>
          <div class="job-meta">2024 – Present | Sylhet, Bangladesh</div>
        </div>
        <ul class="job-bullets">
          <li>Architect and oversee full-funnel student recruitment and institutional branding across Meta Ads (Facebook/Instagram), Google Search, and TikTok campaigns.</li>
          <li>Scaled active student enrollment by <strong>over 240% year-over-year</strong>, optimizing cost-per-lead (CPL) and maximizing classroom capacity.</li>
          <li>Awarded back-to-back <strong>Top Performer Awards (2024-25 and 2025-26)</strong> for unprecedented institutional expansion and revenue contribution.</li>
          <li>Direct creative direction, video scripts, ad copy, and automated CRM WhatsApp/email nurture workflows for high lead conversion.</li>
        </ul>
      </div>

      <div class="job-item">
        <div class="job-top">
          <div>
            <span class="job-role">Independent Technical Author & Growth Strategist</span> — 
            <span class="job-company">Global Digital Distribution</span>
          </div>
          <div class="job-meta">2021 – Present | Global</div>
        </div>
        <ul class="job-bullets">
          <li>Authored and released <strong>20+ commercial non-fiction and technical books</strong> across Google Play Books Partner Center, Rakuten Kobo Writing Life, and Amazon Kindle.</li>
          <li>Covered frontier topics including Autonomous AI Agents, Prompt Engineering architectures, Enterprise Closing Sales Systems, and Digital Agency operational frameworks.</li>
          <li>Designed proprietary cover art, typography layouts, and automated digital royalty management systems.</li>
        </ul>
      </div>

      <div class="job-item">
        <div class="job-top">
          <div>
            <span class="job-role">Clinical Healthcare & Patient Care Intern</span> — 
            <span class="job-company">Noorjahan Hospital Ltd.</span>
          </div>
          <div class="job-meta">Clinical Rotation | Sylhet, Bangladesh</div>
        </div>
        <ul class="job-bullets">
          <li>Executed hands-on clinical patient assistance, vital signs monitoring (BP, pulse, SpO2, blood glucose), and post-operative mobility support under direct medical supervision.</li>
          <li>Applied stringent hygiene, infection control, and empathetic elderly caregiving protocols in hospital inpatient wards.</li>
        </ul>
      </div>
    </section>

    <!-- Two-Column Layout for Books, Education & Skills -->
    <div class="two-col">
      
      <!-- Left Column: Publications & Technical Stack -->
      <div>
        <div class="sec-h">Select Published Books (Catalog of 20+)</div>
        <div class="pub-book">
          <strong>• The Karpathy Mindset: Scaling AI Ventures</strong><br>
          <span>From OpenAI to Anthropic • GGKEY: 708U16F197Y</span>
        </div>
        <div class="pub-book">
          <strong>• The Social Security Earnings Hack: Work & Earn</strong><br>
          <span>Official Publication • GGKEY: KR0HZCRST0Z</span>
        </div>
        <div class="pub-book">
          <strong>• How to Start a Digital Marketing Agency in 2024</strong><br>
          <span>Scaling & Client Systems • GGKEY: J3F1QG9J3C3</span>
        </div>
        <div class="pub-book">
          <strong>• Masters of Sales: Enterprise Closing Strategies</strong><br>
          <span>Frontline Frameworks • Kobo ISBN: 1230008064509</span>
        </div>

        <div class="sec-h" style="margin-top: 8px;">Technical & AI Fluency</div>
        <div style="margin-top: 4px;">
          <span class="pill">Meta Ads Manager</span>
          <span class="pill">Google Ads</span>
          <span class="pill">CRO & Funnels</span>
          <span class="pill">Prompt Engineering</span>
          <span class="pill">OpenAI / Claude APIs</span>
          <span class="pill">JavaScript (ES6+)</span>
          <span class="pill">Java (OOP)</span>
          <span class="pill">HTML5 & CSS3</span>
          <span class="pill">Git / GitHub</span>
          <span class="pill">Advanced MS Excel</span>
          <span class="pill">Cyber Security Basics</span>
        </div>
      </div>

      <!-- Right Column: Formal Education & Government Qualifications -->
      <div>
        <div class="sec-h">Formal Education &amp; Qualifications</div>
        
        <!-- HSC 2024 -->
        <div class="cert-item" style="border-left: 3.5px solid #d97706;">
          <strong>Higher Secondary Certificate (HSC) — Passed 2024</strong>
          <span style="color: #b45309;">Starlight College, Sylhet • Sylhet Education Board</span>
          <p style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Humanities • Distinction in analytical writing, civics &amp; social science research.</p>
        </div>

        <!-- Dakhil 2022 -->
        <div class="cert-item" style="border-left: 3.5px solid #059669;">
          <strong>Dakhil Examination (SSC Equivalent) — Passed 2022</strong>
          <span style="color: #047857;">Lawai Islamia Alim Madrasah • Madrasah Board</span>
          <p style="font-size: 7.5pt; color: #475569; margin-top: 2px;">General &amp; Islamic Studies (SSC Standard) • Bilingual linguistics &amp; sciences.</p>
        </div>

        <!-- JDC 2019 -->
        <div class="cert-item" style="border-left: 3.5px solid #0284c7;">
          <strong>Junior Dakhil Certificate (JDC) — Passed 2019</strong>
          <span style="color: #0284c7;">Lawai Islamia Alim Madrasah • Madrasah Board</span>
          <p style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Foundational academic milestone in language arts &amp; general mathematics.</p>
        </div>

        <!-- Caregiver BTEB -->
        <div class="cert-item" style="border-left: 3.5px solid #7c3aed;">
          <strong>Certified Clinical Caregiver (NTVQF Level II) — 2023</strong>
          <span style="color: #6d28d9;">Bangladesh Technical Education Board (BTEB)</span>
          <p style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Hospital inpatient clinical rotation at Noorjahan Hospital Ltd. • Vital signs.</p>
        </div>

        <!-- IT Diploma BTEB -->
        <div class="cert-item" style="border-left: 3.5px solid #2563eb;">
          <strong>Computer Application &amp; IT Diploma (360 Hours)</strong>
          <span style="color: #1d4ed8;">BTEB Board Examination • Reg: 3002275646 • Grade: A+</span>
          <p style="font-size: 7.5pt; color: #475569; margin-top: 2px;">Advanced MS Excel data modeling, documentation &amp; office networking systems.</p>
        </div>

        <div class="sec-h" style="margin-top: 8px;">Languages &amp; Verifications</div>
        <div style="font-size: 8.5pt; color: #334155; line-height: 1.45;">
          • <strong>English:</strong> Professional Working Proficiency<br>
          • <strong>Bengali:</strong> Native / Mother Tongue<br>
          • <strong>Sylheti:</strong> Native Regional Fluency
        </div>
      </div>

    </div>

    <!-- Footer Verification Line -->
    <div style="margin-top: 12px; padding-top: 6px; border-top: 1px dashed #cbd5e1; font-size: 7.5pt; color: #64748b; text-align: center;">
      Official Executive Curriculum Vitae • Md Talha Hussain Tawhid • Sylhet, Bangladesh • Verified Digital Portfolio: tawhid.dev
    </div>

  </div>
</body>
</html>`;
  }

  // Global function exposed so ANY button can trigger high-res PDF generation
  window.printExecutiveCvPdf = function() {
    if (window.playUiAudio) window.playUiAudio('click');
    
    // Create an isolated printable iframe for pure, clean output
    let printFrame = document.getElementById('cv-print-iframe');
    if (!printFrame) {
      printFrame = document.createElement('iframe');
      printFrame.id = 'cv-print-iframe';
      printFrame.style.position = 'fixed';
      printFrame.style.right = '0';
      printFrame.style.bottom = '0';
      printFrame.style.width = '0';
      printFrame.style.height = '0';
      printFrame.style.border = '0';
      printFrame.style.visibility = 'hidden';
      document.body.appendChild(printFrame);
    }

    const frameDoc = printFrame.contentWindow || printFrame.contentDocument;
    const doc = printFrame.contentDocument || printFrame.contentWindow.document;

    doc.open();
    doc.write(getExecutiveA4CvHtml());
    doc.close();

    // Trigger Print after styles & fonts are rendered
    setTimeout(() => {
      try {
        if (printFrame.contentWindow) {
          printFrame.contentWindow.focus();
          printFrame.contentWindow.print();
        } else {
          window.print();
        }
      } catch (err) {
        // Fallback: Open in new window if iframe print is blocked
        const pWin = window.open('', '_blank');
        if (pWin) {
          pWin.document.write(getExecutiveA4CvHtml());
          pWin.document.close();
          pWin.focus();
          setTimeout(() => pWin.print(), 300);
        } else {
          window.print();
        }
      }
    }, 350);

    if (window.showToast) {
      window.showToast('Preparing Official PDF CV for download/print...', 'success');
    }
  };

  // Open the Interactive Modal on click
  cvBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (typeof window.openPortfolioModal !== 'function') return;

    if (window.playUiAudio) window.playUiAudio('modal');

    const titleHtml = `
      <div class="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-3">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 text-navy-950 flex items-center justify-center text-lg font-black shadow-md flex-shrink-0">
            <i class="fas fa-file-invoice"></i>
          </div>
          <div>
            <h3 class="text-lg sm:text-xl font-display font-bold text-white">Executive Curriculum Vitae</h3>
            <p class="text-xs text-amber-400 font-medium">Md Talha Hussain Tawhid • Verified Official Credentials</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button type="button" onclick="window.printExecutiveCvPdf()" class="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-navy-950 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-amber-500/20 flex-shrink-0">
            <i class="fas fa-file-pdf text-sm"></i> 
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>
    `;

    const bodyHtml = `
      <div id="cv-modal-content" class="space-y-6 text-xs text-slate-300 py-1">
        
        <!-- Top Profile Banner & Fast Action Bar -->
        <div class="p-5 rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/15 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 shadow-xl">
          <div class="space-y-1.5">
            <div class="flex flex-wrap items-center gap-2">
              <h2 class="text-xl sm:text-2xl font-bold text-white font-display">Md Talha Hussain Tawhid</h2>
              <span class="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Available for Hire
              </span>
            </div>
            <p class="text-amber-400 font-semibold text-xs sm:text-sm">
              Head of Marketing (IELTS Strategy) • Published Author (20+ Books) • AI-Native Developer & Certified Caregiver
            </p>
            <div class="flex flex-wrap items-center gap-y-1 gap-x-3 text-[11px] text-slate-300 pt-1">
              <span><i class="fas fa-map-marker-alt text-amber-400 mr-1"></i> Sylhet, Bangladesh</span>
              <span><i class="fas fa-phone-alt text-amber-400 mr-1"></i> +880 1711-729858</span>
              <span><i class="fas fa-envelope text-amber-400 mr-1"></i> tawhidh2005@gmail.com</span>
            </div>
          </div>
          
          <div class="no-print flex flex-wrap items-center gap-2 flex-shrink-0">
            <button type="button" onclick="window.printExecutiveCvPdf()" class="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer">
              <i class="fas fa-download"></i> <span>Download PDF</span>
            </button>
            <a href="https://wa.me/8801711729858" target="_blank" rel="noopener" class="px-3 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-navy-950 border border-emerald-500/30 text-xs font-bold transition-all flex items-center gap-1">
              <i class="fab fa-whatsapp"></i> WhatsApp
            </a>
            <a href="mailto:tawhidh2005@gmail.com" class="px-3 py-2 rounded-xl bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white border border-red-500/30 text-xs font-bold transition-all flex items-center gap-1">
              <i class="fas fa-envelope"></i> Email
            </a>
          </div>
        </div>

        <!-- 1. Executive Career Summary -->
        <div class="p-4 rounded-xl bg-white/5 border border-white/10">
          <h4 class="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <i class="fas fa-user-tie"></i> Executive Profile
          </h4>
          <p class="text-slate-300 leading-relaxed text-justify text-xs sm:text-[13px]">
            Dynamic, multi-disciplinary growth strategist, published author, and AI-native developer with a documented track record of scaling educational admissions by <strong>240%+</strong> and authoring <strong>20+ internationally distributed books</strong> on Google Play, Kobo, and Amazon. Conferred the <strong>2x Top Performer Award (British Council recognized, 2024-25 & 2025-26)</strong>. Formally certified in Clinical Caregiving (NTVQF Level II) and Computer Applications (BTEB), seamlessly bridging strategic brand positioning, operational diligence, and software engineering.
          </p>
        </div>

        <!-- 2. Honors & Key Accolades (Bento Grid) -->
        <div>
          <h4 class="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <i class="fas fa-trophy"></i> Key Accolades & Performance Milestones
          </h4>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            <div class="p-3.5 rounded-xl bg-gradient-to-br from-amber-500/15 via-amber-500/5 to-transparent border border-amber-500/30">
              <div class="flex items-center gap-2 text-amber-400 font-bold text-xs mb-1">
                <i class="fas fa-award text-sm"></i>
                <span>2x Top Performer</span>
              </div>
              <div class="text-[11px] text-white font-semibold">2024-25 & 2025-26 Honor</div>
              <p class="text-[10px] text-slate-400 mt-1">Conferred by Shah Sultan's IELTS Academy (British Council recognized) for exceptional expansion leadership.</p>
            </div>

            <div class="p-3.5 rounded-xl bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-transparent border border-emerald-500/30">
              <div class="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-1">
                <i class="fas fa-chart-line text-sm"></i>
                <span>240%+ Surge</span>
              </div>
              <div class="text-[11px] text-white font-semibold">Admissions & Lead Scale</div>
              <p class="text-[10px] text-slate-400 mt-1">Engineered end-to-end Meta Ads funnels delivering record institutional student recruitment.</p>
            </div>

            <div class="p-3.5 rounded-xl bg-gradient-to-br from-cyan-500/15 via-cyan-500/5 to-transparent border border-cyan-500/30">
              <div class="flex items-center gap-2 text-cyan-400 font-bold text-xs mb-1">
                <i class="fas fa-book-open text-sm"></i>
                <span>20+ Books Authored</span>
              </div>
              <div class="text-[11px] text-white font-semibold">Global Distribution</div>
              <p class="text-[10px] text-slate-400 mt-1">International catalog published on Google Play Books, Rakuten Kobo, and Amazon Kindle.</p>
            </div>

          </div>
        </div>

        <!-- 3. Professional Work Experience -->
        <div>
          <h4 class="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <i class="fas fa-briefcase"></i> Professional Work Experience
          </h4>
          <div class="space-y-3">
            
            <!-- Role 1 -->
            <div class="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-amber-500/30 transition-all">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <div>
                  <span class="text-sm font-bold text-white">Head of Marketing</span> — 
                  <span class="text-amber-400 font-semibold">Shah Sultan's IELTS Academy</span>
                </div>
                <span class="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-mono text-[11px] font-bold border border-amber-500/20 self-start sm:self-auto">
                  2024 – Present • Sylhet, Bangladesh
                </span>
              </div>
              <ul class="list-disc pl-4 space-y-1 text-slate-300 text-[11px] leading-relaxed">
                <li>Direct institutional marketing strategy, budget allocation, and creative brand positioning.</li>
                <li>Engineered high-converting Meta (Facebook/Instagram) advertising funnels and automated CRM lead capture workflows, yielding a <strong>240%+ year-over-year surge</strong> in confirmed student enrollments.</li>
                <li>Direct video production, high-retention copywriting, promotional asset design, and multi-channel campaign analytics.</li>
                <li>Awarded the institution's highest recognition (<strong>Top Performer Award</strong>) across back-to-back academic sessions.</li>
              </ul>
            </div>

            <!-- Role 2 -->
            <div class="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <div>
                  <span class="text-sm font-bold text-white">Independent Author & Digital Growth Consultant</span> — 
                  <span class="text-cyan-400 font-semibold">Global Distribution</span>
                </div>
                <span class="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 font-mono text-[11px] font-bold border border-cyan-500/20 self-start sm:self-auto">
                  2021 – Present
                </span>
              </div>
              <ul class="list-disc pl-4 space-y-1 text-slate-300 text-[11px] leading-relaxed">
                <li>Authored and released <strong>20+ commercial non-fiction and technical books</strong> across Google Play Books Partner Center, Rakuten Kobo Writing Life, and Amazon Kindle.</li>
                <li>Covered frontier topics including Autonomous AI Agents, Prompt Engineering architectures, Enterprise Closing Sales Systems, and Digital Agency operational frameworks.</li>
                <li>Designed proprietary cover art, typography layouts, and automated digital royalty management systems.</li>
              </ul>
            </div>

            <!-- Role 3 -->
            <div class="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <div>
                  <span class="text-sm font-bold text-white">Clinical Patient Caregiving Intern</span> — 
                  <span class="text-emerald-400 font-semibold">Noorjahan Hospital Ltd.</span>
                </div>
                <span class="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-[11px] font-bold border border-emerald-500/20 self-start sm:self-auto">
                  Clinical Practice • Sylhet
                </span>
              </div>
              <ul class="list-disc pl-4 space-y-1 text-slate-300 text-[11px] leading-relaxed">
                <li>Executed hands-on clinical patient assistance, vital signs monitoring (BP, pulse, SpO2, blood glucose), and post-operative mobility support under direct medical supervision.</li>
                <li>Applied stringent hygiene, infection control, and empathetic elderly caregiving protocols in hospital inpatient wards.</li>
              </ul>
            </div>

          </div>
        </div>

        <!-- 4. Top Authored Publications Showcase -->
        <div>
          <div class="flex items-center justify-between mb-3">
            <h4 class="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <i class="fas fa-book"></i> Featured Published Books (From 20+ Catalog)
            </h4>
            <a href="#all-books" onclick="window.closePortfolioModal()" class="text-amber-400 hover:underline text-[11px] font-semibold">
              Browse All Books &rarr;
            </a>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[11px]">
            <div class="p-2.5 rounded-xl bg-white/5 border border-white/10">
              <strong class="text-white block">The Karpathy Mindset: Scaling AI Ventures</strong>
              <span class="text-slate-400 text-[10px]">Strategy Lessons from OpenAI to Anthropic • GGKEY: 708U16F197Y</span>
            </div>
            <div class="p-2.5 rounded-xl bg-white/5 border border-white/10">
              <strong class="text-white block">The Social Security Earnings Hack: Work & Earn</strong>
              <span class="text-slate-400 text-[10px]">Official Publication by Tawhid • GGKEY: KR0HZCRST0Z</span>
            </div>
            <div class="p-2.5 rounded-xl bg-white/5 border border-white/10">
              <strong class="text-white block">How to Start a Digital Marketing Agency in 2024</strong>
              <span class="text-slate-400 text-[10px]">Business & Agency Playbook • GGKEY: J3F1QG9J3C3</span>
            </div>
            <div class="p-2.5 rounded-xl bg-white/5 border border-white/10">
              <strong class="text-white block">Masters of Sales: Frontline Closing Strategies</strong>
              <span class="text-slate-400 text-[10px]">Enterprise Negotiation Tactics • Kobo ISBN: 1230008064509</span>
            </div>
          </div>
        </div>

        <!-- 5. Formal Education & Dual Government Qualifications -->
        <div>
          <h4 class="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <i class="fas fa-graduation-cap"></i> Formal Education &amp; Verified Government Qualifications
          </h4>
          
          <!-- Sub-Grid A: Formal Academic Degrees -->
          <div class="space-y-2 mb-3">
            <span class="text-[10px] text-slate-400 font-mono uppercase block">Formal Academic Institutions:</span>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[11px]">
              
              <!-- HSC -->
              <div class="p-3 rounded-xl bg-gradient-to-br from-amber-500/15 via-white/5 to-transparent border border-amber-500/30">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-amber-400 font-bold text-[10px] uppercase font-mono">Passed in 2024</span>
                  <span class="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[9px] font-bold">Sylhet Board</span>
                </div>
                <strong class="text-white block text-xs">Higher Secondary Certificate (HSC)</strong>
                <span class="text-amber-300 font-medium text-[11px] block mt-0.5">Starlight College, Sylhet</span>
                <p class="text-slate-400 text-[10px] mt-1 leading-snug">Discipline: Humanities • Rigorous analytical writing, civics &amp; social science methodology.</p>
              </div>

              <!-- Dakhil / SSC -->
              <div class="p-3 rounded-xl bg-gradient-to-br from-emerald-500/15 via-white/5 to-transparent border border-emerald-500/30">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-emerald-400 font-bold text-[10px] uppercase font-mono">Passed in 2022</span>
                  <span class="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-bold">Madrasah Board</span>
                </div>
                <strong class="text-white block text-xs">Dakhil Examination (SSC Eqv.)</strong>
                <span class="text-emerald-300 font-medium text-[11px] block mt-0.5">Lawai Islamia Alim Madrasah</span>
                <p class="text-slate-400 text-[10px] mt-1 leading-snug">General &amp; Islamic Studies • Arabic linguistics, ethics philosophy, mathematics &amp; sciences.</p>
              </div>

              <!-- JDC -->
              <div class="p-3 rounded-xl bg-gradient-to-br from-cyan-500/15 via-white/5 to-transparent border border-cyan-500/30">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-cyan-400 font-bold text-[10px] uppercase font-mono">Passed in 2019</span>
                  <span class="px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 text-[9px] font-bold">JDC Level</span>
                </div>
                <strong class="text-white block text-xs">Junior Dakhil Certificate (JDC)</strong>
                <span class="text-cyan-300 font-medium text-[11px] block mt-0.5">Lawai Islamia Alim Madrasah</span>
                <p class="text-slate-400 text-[10px] mt-1 leading-snug">Foundational academic excellence in language arts, elementary mathematics &amp; sciences.</p>
              </div>

            </div>
          </div>

          <!-- Sub-Grid B: Dual Government Technical Qualifications -->
          <div class="space-y-2">
            <span class="text-[10px] text-slate-400 font-mono uppercase block">Government Technical Board Qualifications:</span>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
              
              <div class="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/25 space-y-1">
                <div class="flex items-center justify-between">
                  <div class="font-bold text-white text-xs flex items-center gap-1.5">
                    <i class="fas fa-heartbeat text-purple-400"></i>
                    <span>Certified Clinical Caregiver (NTVQF Level II)</span>
                  </div>
                  <span class="text-[10px] text-purple-300 font-mono font-bold">Year 2023</span>
                </div>
                <div class="text-purple-300 font-semibold text-[11px]">Bangladesh Technical Education Board (BTEB) &amp; Noorjahan Hospital</div>
                <p class="text-[10px] text-slate-300 leading-snug">National competency qualification in patient healthcare, vital signs monitoring, elderly assistance, and inpatient clinical hospital rotation.</p>
              </div>

              <div class="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/25 space-y-1">
                <div class="flex items-center justify-between">
                  <div class="font-bold text-white text-xs flex items-center gap-1.5">
                    <i class="fas fa-desktop text-blue-400"></i>
                    <span>Computer Application &amp; IT Diploma (360 Hours)</span>
                  </div>
                  <span class="text-[10px] text-blue-300 font-mono font-bold">Grade: A+</span>
                </div>
                <div class="text-blue-300 font-semibold text-[11px]">BTEB Board Examination • Reg: 3002275646 • Code: 61096</div>
                <p class="text-[10px] text-slate-300 leading-snug">Comprehensive 360-hour syllabus covering advanced MS Excel data analytics, financial formulas, database modeling, and administrative documentation.</p>
              </div>

            </div>
          </div>

        </div>

        <!-- 6. Technical & Growth Marketing Skills Matrix -->
        <div>
          <h4 class="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <i class="fas fa-tools"></i> Core Competencies & Technical Skills
          </h4>
          <div class="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2.5">
            <div>
              <span class="text-slate-400 text-[10px] uppercase font-mono block mb-1">Growth Marketing & Advertising:</span>
              <div class="flex flex-wrap gap-1.5">
                <span class="px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/20 text-[10px] font-mono">Meta Ads Manager</span>
                <span class="px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/20 text-[10px] font-mono">Google Ads (PPC)</span>
                <span class="px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/20 text-[10px] font-mono">Conversion Rate Optimization (CRO)</span>
                <span class="px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/20 text-[10px] font-mono">Sales Funnels & Lead Gen</span>
                <span class="px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/20 text-[10px] font-mono">Automated CRM Workflows</span>
              </div>
            </div>

            <div>
              <span class="text-slate-400 text-[10px] uppercase font-mono block mb-1">AI Engineering & Software Development:</span>
              <div class="flex flex-wrap gap-1.5">
                <span class="px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/20 text-[10px] font-mono">Prompt Engineering</span>
                <span class="px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/20 text-[10px] font-mono">OpenAI & Claude API Workflows</span>
                <span class="px-2 py-0.5 rounded bg-white/10 text-white border border-white/15 text-[10px] font-mono">JavaScript (ES6+)</span>
                <span class="px-2 py-0.5 rounded bg-white/10 text-white border border-white/15 text-[10px] font-mono">Java (OOP)</span>
                <span class="px-2 py-0.5 rounded bg-white/10 text-white border border-white/15 text-[10px] font-mono">HTML5 / CSS3 / Tailwind</span>
                <span class="px-2 py-0.5 rounded bg-white/10 text-white border border-white/15 text-[10px] font-mono">Git & GitHub (18+ Repos)</span>
              </div>
            </div>

            <div>
              <span class="text-slate-400 text-[10px] uppercase font-mono block mb-1">Clinical Healthcare & Productivity:</span>
              <div class="flex flex-wrap gap-1.5">
                <span class="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/20 text-[10px] font-mono">Vital Signs Monitoring</span>
                <span class="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/20 text-[10px] font-mono">Elderly & Inpatient Care</span>
                <span class="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/20 text-[10px] font-mono">Advanced MS Excel</span>
                <span class="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/20 text-[10px] font-mono">Cyber Threat Awareness</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Action CTA Banner -->
        <div class="p-4 rounded-xl bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <strong class="text-white text-xs block">Need the Official A4 PDF Document?</strong>
            <span class="text-[11px] text-slate-300">Click below to open the print dialog and download as high-resolution PDF.</span>
          </div>
          <button type="button" onclick="window.printExecutiveCvPdf()" class="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-navy-950 font-bold text-xs flex items-center gap-2 shadow-lg cursor-pointer flex-shrink-0">
            <i class="fas fa-file-pdf"></i>
            <span>Print / Save PDF Now</span>
          </button>
        </div>

      </div>
    `;

    window.openPortfolioModal(titleHtml, bodyHtml);
  });
}

/* ===================================================================
   20. Luxury UI Audio Feedback Engine (Web Audio API Synthesizer)
   =================================================================== */
function initAudioEngine() {
  let audioEnabled = localStorage.getItem('tawhid-ui-audio') !== 'false';
  let audioCtx = null;

  const soundBtn = document.getElementById('sound-toggle-btn');
  const soundIcon = document.getElementById('sound-icon');

  function updateIcon() {
    if (!soundIcon) return;
    if (audioEnabled) {
      soundIcon.className = 'fas fa-volume-up text-sm text-amber-400';
    } else {
      soundIcon.className = 'fas fa-volume-mute text-sm text-slate-500';
    }
  }

  updateIcon();

  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      audioEnabled = !audioEnabled;
      localStorage.setItem('tawhid-ui-audio', audioEnabled);
      updateIcon();
      if (audioEnabled) {
        playTone(600, 0.05, 'triangle');
        if (typeof showToast === 'function') showToast('UI Audio effects enabled.', 'info');
      } else {
        if (typeof showToast === 'function') showToast('UI Audio muted.', 'info');
      }
    });
  }

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) audioCtx = new AudioContextClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playTone(freq = 520, duration = 0.04, type = 'sine') {
    if (!audioEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.035, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio context silently ignored if restricted by browser policy
    }
  }

  window.playUiAudio = function(type = 'click') {
    if (type === 'click') playTone(580, 0.035, 'triangle');
    else if (type === 'pop') playTone(780, 0.05, 'sine');
    else if (type === 'modal') playTone(440, 0.06, 'sine');
  };

  // Wire up gentle audio click on all interactive buttons
  document.addEventListener('click', (e) => {
    if (e.target.closest('button, .btn-primary, .btn-secondary, .btn-emerald, .ai-chip')) {
      window.playUiAudio('click');
    }
  });
}

/* ===================================================================
   21. Command Palette / Spotlight Quick Search (Ctrl + K)
   =================================================================== */
function initCommandPalette() {
  const modal = document.getElementById('command-palette-modal');
  const input = document.getElementById('cmd-palette-input');
  const list = document.getElementById('cmd-palette-list');
  const triggerBtn = document.getElementById('command-palette-btn');
  const mobileTriggerBtn = document.getElementById('command-palette-mobile-btn');
  const filterChips = document.querySelectorAll('.cmd-filter-chip');

  if (!modal || !input || !list) return;

  let activeFilter = 'all';
  let selectedIndex = 0;

  // Search Items Index
  const items = [
    // Actions
    { type: 'action', title: 'View & Download Official CV (PDF)', desc: 'Open formatted credentials & print/save PDF', icon: 'fas fa-file-invoice text-amber-400', action: () => document.getElementById('download-cv-btn')?.click() },
    { type: 'action', title: 'Read Sample: The Karpathy Mindset (Chapter 1)', desc: 'Instant in-browser sample chapter e-reader', icon: 'fas fa-book-reader text-amber-400', action: () => window.openBookSampleReader('The Karpathy Mindset', 'Google Play Books', 'https://play.google.com/store/search?q=The+Karpathy+Mindset&c=books') },
    { type: 'action', title: 'Ask Tawhid AI Copilot', desc: 'Chat with virtual twin about books, skills & hiring', icon: 'fas fa-robot text-emerald-400', action: () => document.getElementById('ai-chat-toggle-btn')?.click() },
    { type: 'action', title: 'Inquire: Educational & IELTS Marketing Strategy', desc: 'Discuss student acquisition funnels & Meta Ads on WhatsApp', icon: 'fas fa-chart-line text-amber-400', action: () => window.open('https://wa.me/8801711729858?text=Hi%20Tawhid,%20I%20am%20interested%20in%20discussing%20an%20Educational%20/%20IELTS%20Marketing%20Strategy.', '_blank') },
    { type: 'action', title: 'Inquire: AI-Native Web App Development', desc: 'Discuss custom web apps, portals & UI/UX engineering on WhatsApp', icon: 'fas fa-laptop-code text-cyan-400', action: () => window.open('https://wa.me/8801711729858?text=Hi%20Tawhid,%20I%20have%20a%20Web%20Application%20or%20Software%20Project%20I%20would%20like%20you%20to%20build.', '_blank') },
    { type: 'action', title: 'Chat Directly on WhatsApp', desc: '+880 1711-729858 (Instant messaging)', icon: 'fab fa-whatsapp text-emerald-400', action: () => window.open('https://wa.me/8801711729858', '_blank') },
    { type: 'action', title: 'Send Direct Email (Gmail)', desc: 'tawhidh2005@gmail.com', icon: 'fas fa-envelope text-red-400', action: () => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=tawhidh2005@gmail.com', '_blank') },
    { type: 'action', title: 'Toggle Dark / Light Theme', desc: 'Switch visual interface mode', icon: 'fas fa-adjust text-amber-300', action: () => document.getElementById('theme-toggle-btn')?.click() },
    { type: 'action', title: 'Toggle UI Sound Effects', desc: 'Mute / unmute audio feedback', icon: 'fas fa-volume-up text-cyan-400', action: () => document.getElementById('sound-toggle-btn')?.click() },

    // Books
    { type: 'book', title: 'The Karpathy Mindset: Scaling AI Ventures', desc: 'Top Seller • $4.99 on Google Play Books', icon: 'fas fa-crown text-amber-400', action: () => window.location.hash = '#publications' },
    { type: 'book', title: 'Masters of Sales: Strategies & Stories', desc: 'Rakuten Kobo Best Seller • Sales Mastery', icon: 'fas fa-book text-rose-400', action: () => window.location.hash = '#publications' },
    { type: 'book', title: 'Deep Learning Foundations: Neural Networks', desc: 'AI Architecture & Machine Learning', icon: 'fas fa-brain text-purple-400', action: () => window.location.hash = '#all-books' },
    { type: 'book', title: 'Full-Stack Development with Modern JS', desc: 'JavaScript, Web Engines & Architecture', icon: 'fab fa-js text-yellow-400', action: () => window.location.hash = '#all-books' },
    { type: 'book', title: 'Prompt Engineering Masterclass', desc: 'Advanced LLM Steerability & Reasoning', icon: 'fas fa-magic text-cyan-400', action: () => window.location.hash = '#all-books' },
    { type: 'book', title: 'Browse All 20+ Authored Books', desc: 'Google Play & Amazon KDP Published Titles', icon: 'fas fa-book-open text-amber-300', action: () => window.location.hash = '#all-books' },

    // Projects
    { type: 'project', title: 'RentFlow — Equipment & Car Rental Booking Engine', desc: 'TypeScript, Tailwind CSS, Component Architecture', icon: 'fas fa-car text-cyan-400', action: () => window.location.hash = '#projects' },
    { type: 'project', title: 'SpecialtyCare — Healthcare Specialist Registry', desc: 'Clinical Doctor Search & Booking Portal', icon: 'fas fa-user-md text-emerald-400', action: () => window.location.hash = '#projects' },
    { type: 'project', title: 'SSIA Jalalpur Micro-Credit Finance Portal', desc: 'Financial Ledger & Community Accounting', icon: 'fas fa-hand-holding-usd text-amber-400', action: () => window.location.hash = '#projects' },
    { type: 'project', title: 'CyberShield — Threat Intelligence Quiz', desc: 'Interactive Cyber Awareness Game', icon: 'fas fa-shield-alt text-red-400', action: () => window.location.hash = '#projects' },
    { type: 'project', title: 'Explore 11+ Projects on GitHub', desc: 'Open Source Software & Tools Repositories', icon: 'fab fa-github text-slate-300', action: () => window.open('https://github.com/tawhid2005?tab=repositories', '_blank') },

    // Sections
    { type: 'section', title: 'Hero & Identity', desc: 'Md Talha Hussain Tawhid • AI Developer & Author', icon: 'fas fa-home text-amber-400', action: () => window.location.hash = '#hero' },
    { type: 'section', title: 'Experience & British Council Awards', desc: '2x Top Performer Award (2024-25 & 2025-26)', icon: 'fas fa-award text-amber-400', action: () => window.location.hash = '#experience' },
    { type: 'section', title: 'Clinical Caregiving Competency', desc: 'BTEB NTVQF Level-II Healthcare Certification', icon: 'fas fa-heartbeat text-rose-400', action: () => window.location.hash = '#caregiving' },
    { type: 'section', title: 'IT & Office Automation Diploma', desc: '360-Hour Certified Technical Diploma', icon: 'fas fa-laptop-code text-cyan-400', action: () => window.location.hash = '#it-diploma' },
    { type: 'section', title: 'Publications (20+ Books)', desc: 'Google Play & Amazon KDP Published Titles', icon: 'fas fa-book-open text-amber-300', action: () => window.location.hash = '#publications' },
    { type: 'section', title: 'Featured Projects & Repositories', desc: 'Interactive web applications & software tools', icon: 'fas fa-code text-cyan-400', action: () => window.location.hash = '#projects' },
    { type: 'section', title: 'Education & Credentials', desc: 'Academic background & institutional certificates', icon: 'fas fa-graduation-cap text-amber-400', action: () => window.location.hash = '#education' },
    { type: 'section', title: 'Executive Endorsements & Reviews', desc: 'Leadership, Readers & Partner Testimonials', icon: 'fas fa-star text-amber-400', action: () => window.location.hash = '#testimonials' },
    { type: 'section', title: 'Executive Services & Client Solutions', desc: 'Educational marketing, AI software builds, publishing & healthcare', icon: 'fas fa-briefcase text-amber-400', action: () => window.location.hash = '#services' },
    { type: 'section', title: 'Contact Form (WhatsApp / Gmail)', desc: 'Dual Message Dispatch System', icon: 'fas fa-paper-plane text-emerald-400', action: () => window.location.hash = '#contact' }
  ];

  function openPalette() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    input.value = '';
    selectedIndex = 0;
    renderList();
    setTimeout(() => input.focus(), 80);
    if (window.playUiAudio) window.playUiAudio('modal');
  }

  function closePalette() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (triggerBtn) triggerBtn.addEventListener('click', openPalette);
  if (mobileTriggerBtn) mobileTriggerBtn.addEventListener('click', openPalette);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closePalette();
  });

  // Global Ctrl + K / Cmd + K Shortcut
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (modal.classList.contains('active')) {
        closePalette();
      } else {
        openPalette();
      }
    } else if (e.key === 'Escape' && modal.classList.contains('active')) {
      closePalette();
    }
  });

  // Category filter chips
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => {
        c.classList.remove('bg-amber-500/20', 'text-amber-300', 'font-semibold');
        c.classList.add('bg-white/5', 'text-slate-300');
      });
      chip.classList.add('bg-amber-500/20', 'text-amber-300', 'font-semibold');
      chip.classList.remove('bg-white/5', 'text-slate-300');

      activeFilter = chip.getAttribute('data-filter') || 'all';
      selectedIndex = 0;
      renderList();
    });
  });

  // Render items matching query and filter
  function renderList() {
    const q = input.value.toLowerCase().trim();
    const filtered = items.filter(item => {
      const matchesFilter = (activeFilter === 'all') || (item.type === activeFilter);
      const matchesQuery = !q || item.title.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });

    if (!filtered.length) {
      list.innerHTML = `
        <div class="py-8 text-center text-slate-400">
          <i class="fas fa-search-minus text-2xl text-slate-500 mb-2"></i>
          <p class="text-xs">No matching commands or titles found for "${escapeHtml(input.value)}".</p>
          <p class="text-[11px] text-slate-500 mt-1">Try searching "Karpathy", "CV", "RentFlow", "WhatsApp", or "Awards".</p>
        </div>
      `;
      return;
    }

    list.innerHTML = filtered.map((item, idx) => `
      <div class="cmd-item ${idx === selectedIndex ? 'selected' : ''}" data-index="${idx}">
        <div class="flex items-center gap-3 truncate">
          <div class="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-xs flex-shrink-0">
            <i class="${item.icon}"></i>
          </div>
          <div class="truncate">
            <div class="font-bold text-white text-xs truncate">${escapeHtml(item.title)}</div>
            <div class="text-[11px] text-slate-400 truncate">${escapeHtml(item.desc)}</div>
          </div>
        </div>
        <span class="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-white/5 text-slate-400 flex-shrink-0 ml-2">
          ${item.type}
        </span>
      </div>
    `).join('');

    // Bind item clicks
    const renderedItems = list.querySelectorAll('.cmd-item');
    renderedItems.forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.getAttribute('data-index'), 10);
        if (filtered[idx] && typeof filtered[idx].action === 'function') {
          closePalette();
          filtered[idx].action();
        }
      });
    });
  }

  // Keyboard navigation within palette
  input.addEventListener('input', () => {
    selectedIndex = 0;
    renderList();
  });

  input.addEventListener('keydown', (e) => {
    const renderedItems = list.querySelectorAll('.cmd-item');
    if (!renderedItems.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = (selectedIndex + 1) % renderedItems.length;
      updateSelectedVisual();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = (selectedIndex - 1 + renderedItems.length) % renderedItems.length;
      updateSelectedVisual();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const currentSelected = renderedItems[selectedIndex];
      if (currentSelected) currentSelected.click();
    }
  });

  function updateSelectedVisual() {
    const renderedItems = list.querySelectorAll('.cmd-item');
    renderedItems.forEach((el, idx) => {
      if (idx === selectedIndex) {
        el.classList.add('selected');
        el.scrollIntoView({ block: 'nearest' });
      } else {
        el.classList.remove('selected');
      }
    });
  }
}

/* ===================================================================
   22. Real-Time Sylhet Timezone Clock & Availability Status
   =================================================================== */
function initLiveSylhetClock() {
  const clockEl = document.getElementById('sylhet-live-time');
  if (!clockEl) return;

  function updateClock() {
    try {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Dhaka',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      clockEl.textContent = new Intl.DateTimeFormat('en-US', options).format(now);
    } catch (e) {
      const d = new Date();
      const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
      const bdDate = new Date(utc + (3600000 * 6));
      clockEl.textContent = bdDate.toLocaleTimeString();
    }
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* ===================================================================
   23. Mobile Quick Floating Dock
   =================================================================== */
function initMobileDock() {
  const dock = document.getElementById('mobile-quick-dock');
  const aiBtn = document.getElementById('mobile-dock-ai-btn');
  const searchBtn = document.getElementById('mobile-dock-search-btn');
  const cvBtn = document.getElementById('mobile-dock-cv-btn');
  const topBtn = document.getElementById('mobile-dock-top-btn');

  if (aiBtn) {
    aiBtn.addEventListener('click', () => {
      const chatWindow = document.getElementById('tawhid-ai-chat-window');
      if (chatWindow) {
        chatWindow.classList.toggle('active');
        if (chatWindow.classList.contains('active')) {
          const chatInput = document.getElementById('ai-chat-input');
          if (chatInput) setTimeout(() => chatInput.focus(), 300);
        }
      } else {
        document.getElementById('ai-chat-toggle-btn')?.click();
      }
      if (window.playUiAudio) window.playUiAudio('click');
    });
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const searchTrigger = document.getElementById('command-palette-mobile-btn') || document.getElementById('command-palette-btn');
      if (searchTrigger) searchTrigger.click();
    });
  }

  if (cvBtn) {
    cvBtn.addEventListener('click', () => {
      document.getElementById('download-cv-btn')?.click();
    });
  }

  if (topBtn) {
    topBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (window.playUiAudio) window.playUiAudio('click');
    });
  }

  // Smooth auto-hide when scrolling down, re-appear when scrolling up
  if (dock) {
    let lastScroll = window.pageYOffset;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 350 && currentScroll > lastScroll + 15) {
        dock.style.transform = 'translateY(130%)';
        dock.style.transition = 'transform 0.3s ease';
      } else {
        dock.style.transform = 'translateY(0)';
      }
      lastScroll = currentScroll;
    }, { passive: true });
  }
}





// Global Image Error Resilience & Mobile Smoothing
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
      console.warn('Image recovery triggered for:', this.src);
      this.classList.add('opacity-90');
      // If src has search query or params, retry clean path
      if (this.src.includes('?')) {
        this.src = this.src.split('?')[0];
      }
    });
  });
});
