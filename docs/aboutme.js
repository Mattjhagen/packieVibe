// Animate SVG chart path
document.addEventListener("DOMContentLoaded", () => {
  const path = document.querySelector("polyline");
  const circles = document.querySelectorAll("circle");

  // Animate line drawing
  const length = path.getTotalLength();
  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;

  setTimeout(() => {
    path.style.transition = "stroke-dashoffset 2s ease";
    path.style.strokeDashoffset = 0;
  }, 500);

  // Animate each point after line
  circles.forEach((circle, index) => {
    circle.style.opacity = 0;
    setTimeout(() => {
      circle.style.transition = "opacity 0.3s ease";
      circle.style.opacity = 1;
    }, 2200 + index * 200);
  });
});

// Animate mobile logo glow and loading dots
let dots = 0;
const loadingText = document.querySelector(".mobile-screen p");
const logo = document.querySelector(".mobile-screen .logo");

setInterval(() => {
  // Animate loading text: dot...dot...
  dots = (dots + 1) % 4;
  loadingText.textContent = "Loading" + ".".repeat(dots);
}, 500);

// Animate logo glow pulse
setInterval(() => {
  logo.classList.toggle("glow");
}, 1000);
