// GreenTravel Website JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS Animation Library
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    mirror: false,
  });

  // Mobile Menu Toggle
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("menu");

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
      // Toggle icon between bars and X
      const icon = menuToggle.querySelector("i");
      if (icon.classList.contains("fa-bars")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
        // Add menu opening animation
        mobileMenu.classList.add("mobile-menu-enter");
      } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
        // Remove animation when closing
        mobileMenu.classList.remove("mobile-menu-enter");
      }
    });
  }

  // Close mobile menu when clicking a nav link
  const mobileNavLinks = mobileMenu ? mobileMenu.querySelectorAll("a") : [];
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenu.classList.add("hidden");
      const icon = menuToggle.querySelector("i");
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    });
  });

  // Navigation active state based on scroll position
  function updateActiveNavLink() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    // Get current scroll position
    let scrollY = window.pageYOffset;

    // Go through each section to get height, top and ID
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        // For each link, remove the active class
        navLinks.forEach((link) => {
          link.classList.remove("active", "text-green-200");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active", "text-green-200");
          }
        });
      }
    });
  }

  // Add scroll event
  window.addEventListener("scroll", updateActiveNavLink);

  // Smooth Scrolling for all internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70, // Offset for fixed header
          behavior: "smooth",
        });
      }
    });
  });

  // Form validation
  const contactForm = document.querySelector("#contact form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Simple validation
      let valid = true;
      const inputs = contactForm.querySelectorAll("input, textarea, select");

      inputs.forEach((input) => {
        if (input.value.trim() === "" && input.tagName !== "SELECT") {
          valid = false;
          input.classList.add("border-red-500");
        } else if (input.tagName === "SELECT" && input.selectedIndex === 0) {
          valid = false;
          input.classList.add("border-red-500");
        } else {
          input.classList.remove("border-red-500");
        }
      });

      if (valid) {
        // Show success message
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Message Sent!';
        submitBtn.classList.remove("bg-green-600", "hover:bg-green-700");
        submitBtn.classList.add("bg-green-500");

        // Reset form
        setTimeout(() => {
          contactForm.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          submitBtn.classList.add("bg-green-600", "hover:bg-green-700");
          submitBtn.classList.remove("bg-green-500");
        }, 3000);
      }
    });

    // Remove error indicator when user starts typing
    contactForm
      .querySelectorAll("input, textarea, select")
      .forEach((element) => {
        element.addEventListener("input", function () {
          this.classList.remove("border-red-500");
        });
      });
  }

  // Newsletter form
  const newsletterForm = document.querySelector("section.bg-green-600 form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const emailInput = this.querySelector('input[type="email"]');
      const submitBtn = this.querySelector("button");

      if (emailInput.value.trim() === "" || !emailInput.value.includes("@")) {
        emailInput.classList.add("ring-2", "ring-red-400");
        return;
      }

      // Success state
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Subscribed!";
      emailInput.disabled = true;
      submitBtn.disabled = true;

      // Reset after delay
      setTimeout(() => {
        emailInput.value = "";
        emailInput.disabled = false;
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        emailInput.classList.remove("ring-2", "ring-red-400");
      }, 3000);
    });
  }

  // Sticky header behavior with scroll class
  const header = document.querySelector("header");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      header.classList.remove("header-gradient");
      header.classList.add("bg-green-700");
    } else {
      header.classList.add("header-gradient");
      header.classList.remove("bg-green-700");
    }
  });

  // Destination card hover effects
  const destinationCards = document.querySelectorAll(
    "#destinations .rounded-xl"
  );
  destinationCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.querySelector("img").classList.add("scale-110");
    });

    card.addEventListener("mouseleave", function () {
      this.querySelector("img").classList.remove("scale-110");
    });
  });

  // Add active state to current section in navigation
  window.addEventListener("scroll", highlightCurrentSection);
  highlightCurrentSection(); // Run once on load

  function highlightCurrentSection() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        document.querySelectorAll(".nav-link").forEach((link) => {
          link.classList.remove("text-green-200");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("text-green-200");
          }
        });
      }
    });
  }

  // Lazy loading for images outside initial viewport
  if ("loading" in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach((img) => {
      img.src = img.getAttribute("data-src");
    });
  } else {
    // Fallback for browsers that don't support native lazy loading
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";
    document.body.appendChild(script);
  }

  // Add back-to-top button
  const backToTopBtn = document.createElement("button");
  backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  backToTopBtn.className =
    "fixed bottom-5 right-5 bg-green-600 text-white p-3 shadow-lg opacity-0 transition-opacity duration-300 hover:bg-green-700";
  backToTopBtn.style.zIndex = "1000";
  backToTopBtn.id = "custom-backtotop";
  document.body.appendChild(backToTopBtn);
  

  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      backToTopBtn.style.opacity = "1";
    } else {
      backToTopBtn.style.opacity = "0";
    }
  });

  const track = document.querySelector(".carousel-track");
  const slides = document.querySelectorAll(".carousel-slide");
  const prevButton = document.querySelector(".carousel-prev");
  const nextButton = document.querySelector(".carousel-next");
  const indicatorContainer = document.querySelector(
    ".carousel-indicator"
  ).parentElement;

  let slideWidth = slides[0].getBoundingClientRect().width;
  let slideIndex = 0;
  let slidesPerView = getNumberOfVisibleSlides();
  let totalGroups = Math.ceil(slides.length / slidesPerView);

  // Initialize indicators
  initIndicators();

  // Handle window resize
  window.addEventListener("resize", () => {
    slideWidth = slides[0].getBoundingClientRect().width;
    const newSlidesPerView = getNumberOfVisibleSlides();

    // Only update if the number of visible slides has changed
    if (newSlidesPerView !== slidesPerView) {
      slidesPerView = newSlidesPerView;
      totalGroups = Math.ceil(slides.length / slidesPerView);

      // Re-initialize indicators with new count
      initIndicators();

      // Adjust current slide index if needed
      slideIndex = Math.min(slideIndex, totalGroups - 1);
      moveToSlide(slideIndex);
    } else {
      // Just update position based on current slide width
      moveToSlide(slideIndex);
    }
  });

  // Previous button click
  prevButton.addEventListener("click", () => {
    if (slideIndex > 0) {
      moveToSlide(slideIndex - 1);
    } else {
      // Loop to the end
      moveToSlide(totalGroups - 1);
    }
  });

  // Next button click
  nextButton.addEventListener("click", () => {
    if (slideIndex < totalGroups - 1) {
      moveToSlide(slideIndex + 1);
    } else {
      // Loop to the beginning
      moveToSlide(0);
    }
  });

  // Initialize indicators
  function initIndicators() {
    // Clear existing indicators
    indicatorContainer.innerHTML = "";

    // Create new indicators
    for (let i = 0; i < totalGroups; i++) {
      const indicator = document.createElement("div");
      indicator.classList.add("carousel-indicator");
      if (i === slideIndex) {
        indicator.classList.add("active");
      }
      indicator.setAttribute("data-index", i);

      // Add click event listener
      indicator.addEventListener("click", () => {
        moveToSlide(i);
      });

      indicatorContainer.appendChild(indicator);
    }
  }

  // Move to specified slide group
  function moveToSlide(index) {
    slideIndex = index;
    const offset = -slideIndex * slidesPerView * slideWidth;
    track.style.transform = `translateX(${offset}px)`;

    // Update active indicator
    updateActiveIndicator();
  }

  // Update active indicator
  function updateActiveIndicator() {
    const indicators = document.querySelectorAll(".carousel-indicator");
    indicators.forEach((indicator, i) => {
      if (i === slideIndex) {
        indicator.classList.add("active");
      } else {
        indicator.classList.remove("active");
      }
    });
  }

  // Get number of visible slides based on viewport width
  function getNumberOfVisibleSlides() {
    if (window.innerWidth >= 1024) {
      return 3; // Large screens: 3 slides
    } else if (window.innerWidth >= 768) {
      return 2; // Medium screens: 2 slides
    } else {
      return 1; // Small screens: 1 slide
    }
  }

  // Auto-advance carousel every 5 seconds
//   setInterval(() => {
//     if (slideIndex < totalGroups - 1) {
//       moveToSlide(slideIndex + 1);
//     } else {
//       moveToSlide(0);
//     }
//   }, 5000);

  // Initial setup
  moveToSlide(0);

  // Add AOS animations to elements that don't already have them
  document
    .querySelectorAll(".feature-card, .testimonial-card")
    .forEach((el, index) => {
      if (!el.hasAttribute("data-aos")) {
        el.setAttribute("data-aos", "fade-up");
        el.setAttribute("data-aos-delay", (index * 100).toString());
      }
    });
});
  