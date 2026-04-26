const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("is-open");
    menuToggle.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("is-open");
      menuToggle.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1100) {
      mobileMenu.classList.remove("is-open");
      menuToggle.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const testimonialTrack = document.querySelector("[data-testimonial-track]");
const testimonialDots = Array.from(document.querySelectorAll("[data-testimonial-dot]"));
const testimonialPrev = document.querySelector('[data-testimonial-nav="prev"]');
const testimonialNext = document.querySelector('[data-testimonial-nav="next"]');

if (testimonialTrack) {
  const getCards = () => Array.from(testimonialTrack.children);

  const updateActiveDot = () => {
    const cards = getCards();
    if (!cards.length) return;

    const closestIndex = cards.reduce((bestIndex, card, index) => {
      const currentDistance = Math.abs(card.offsetLeft - testimonialTrack.scrollLeft);
      const bestDistance = Math.abs(cards[bestIndex].offsetLeft - testimonialTrack.scrollLeft);
      return currentDistance < bestDistance ? index : bestIndex;
    }, 0);

    testimonialDots.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === closestIndex);
    });
  };

  const scrollToIndex = (index) => {
    const cards = getCards();
    const target = cards[index];
    if (!target) return;

    testimonialTrack.scrollTo({
      left: target.offsetLeft,
      behavior: "smooth",
    });
  };

  testimonialPrev?.addEventListener("click", () => {
    const activeIndex = testimonialDots.findIndex((dot) => dot.classList.contains("is-active"));
    scrollToIndex(Math.max(activeIndex - 1, 0));
  });

  testimonialNext?.addEventListener("click", () => {
    const activeIndex = testimonialDots.findIndex((dot) => dot.classList.contains("is-active"));
    scrollToIndex(Math.min(activeIndex + 1, getCards().length - 1));
  });

  testimonialDots.forEach((dot, index) => {
    dot.addEventListener("click", () => scrollToIndex(index));
  });

  testimonialTrack.addEventListener("scroll", () => {
    window.requestAnimationFrame(updateActiveDot);
  });

  updateActiveDot();
}
