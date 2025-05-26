const container = document.getElementById("matrix-container");
const canvas = document.getElementById("explosao");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function gerarPalavras() {
  for (let i = 0; i < 500; i++) {
    const span = document.createElement("span");
    span.classList.add("teamo");
    span.textContent = "Te Amo";
    span.style.fontSize = `${Math.random() * 1.5 + 0.5}rem`;
    container.appendChild(span);
  }
}

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

container.addEventListener("click", (e) => {
  const rect = container.getBoundingClientRect();
  criarExplosao(e.clientX, e.clientY - rect.top);
});

gerarPalavras();
