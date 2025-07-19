// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Text animation for the hero section
const phrases = [
  "transform ideas into digital reality",
  "build responsive and accessible websites",
  "create engaging user experiences",
  "craft beautiful and functional web interfaces",
];

let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingSpeed = 100;
const pauseTime = 1000;

function typeText() {
  const currentPhrase = phrases[currentPhraseIndex];
  const animatedText = document.getElementById("animated-text");

  if (isDeleting) {
    // Deleting text
    animatedText.textContent = currentPhrase.substring(0, currentCharIndex - 1);
    currentCharIndex--;
    typingSpeed = 50; // Faster when deleting
  } else {
    // Typing text
    animatedText.textContent = currentPhrase.substring(0, currentCharIndex + 1);
    currentCharIndex++;
    typingSpeed = 100; // Normal speed when typing
  }

  // Check if word is complete
  if (!isDeleting && currentCharIndex === currentPhrase.length) {
    // Pause at the end of typing
    isDeleting = true;
    typingSpeed = pauseTime;
  } else if (isDeleting && currentCharIndex === 0) {
    // Move to next phrase after deleting
    isDeleting = false;
    currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
  }

  setTimeout(typeText, typingSpeed);
}

// Start the typing animation
window.addEventListener("load", typeText);

// Theme toggle
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector("i");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  // Update SVG visibility based on theme
  updateSvgForTheme();

  if (document.body.classList.contains("light-mode")) {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  } else {
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
  }
});

// Function to update SVG for current theme
function updateSvgForTheme() {
  const isLightMode = document.body.classList.contains("light-mode");
  const svgRect = document.querySelector(".profile-svg rect:first-of-type");

  if (svgRect) {
    svgRect.setAttribute("fill", isLightMode ? "#e2e8f0" : "#1e293b");
  }
}

// Mobile menu
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");
const menuIcon = mobileMenuBtn.querySelector("i");
const mobileMenuOverlay = document.getElementById("mobile-menu-overlay");

// Function to open mobile menu
function openMobileMenu() {
  navLinks.classList.add("active");
  menuIcon.classList.remove("fa-bars");
  menuIcon.classList.add("fa-times");
  mobileMenuOverlay.classList.add("active");
  document.body.style.overflow = "hidden"; // Prevent scrolling when menu is open
}

// Function to close mobile menu
function closeMobileMenu() {
  navLinks.classList.remove("active");
  menuIcon.classList.remove("fa-times");
  menuIcon.classList.add("fa-bars");
  mobileMenuOverlay.classList.remove("active");
  document.body.style.overflow = ""; // Re-enable scrolling
}

// Toggle mobile menu when hamburger button is clicked
mobileMenuBtn.addEventListener("click", () => {
  if (navLinks.classList.contains("active")) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
});

// Close mobile menu when clicking on the overlay
mobileMenuOverlay.addEventListener("click", closeMobileMenu);

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

// Header scroll effect
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Scroll to top button
const scrollTopBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add("active");
  } else {
    scrollTopBtn.classList.remove("active");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Contact form submission
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // In a real scenario, you would send this data to a server
  console.log("Form submitted:", { name, email, message });

  // Show success message (in a real scenario)
});

// GSAP Animations
// Hero section animations
gsap.to(".hero-subtitle", {
  opacity: 1,
  y: 0,
  duration: 0.8,
  delay: 0.2,
});

gsap.to(".hero-title", {
  opacity: 1,
  y: 0,
  duration: 0.8,
  delay: 0.4,
});

gsap.to(".hero-description", {
  opacity: 1,
  y: 0,
  duration: 0.8,
  delay: 0.6,
});

gsap.to(".hero-cta", {
  opacity: 1,
  y: 0,
  duration: 0.8,
  delay: 0.8,
});

// Parallax effect
document.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;

  gsap.to(".shape1", {
    x: mouseX * 50,
    y: mouseY * 50,
    duration: 1,
  });

  gsap.to(".shape2", {
    x: -mouseX * 50,
    y: -mouseY * 50,
    duration: 1,
  });

  gsap.to(".shape3", {
    x: mouseX * 30,
    y: mouseY * 30,
    duration: 1,
  });
});

// Scroll animations
const fadeElements = document.querySelectorAll(".fade-in");

fadeElements.forEach((element) => {
  gsap.fromTo(
    element,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleClass: "active",
      },
    }
  );
});

// Skill progress bars animation
const progressBars = document.querySelectorAll(".progress-bar");

progressBars.forEach((bar) => {
  const width = bar.getAttribute("data-width");

  gsap.fromTo(
    bar,
    { width: "0%" },
    {
      width: width,
      duration: 0.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: bar,
        start: "top 90%",
      },
    }
  );
});

// Project cards animation
const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card, index) => {
  gsap.fromTo(
    card,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: index * 0.2,
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
      },
    }
  );
});

// Run on page load
window.addEventListener("load", () => {
  // Ensure SVG is visible
  updateSvgForTheme();
});

(function () {
  function c() {
    var b = a.contentDocument || a.contentWindow.document;
    if (b) {
      var d = b.createElement("script");
      d.innerHTML =
        "window.__CF$cv$params={r:'961810cd31012df9',t:'MTc1MjkwNTUzMS4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";
      b.getElementsByTagName("head")[0].appendChild(d);
    }
  }
  if (document.body) {
    var a = document.createElement("iframe");
    a.height = 1;
    a.width = 1;
    a.style.position = "absolute";
    a.style.top = 0;
    a.style.left = 0;
    a.style.border = "none";
    a.style.visibility = "hidden";
    document.body.appendChild(a);
    if ("loading" !== document.readyState) c();
    else if (window.addEventListener)
      document.addEventListener("DOMContentLoaded", c);
    else {
      var e = document.onreadystatechange || function () {};
      document.onreadystatechange = function (b) {
        e(b);
        "loading" !== document.readyState &&
          ((document.onreadystatechange = e), c());
      };
    }
  }
})();

// EmailJS
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Mencegah reload halaman

  emailjs.sendForm("service_6j826wr", "template_3hczup8", this).then(
    function () {
      alert("Thank you for your message! I will get back to you soon.");
      document.getElementById("contactForm").reset();
    },
    function (error) {
      alert("Failed to send message, please try again.");
      console.error("EmailJS error:", error);
    }
  );
});
