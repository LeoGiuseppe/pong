const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let paddle = { x: 160, y: 370, width: 80, height: 10, speed: 6 };
let ball = { x: 200, y: 200, radius: 8, dx: 3, dy: -3 };
let keys = {};
let gameOver = false;

window.addEventListener("keydown", e => keys[e.key] = true);
window.addEventListener("keyup", e => keys[e.key] = false);

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

  // Racchetta
  ctx.fillStyle = "white";
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

  // Palla
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();

  if (!gameOver) {
    requestAnimationFrame(gameLoop);
  } else {
    ctx.font = "20px Arial";
    ctx.fillText("GAME OVER", 140, 200);
  }
}

gameLoop();