/* ============================================
   ResumeForge - Landing Page JavaScript
   Handles: navbar scroll, hamburger menu,
   active link tracking, scroll animations,
   and stat counter animation
   ============================================ */


// ========== GET DOM ELEMENTS ==========

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const allNavLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const statNumbers = document.querySelectorAll('.stat-number');


// ========== CREATE MOBILE OVERLAY ==========
// This is the dark overlay that appears behind the mobile menu

const overlay = document.createElement('div');
overlay.classList.add('nav-overlay');
document.body.appendChild(overlay);


// ========== NAVBAR SCROLL EFFECT ==========
// Add a solid background to navbar when user scrolls down

window.addEventListener('scroll', function () {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


// ========== HAMBURGER MENU TOGGLE ==========
// Opens/closes the mobile navigation menu

function toggleMenu() {
  // Toggle the 'open' class on nav links
  var isOpen = navLinks.classList.toggle('open');

  // Toggle the X animation on hamburger button
  hamburger.classList.toggle('active');

  // Toggle the dark overlay behind the menu
  overlay.classList.toggle('active');

  // Update accessibility attribute
  hamburger.setAttribute('aria-expanded', isOpen);

  // Prevent body scrolling when menu is open
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

// Click hamburger button to toggle menu
hamburger.addEventListener('click', toggleMenu);

// Click overlay to close menu
overlay.addEventListener('click', toggleMenu);

// Close menu when a nav link is clicked
allNavLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    if (navLinks.classList.contains('open')) {
      toggleMenu();
    }
  });
});


// ========== ACTIVE NAV LINK ON SCROLL ==========
// Highlights the nav link that matches the currently visible section

var sectionObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      var currentSectionId = entry.target.getAttribute('id');

      // Remove 'active' from all links, add to the matching one
      allNavLinks.forEach(function (link) {
        if (link.getAttribute('data-section') === currentSectionId) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  });
}, {
  root: null,
  rootMargin: '-40% 0px -60% 0px',  // trigger when section is near center
  threshold: 0
});

// Observe all sections
sections.forEach(function (section) {
  sectionObserver.observe(section);
});


// ========== SCROLL REVEAL ANIMATIONS ==========
// Elements with data-animate attribute fade in when they enter the viewport

var animateObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.15  // trigger when 15% of element is visible
});

// Find all elements that should animate and observe them
var animatedElements = document.querySelectorAll('[data-animate]');
animatedElements.forEach(function (el) {
  animateObserver.observe(el);
});


// ========== STAT COUNTER ANIMATION ==========
// Counts up the numbers in the hero stats section

var statsAnimated = false;  // track if we already animated

function animateCounters() {
  statNumbers.forEach(function (numberElement) {
    var targetValue = parseInt(numberElement.getAttribute('data-target'));
    var duration = 2000; // 2 seconds for the animation
    var startTime = performance.now();

    function updateCounter(currentTime) {
      var elapsed = currentTime - startTime;
      var progress = Math.min(elapsed / duration, 1);

      // Ease-out effect: starts fast, slows down at the end
      var easedProgress = 1 - Math.pow(1 - progress, 3);

      // Update the displayed number
      numberElement.textContent = Math.floor(easedProgress * targetValue);

      // Keep animating until we reach the target
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        numberElement.textContent = targetValue;
      }
    }

    requestAnimationFrame(updateCounter);
  });
}

// Only animate stats when they come into view
var statsContainer = document.querySelector('.hero-stats');

if (statsContainer) {
  var statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        animateCounters();
      }
    });
  }, {
    threshold: 0.5  // trigger when 50% visible
  });

  statsObserver.observe(statsContainer);
}


// ========== SMOOTH SCROLLING ==========
// Makes anchor links scroll smoothly instead of jumping

var anchorLinks = document.querySelectorAll('a[href^="#"]');

anchorLinks.forEach(function (anchor) {
  anchor.addEventListener('click', function (event) {
    event.preventDefault();

    var targetId = anchor.getAttribute('href');
    var targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});
