/**
 * Rajdeep Singh Kelwa Portfolio JS
 * Responsive Navigation, Theme Toggle, ScrollSpy, and Fallback Image Controllers
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Theme Management ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme') || 'light';

  // Apply initial theme state
  document.documentElement.setAttribute('data-theme', currentTheme);

  themeToggleBtn.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    let targetTheme = 'light';

    if (activeTheme === 'light') {
      targetTheme = 'dark';
    }

    document.documentElement.setAttribute('data-theme', targetTheme);
    localStorage.setItem('theme', targetTheme);
  });

  // --- 2. Mobile Hamburger Navigation ---
  const menuToggleBtn = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  const toggleMobileMenu = () => {
    const isExpanded = menuToggleBtn.getAttribute('aria-expanded') === 'true';
    menuToggleBtn.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('active');
  };

  menuToggleBtn.addEventListener('click', toggleMobileMenu);

  // Close menu when a navigation link is clicked (crucial for mobile experience)
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggleBtn.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('active');
    });
  });

  // Close menu if clicking outside of the navbar area entirely
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.navbar')) {
      menuToggleBtn.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('active');
    }
  });

  // --- 3. ScrollSpy & Active Link Indicator ---
  const sections = document.querySelectorAll('section[id]');
  
  const scrollSpy = () => {
    const scrollPosition = window.scrollY + 120; // Offset for header + safety buffer

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (targetNavLink) {
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          navLinks.forEach(link => link.classList.remove('active'));
          targetNavLink.classList.add('active');
        }
      }
    });

    // Special edge case: If at the very bottom, make Contact active
    if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 20) {
      const contactLink = document.querySelector('.nav-link[href="#contact"]');
      if (contactLink) {
        navLinks.forEach(link => link.classList.remove('active'));
        contactLink.classList.add('active');
      }
    }
  };

  window.addEventListener('scroll', scrollSpy);
  scrollSpy(); // Initial call on page load

  // --- 4. Graceful Image Placeholder Fallback ---
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    // Add event handler in case image fails to load
    img.addEventListener('error', () => {
      const isProfile = img.classList.contains('profile-img');
      const parent = img.parentElement;
      
      if (!parent) return;

      if (isProfile) {
        // Create professional profile fallback
        const fallbackDiv = document.createElement('div');
        fallbackDiv.className = 'profile-placeholder';
        fallbackDiv.id = 'profile-fallback';
        fallbackDiv.innerHTML = 'RSK';
        
        parent.replaceChild(fallbackDiv, img);
      } else {
        // Create professional project fallback
        const fallbackDiv = document.createElement('div');
        fallbackDiv.className = 'project-placeholder-fallback';
        fallbackDiv.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-code-xml"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>
          <span>Project Image</span>
        `;
        
        parent.replaceChild(fallbackDiv, img);
      }
    });

    // If image was already cached and failed before listener was attached, trigger error manually
    if (img.complete && img.naturalWidth === 0) {
      img.dispatchEvent(new Event('error'));
    }
  });
});
