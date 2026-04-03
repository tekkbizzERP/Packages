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

// BACKGROUND NETWORK ANIMATION
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

canvas.style.position = "fixed";
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.zIndex = 0;
canvas.style.pointerEvents = "none"; // 🔥 YE LINE ADD KARO
const ctx = canvas.getContext("2d");

let particles = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

for (let i = 0; i < 80; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: Math.random() * 0.5,
    vy: Math.random() * 0.5
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // dots
  particles.forEach(p => {
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fill();
  });

  // lines
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      let dx = particles[i].x - particles[j].x;
      let dy = particles[i].y - particles[j].y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        ctx.strokeStyle = "rgba(255,255,255,0.1)";
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  // move
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x > canvas.width || p.x < 0) p.vx *= -1;
    if (p.y > canvas.height || p.y < 0) p.vy *= -1;
  });

  requestAnimationFrame(draw);
}

draw();
