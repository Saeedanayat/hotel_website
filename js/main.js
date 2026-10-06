/* ==========================================================
   SERENITY STAY — main.js
   1 Image map  2 Images  3 Icons  4 Mobile menu
   5 Lightbox  6 Forms
   ========================================================== */

/* 1. IMAGE MAP — edit paths here to replace placeholders */
const IMAGES = {
  "hero-home": "assets/images/coast-sunset.svg",
  "intro": "assets/images/pool.svg",
  "hero-rooms": "assets/images/room-a.svg",
  "room-ocean": "assets/images/room-a.svg",
  "room-garden": "assets/images/room-b.svg",
  "room-deluxe": "assets/images/room-c.svg",
  "cta-home": "assets/images/coast-day.svg",
  "cta-rooms": "assets/images/pool.svg",
  "hero-gallery": "assets/images/olive.svg",
  "g1": "assets/images/pool.svg",
  "g2": "assets/images/room-c.svg",
  "g3": "assets/images/room-a.svg",
  "g4": "assets/images/dining.svg",
  "g5": "assets/images/coast-sunset.svg",
  "g6": "assets/images/room-b.svg",
  "g7": "assets/images/pool.svg",
  "g8": "assets/images/coast-sunset.svg",
  "hero-contact": "assets/images/coast-sunset.svg",
  "side": "assets/images/coast-day.svg"
};

/* 2. APPLY IMAGES */
document.querySelectorAll("img[data-img]").forEach((img) => {
  img.src = IMAGES[img.dataset.img] || "";
});

/* 3. ICONS (Lucide) */
if (window.lucide) lucide.createIcons();

/* 4. MOBILE MENU */
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", open);
    menuBtn.textContent = open ? "Close" : "Menu";
  });
}

/* 5. LIGHTBOX */
const thumbs = [...document.querySelectorAll(".gallery button")];
if (thumbs.length) {
  const box = document.createElement("div");
  box.className = "lightbox";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-label", "Image viewer");
  box.innerHTML = '<button class="lb-close" aria-label="Close">&times;</button><button class="lb-prev" aria-label="Previous">&#8592;</button><img alt=""><button class="lb-next" aria-label="Next">&#8594;</button>';
  document.body.appendChild(box);
  const big = box.querySelector("img");
  let current = 0;

  const show = (i) => {
    current = (i + thumbs.length) % thumbs.length;
    const src = thumbs[current].querySelector("img");
    big.src = src.src;
    big.alt = src.alt;
  };
  const open = (i) => { show(i); box.classList.add("is-open"); };
  const close = () => box.classList.remove("is-open");

  thumbs.forEach((t, i) => t.addEventListener("click", () => open(i)));
  box.querySelector(".lb-close").addEventListener("click", close);
  box.querySelector(".lb-prev").addEventListener("click", () => show(current - 1));
  box.querySelector(".lb-next").addEventListener("click", () => show(current + 1));
  box.addEventListener("click", (e) => { if (e.target === box) close(); });
  document.addEventListener("keydown", (e) => {
    if (!box.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });
}

/* 6. FORMS */
document.querySelectorAll("form[data-form]").forEach((form) => {
  const note = form.querySelector(".form-note");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let ok = true;
    form.querySelectorAll("[required]").forEach((f) => {
      const valid = f.checkValidity() && f.value.trim() !== "";
      f.closest(".field").classList.toggle("is-invalid", !valid);
      if (!valid) ok = false;
    });
    if (note) note.textContent = ok ? form.dataset.success : "Please complete the highlighted fields.";
    if (ok) form.reset();
  });
});
