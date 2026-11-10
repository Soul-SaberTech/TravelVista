document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle"),
    nav = document.querySelector("nav");
  if (toggle && nav)
    toggle.addEventListener("click", () => {
      nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", nav.classList.contains("open"));
    });
  const search = document.getElementById("destinationSearch");
  if (search) {
    const cards = [...document.querySelectorAll(".searchable")],
      empty = document.getElementById("noResults");
    search.addEventListener("input", () => {
      let count = 0;
      cards.forEach((card) => {
        const show = card.dataset.name.includes(
          search.value.trim().toLowerCase(),
        );
        card.hidden = !show;
        if (show) count++;
      });
      empty.hidden = count !== 0;
    });
  }
  document.querySelectorAll(".book-btn").forEach((btn) =>
    btn.addEventListener("click", () => {
      alert(
        "Thanks for your interest in " +
          btn.dataset.package +
          ". This is a demo only; no booking is made.",
      );
      location.href = "contact.html";
    }),
  );
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    const preview = lightbox.querySelector("img"),
      close = lightbox.querySelector(".lightbox-close");
    document.querySelectorAll(".gallery-item").forEach((btn) =>
      btn.addEventListener("click", () => {
        const img = btn.querySelector("img");
        preview.src = img.src;
        preview.alt = img.alt;
        lightbox.hidden = false;
      }),
    );
    const hide = () => {
      lightbox.hidden = true;
      preview.src = "";
    };
    close.addEventListener("click", hide);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) hide();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") hide();
    });
  }
  const form = document.getElementById("contactForm");
  if (form)
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const out = document.getElementById("formMessage"),
        name = form.elements.name.value.trim(),
        email = form.elements.email.value.trim(),
        subject = form.elements.subject.value.trim(),
        message = form.elements.message.value.trim(),
        valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!name || !email || !subject || !message) {
        out.textContent = "Please complete all fields.";
        out.className = "error";
      } else if (!valid) {
        out.textContent = "Please enter a valid email address.";
        out.className = "error";
      } else {
        out.textContent =
          "Thank you, " +
          name +
          "! Your message passed demo validation. No email was actually sent.";
        out.className = "success";
        form.reset();
      }
    });
});
