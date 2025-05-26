const canvas = document.getElementById("explosao");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = Array(300).fill("Te Amo");
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array.from({ length: columns }, () => Math.random() * canvas.height);

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#ff69b4";
  ctx.font = `${fontSize}px Arial`;

  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

setInterval(drawMatrix, 33);

// Explosão ao clique
function criarExplosao(x, y) {
  const particulas = [];
  const quantidade = 20;

  for (let i = 0; i < quantidade; i++) {
    particulas.push({
      x,
      y,
      raio: Math.random() * 5 + 2,
      dx: (Math.random() - 0.5) * 10,
      dy: (Math.random() - 0.5) * 10,
      alpha: 1
    });
  }

  const animar = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMatrix();  // continuar o efeito Matrix junto da explosão
    particulas.forEach((p, i) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.raio, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 105, 180, ${p.alpha})`;
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      p.alpha -= 0.02;
    });

    if (particulas.some(p => p.alpha > 0)) {
      requestAnimationFrame(animar);
    }
  };

  animar();
}

canvas.addEventListener("click", (e) => {
  criarExplosao(e.clientX, e.clientY);
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
