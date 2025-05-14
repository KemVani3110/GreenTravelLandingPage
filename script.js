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
  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const emailInput = this.querySelector('input[type="email"]');
      const submitBtn = document.getElementById("subscribeBtn");
      const emailError = document.getElementById("emailError");

      // Validate email
      if (emailInput.value.trim() === "" || !emailInput.value.includes("@")) {
        emailInput.classList.add("ring-2", "ring-red-400");
        emailError.classList.remove("hidden");
        return;
      }

      // Hide error message if previously shown
      emailError.classList.add("hidden");

      // Success state
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Subscribed!';
      submitBtn.classList.remove("bg-green-600", "hover:bg-green-700");
      submitBtn.classList.add("bg-green-500");

      // Disable inputs during success state
      const nameInput = document.getElementById("fullname");
      const checkboxes = newsletterForm.querySelectorAll(
        'input[type="checkbox"]'
      );

      emailInput.disabled = true;
      nameInput.disabled = true;
      submitBtn.disabled = true;
      checkboxes.forEach((checkbox) => (checkbox.disabled = true));

      // Show success animation
      submitBtn.classList.add("animate-pulse");

      // Reset after delay
      setTimeout(() => {
        emailInput.value = "";
        nameInput.value = "";
        emailInput.disabled = false;
        nameInput.disabled = false;
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        submitBtn.classList.remove("animate-pulse", "bg-green-500");
        submitBtn.classList.add("bg-green-600", "hover:bg-green-700");
        emailInput.classList.remove("ring-2", "ring-red-400");

        // Re-enable checkboxes
        checkboxes.forEach((checkbox) => {
          checkbox.disabled = false;
          checkbox.checked = false;
        });
      }, 3000);
    });
  }

  // Sticky header behavior with scroll class
  // const header = document.querySelector("header");
  // window.addEventListener("scroll", function () {
  //   if (window.scrollY > 100) {
  //     header.classList.remove("header-gradient");
  //     header.classList.add("bg-green-700");
  //   } else {
  //     header.classList.add("header-gradient");
  //     header.classList.remove("bg-green-700");
  //   }
  // });

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
  // setInterval(() => {
  //   if (slideIndex < totalGroups - 1) {
  //     moveToSlide(slideIndex + 1);
  //   } else {
  //     moveToSlide(0);
  //   }
  // }, 8000);

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

  const counters = document.querySelectorAll(".counter-animation");

  const animateCounter = (counter, target) => {
    const speed = 300; // Lower is faster
    const increment = target / speed;
    let current = 0;

    const updateCount = () => {
      if (current < target) {
        current += increment;
        counter.innerText = Math.ceil(current);
        setTimeout(updateCount, 1);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  };

  // Intersection Observer for counter animation trigger
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.getAttribute("data-count"));
          animateCounter(entry.target, target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });

  // Earth Indicator Tooltip (simple hover tooltip)
  const indicators = document.querySelectorAll(".earth-indicator");

  indicators.forEach((indicator) => {
    indicator.addEventListener("mouseenter", function () {
      const title = this.getAttribute("title");
      if (!title) return;

      const tooltip = document.createElement("div");
      tooltip.classList.add("indicator-tooltip");
      tooltip.innerText = title;
      tooltip.style.position = "absolute";
      tooltip.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
      tooltip.style.color = "#16a34a";
      tooltip.style.padding = "4px 8px";
      tooltip.style.borderRadius = "4px";
      tooltip.style.fontSize = "12px";
      tooltip.style.fontWeight = "bold";
      tooltip.style.zIndex = "10";
      tooltip.style.whiteSpace = "nowrap";
      tooltip.style.top = "-20px";
      tooltip.style.left = "50%";
      tooltip.style.transform = "translateX(-50%)";
      tooltip.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";

      this.appendChild(tooltip);
      this.removeAttribute("title");
      this._tooltip = tooltip;
    });

    indicator.addEventListener("mouseleave", function () {
      if (this._tooltip) {
        const text = this._tooltip.innerText;
        this.setAttribute("title", text);
        this._tooltip.remove();
        delete this._tooltip;
      }
    });
  });

  // Smooth scroll for the scroll-down arrow
  const scrollArrow = document.querySelector(".scroll-down-arrow");
  if (scrollArrow) {
    scrollArrow.addEventListener("click", () => {
      const featuresSection = document.getElementById("features");
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counters = entry.target.querySelectorAll(".counter-animation");
          counters.forEach((counter) => {
            const target = parseInt(counter.getAttribute("data-count"));
            let count = 0;
            const updateCounter = () => {
              const increment = target / 50;
              if (count < target) {
                count += increment;
                counter.textContent =
                  Math.ceil(count) >= 1000
                    ? Math.ceil(count / 1000) + "K+"
                    : Math.ceil(count);
                setTimeout(updateCounter, 20);
              } else {
                counter.textContent =
                  target >= 1000 ? Math.ceil(target / 1000) + "K+" : target;
              }
            };
            updateCounter();
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".grid").forEach((grid) => {
    observer.observe(grid);
  });
});
