(function () {
  document.documentElement.classList.add("js");

  // Footer year
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Mobile menu
  var burger = document.getElementById("burger");
  var menu = document.getElementById("menu");
  function setMenu(open) {
    menu.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  burger.addEventListener("click", function () { setMenu(!menu.classList.contains("open")); });
  menu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  // Reveal on scroll
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  // Highlight current section in the menu
  var links = Array.prototype.slice.call(menu.querySelectorAll("a"));
  var sections = links.map(function (a) { return document.querySelector(a.getAttribute("href")); });
  function spy() {
    var pos = window.scrollY + 120, cur = 0;
    sections.forEach(function (s, i) { if (s && s.offsetTop <= pos) cur = i; });
    links.forEach(function (a, i) { a.classList.toggle("active", i === cur); });
  }
  window.addEventListener("scroll", spy, { passive: true });
  spy();
})();
