const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let paddle = { x: 160, y: 350, width: 100, height: 40, speed: 6 };
let ball = { x: 200, y: 200, radius: 20, dx: 4, dy: -4 };
let keys = {};
let gameOver = false;

const pancakeImg = new Image();
pancakeImg.src = "Nuova cartella/66-664136_pancake-png-pancake-transparent-png.png";

const panImg = new Image();
panImg.src = "Nuova cartella/frying-pan-11530926183guoznjnlvy.png";

window.addEventListener("keydown", e => keys[e.key] = true);
window.addEventListener("keyup", e => keys[e.key] = false);

function drawPaddle() {
  ctx.drawImage(panImg, paddle.x, paddle.y, paddle.width, paddle.height);
}

function drawBall() {
  ctx.drawImage(pancakeImg, ball.x - ball.radius, ball.y - ball.radius, ball.radius * 2, ball.radius * 2);
}

function gameLoop() {
  if (gameOver) return;

  // Movimento racchetta
  if (keys["ArrowLeft"] && paddle.x > 0) paddle.x -= paddle.speed;
  if (keys["ArrowRight"] && paddle.x < canvas.width - paddle.width) paddle.x += paddle.speed;

  // Movimento palla
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Rimbalzo pareti laterali
  if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
    ball.dx = -ball.dx;
  }

  // Rimbalzo soffitto
  if (ball.y - ball.radius < 0) {
    ball.dy = -ball.dy;
  }

  // Rimbalzo racchetta
  if (ball.y + ball.radius >= paddle.y &&
      ball.x >= paddle.x && ball.x <= paddle.x + paddle.width &&
      ball.dy > 0) {
    ball.dy = -ball.dy;
  }

  // Sotto la racchetta (Game Over)
  if (ball.y - ball.radius > canvas.height) {
    gameOver = true;
  }

  // Disegna
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPaddle();
  drawBall();

  if (!gameOver) {
    requestAnimationFrame(gameLoop);
  } else {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText("GAME OVER", 140, 200);
  }
}

window.onload = gameLoop;