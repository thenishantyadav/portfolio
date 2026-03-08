'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

if (testimonialsItem.length && modalContainer && modalCloseBtn && overlay) {
  // modal variable
  const modalImg = document.querySelector("[data-modal-img]");
  const modalTitle = document.querySelector("[data-modal-title]");
  const modalText = document.querySelector("[data-modal-text]");

  // modal toggle function
  const testimonialsModalFunc = function () {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }

  // add click event to all modal items
  for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener("click", function () {
      modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
      modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
      modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
      modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

      testimonialsModalFunc();
    });
  }

  // add click event to modal close button
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  overlay.addEventListener("click", testimonialsModalFunc);
}



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    if (select) elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
if (form && formInputs.length && formBtn) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {

      // check form validation
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }

    });
  }
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");
const pageNameToIndex = {};

for (let i = 0; i < pages.length; i++) {
  pageNameToIndex[pages[i].dataset.page] = i;
}

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const targetName = (this.dataset.target || this.innerHTML).toLowerCase();
    const pageIndex = pageNameToIndex[targetName];
    if (pageIndex === undefined) return;
    pages[pageIndex].scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

// keep nav highlight in sync with current section while scrolling
if (pages.length && navigationLinks.length) {
  if ("IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const pageName = entry.target.dataset.page;
        const navIndex = pageNameToIndex[pageName];
        if (navIndex === undefined) return;

        navigationLinks.forEach((link) => link.classList.remove("active"));
        navigationLinks[navIndex].classList.add("active");
      });
    }, {
      root: null,
      threshold: 0.35
    });

    pages.forEach((section) => {
      section.classList.add("section-reveal");
      navObserver.observe(section);
    });
  } else {
    // Fallback for old browsers
    pages.forEach((section) => section.classList.add("is-visible"));
    if (navigationLinks[0]) navigationLinks[0].classList.add("active");
  }
}


// lightweight scroll reveal for key cards
const revealTargets = document.querySelectorAll(
  ".service-item, .project-card, .timeline-item, .architecture-card, .case-study-card"
);

if (revealTargets.length) {
  if ("IntersectionObserver" in window) {
    revealTargets.forEach((el, idx) => {
      el.classList.add("reveal");
      el.style.transitionDelay = `${Math.min(idx * 35, 220)}ms`;
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.14
    });

    revealTargets.forEach((el) => observer.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }
}

// welcome popup on load (auto hide in 4 seconds)
const welcomeToast = document.getElementById("welcomeToast");
if (welcomeToast) {
  window.addEventListener("load", () => {
    welcomeToast.classList.add("show");

    setTimeout(() => {
      welcomeToast.classList.add("hide");
      welcomeToast.classList.remove("show");
    }, 4000);
  });
}

// cursor image preview (desktop/fine pointer only)
const cursorPreview = document.getElementById("cursorPreview");
const cursorPreviewImg = cursorPreview ? cursorPreview.querySelector("img") : null;
const previewTargets = document.querySelectorAll(".cursor-preview-target[data-image]");
const hasHoverCapability = window.matchMedia("(hover: hover)").matches;
const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
const canUseCursorPreview = hasHoverCapability && !isCoarsePointer;

if (cursorPreview && cursorPreviewImg && previewTargets.length && canUseCursorPreview) {
  const offsetX = 24;
  const offsetY = 24;
  let currentX = -9999;
  let currentY = -9999;
  let targetX = -9999;
  let targetY = -9999;
  let rafId = null;

  const renderPreview = () => {
    currentX += (targetX - currentX) * 0.2;
    currentY += (targetY - currentY) * 0.2;
    cursorPreview.style.setProperty("--cursor-x", `${currentX}px`);
    cursorPreview.style.setProperty("--cursor-y", `${currentY}px`);
    rafId = window.requestAnimationFrame(renderPreview);
  };

  const showPreview = (imageSrc) => {
    if (!imageSrc) return;
    cursorPreviewImg.src = imageSrc;
    cursorPreview.classList.add("show");
    if (!rafId) rafId = window.requestAnimationFrame(renderPreview);
  };

  const hidePreview = () => {
    cursorPreview.classList.remove("show");
    targetX = -9999;
    targetY = -9999;
  };

  previewTargets.forEach((target) => {
    target.addEventListener("pointerenter", () => showPreview(target.dataset.image));
    target.addEventListener("pointerleave", hidePreview);
  });

  window.addEventListener("pointermove", (event) => {
    targetX = event.clientX + offsetX;
    targetY = event.clientY + offsetY;
  });

  window.addEventListener("blur", hidePreview);
}
