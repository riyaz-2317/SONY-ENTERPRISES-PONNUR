// ============================================
//   SONY ENTERPRISES — CINEMATIC JS
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- NAVBAR SCROLL ----
  const navbar = document.querySelector('.navbar');
  const scrollTopBtn = document.querySelector('.scroll-top');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    navbar?.classList.toggle('scrolled', y > 60);
    scrollTopBtn?.classList.toggle('visible', y > 400);
  });

  scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---- HAMBURGER MENU ----
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav?.classList.toggle('open');
  });

  document.querySelectorAll('.mobile-nav a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger?.classList.remove('open');
      mobileNav?.classList.remove('open');
    });
  });

  // ---- ACTIVE NAV LINK (on-page) ----
  const sections = document.querySelectorAll('[data-section]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"], .mobile-nav a[href^="#"]');

  const setActiveLink = () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) {
        current = sec.getAttribute('data-section');
      }
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  };

  window.addEventListener('scroll', setActiveLink);

  // ---- SCROLL REVEAL ----
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, parseInt(delay));
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal, .product-card, .gallery-item, .whyus-card').forEach(el => {
    revealObserver.observe(el);
  });

  // ---- STAGGERED PRODUCT CARDS ----
  document.querySelectorAll('.product-card').forEach((card, i) => {
    card.dataset.delay = i * 60;
  });

  document.querySelectorAll('.gallery-item').forEach((item, i) => {
    item.dataset.delay = i * 80;
  });

  document.querySelectorAll('.whyus-card').forEach((card, i) => {
    card.dataset.delay = i * 120;
  });

  // ---- PARTICLE SYSTEM ----
  const particleContainer = document.querySelector('.hero-particles');
  if (particleContainer) {
    for (let i = 0; i < 24; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.cssText = `
        left: ${Math.random() * 100}%;
        top: ${40 + Math.random() * 50}%;
        --dur: ${6 + Math.random() * 8}s;
        --delay: ${Math.random() * 6}s;
        width: ${1 + Math.random() * 2}px;
        height: ${1 + Math.random() * 2}px;
        opacity: 0;
      `;
      particleContainer.appendChild(p);
    }
  }

  // ---- PRODUCT FILTER ----
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;

      productCards.forEach((card, i) => {
        const cardCat = card.dataset.category;
        const show = cat === 'all' || cardCat === cat;

        card.style.transition = 'opacity 0.3s, transform 0.3s';
        if (show) {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, i * 40 + 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });

  // ---- LIGHTBOX ----
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = lightbox?.querySelector('img');
  const lightboxClose = lightbox?.querySelector('.lightbox-close');

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const src = item.querySelector('img')?.src;
      if (lightboxImg) lightboxImg.src = src;
      lightbox?.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLightbox = () => {
    lightbox?.classList.remove('open');
    document.body.style.overflow = '';
  };

  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // ---- CONTACT FORM (WhatsApp / SMS) ----
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.querySelector('.form-success');

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn-primary');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<span>Sending…</span>';
    btn.disabled = true;

    // Read form values
    const name = document.getElementById('contactName')?.value.trim() || '';
    const phone = document.getElementById('contactPhone')?.value.trim() || '';
    const product = document.getElementById('contactProduct')?.value.trim() || '';
    const productImage = document.getElementById('contactProductImage')?.value.trim() || '';
    const message = document.getElementById('contactMessage')?.value.trim() || '';
    // Build message
    let body = `Hi Sony Enterprises! 👋\n\n`;
    if (name) body += `My name is ${name}\n`;
    if (phone) body += `Phone: ${phone}\n\n`;
    if (product) body += `Product: ${product}\n`;
    if (productImage) body += `Product image: ${productImage}\n\n`;
    if (message) body += `Message: ${message}\n\n`;
    body += `Please send me price, availability, and your best offer.`;

    const whatsappNumber = '919059380340';
    const encoded = encodeURIComponent(body);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encoded}`;

    // Scroll to contact form and show animated success
    const contactSection = document.getElementById('contact') || document.querySelector('.contact-form');
    if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    if (formSuccess) formSuccess.classList.add('visible');

    // After a short delay (allow scroll/animation), reset and open WhatsApp
    setTimeout(() => {
      contactForm.reset();
      btn.innerHTML = originalHTML;
      btn.disabled = false;

      try {
        window.open(whatsappURL, '_blank');
      } catch (err) {
        window.open(whatsappURL, '_blank');
      }

      if (formSuccess) {
        setTimeout(() => { formSuccess.classList.remove('visible'); }, 4000);
      }
    }, 1100);
  });

  // ---- SMOOTH ANCHOR SCROLL ----
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.offsetTop - 72;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---- TYPEWRITER EFFECT (hero subtitle) ----
  const typeEl = document.querySelector('.hero-type');
  if (typeEl) {
    const words = ['Trusted by 25+ clients. Built with quality, delivered with trust. for 25+ Years', 'Quality Guaranteed', 'Your Local Expert', 'Serving Ponnur'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const type = () => {
      const word = words[wordIndex];
      if (isDeleting) {
        typeEl.textContent = word.slice(0, charIndex--);
      } else {
        typeEl.textContent = word.slice(0, charIndex++);
      }

      let delay = isDeleting ? 60 : 100;

      if (!isDeleting && charIndex > word.length) {
        isDeleting = true;
        delay = 1800;
      } else if (isDeleting && charIndex < 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 300;
      }
      setTimeout(type, delay);
    };
    setTimeout(type, 2000);
  }

  // ---- NUMBER COUNTER ANIMATION ----
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      let current = 0;
      const step = target / 60;
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = Math.floor(current) + suffix;
        if (current >= target) clearInterval(timer);
      }, 20);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-target]').forEach(el => {
    counterObserver.observe(el);
  });

});

// ---- GALLERY TABS ----
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.gtab');
  const contents = document.querySelectorAll('.gallery-tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.tab;
      const content = document.querySelector(`.gallery-tab-content[data-content="${target}"]`);
      content?.classList.add('active');

      // Re-trigger reveal for items in new tab
      setTimeout(() => {
        content?.querySelectorAll('.gallery-item').forEach((item, i) => {
          item.style.opacity = '0';
          item.style.transform = 'translateY(16px)';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, i * 50);
        });
        content?.querySelectorAll('.reveal').forEach(el => {
          el.classList.add('visible');
        });
      }, 50);
    });
  });

  // Initial reveal of active tab gallery items
  const initGallery = () => {
    document.querySelectorAll('.gallery-tab-content.active .gallery-item').forEach((item, i) => {
      setTimeout(() => {
        item.classList.add('visible');
      }, i * 60);
    });
  };

  // Use IntersectionObserver to trigger on scroll
  const gallerySection = document.querySelector('.gallery-section');
  if (gallerySection) {
    const galObs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        initGallery();
        galObs.disconnect();
      }
    }, { threshold: 0.1 });
    galObs.observe(gallerySection);
  }
});

// ---- PRODUCT MODAL FUNCTIONALITY ----
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('productModal');
  const modalClose = document.querySelector('.modal-close');
  const productCards = document.querySelectorAll('.product-card');

  // Open modal when product card is clicked
  productCards.forEach(card => {
    card.addEventListener('click', () => {
      const productName = card.dataset.productName;
      const productCat = card.dataset.productCat;
      const productDesc = card.dataset.productDesc;
      const productFeatures = card.dataset.productFeatures;
      const imgEl = card.querySelector('.product-img-wrap img');
      let productImage = imgEl?.getAttribute('src') || '';
      if (productImage && !productImage.match(/^[a-zA-Z][a-zA-Z\d+.-]*:\/\//)) {
        productImage = new URL(productImage, window.location.href).href;
      }

      // Populate modal
      document.getElementById('modalCategory').textContent = productCat;
      document.getElementById('modalTitle').textContent = productName;
      document.getElementById('modalDescription').textContent = productDesc;
      document.getElementById('modalProductImage').src = productImage;
      document.getElementById('modalProductImage').alt = productName;

      // Parse and display features
      const featuresList = document.getElementById('modalFeatures');
      featuresList.innerHTML = '';
      if (productFeatures) {
        productFeatures.split('|').forEach(feature => {
          const li = document.createElement('li');
          li.textContent = feature.trim();
          featuresList.appendChild(li);
        });
      }

      // Set inquiry button to go to contact and populate the form
      const contactProductInput = document.getElementById('contactProduct');
      const contactProductImageInput = document.getElementById('contactProductImage');
      contactProductInput.value = productName;
      contactProductImageInput.value = productImage;

      const inquireBtn = document.getElementById('inquireBtn');
      inquireBtn.replaceWith(inquireBtn.cloneNode(true));
      const newInquireBtn = document.getElementById('inquireBtn');
      newInquireBtn.addEventListener('click', (event) => {
        event.preventDefault();
        modal.classList.remove('open');
        document.body.style.overflow = '';
        setTimeout(() => {
          document.getElementById('contact').scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 250);
      });

      const whatsappProductBtn = document.getElementById('whatsappProductBtn');
      whatsappProductBtn.replaceWith(whatsappProductBtn.cloneNode(true));
      const newWhatsappProductBtn = document.getElementById('whatsappProductBtn');
      newWhatsappProductBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const whatsappNumber = '919059380340';
        const body = encodeURIComponent(`Hi Sony Enterprises! 👋\n\nI am interested in the product: ${productName}\nCategory: ${productCat}\n\nProduct details: ${productDesc}\n\nProduct image: ${productImage}\n\nPlease send me the price and availability.`);
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${body}`;
        window.open(whatsappURL, '_blank');
      });

      // Show modal
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modal
  modalClose?.addEventListener('click', () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  });

  // Close modal when clicking outside
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
});
