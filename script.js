document.addEventListener("DOMContentLoaded", function () {

  const table = document.getElementById("tableSection");
  const btn = document.querySelector(".compare-btn");

  btn.addEventListener("click", function () {
    table.classList.toggle("hidden");

    if (table.classList.contains("hidden")) {
      btn.innerText = "View Full Comparison";
    } else {
      btn.innerText = "Hide Comparison";
      table.scrollIntoView({ behavior: "smooth" });
    }
  });

});

// =========================
// 🔥 BACKGROUND NETWORK FIX
// =========================

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

canvas.style.position = "fixed";
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.zIndex = 0;
canvas.style.pointerEvents = "none";

const ctx = canvas.getContext("2d");

let particles = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// 🔥 PARTICLES (balanced)
for (let i = 0; i < 140; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() * 0.6) - 0.3,
    vy: (Math.random() * 0.6) - 0.3
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // DOTS
  particles.forEach(p => {
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
    ctx.fill();
  });

  // LINES
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {

      let dx = particles[i].x - particles[j].x;
      let dy = particles[i].y - particles[j].y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 160) {
        ctx.strokeStyle = "rgba(255,255,255,0.15)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  // MOVE
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x <= 0 || p.x >= canvas.width) p.vx *= -1;
    if (p.y <= 0 || p.y >= canvas.height) p.vy *= -1;
  });

  requestAnimationFrame(draw);
}

draw();
