(function () {
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('startBtn');
let paddle, ball, score, highScore, obstacles, isGameOver;

    function initGame() {
      paddle = {
        width: 50,
        height: 10,
        x: canvas.width / 2 - 50,
        y: canvas.height - 20,
      };

      ball = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 8,
        dx: 3,
        dy: -3
      };

      score = 0;
      highScore = localStorage.getItem('highScore') || 0;
      obstacles = [];
      isGameOver = false;
    }

    canvas.addEventListener('mousemove', function (e) {
      if (isGameOver) return;
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      paddle.x = mouseX - paddle.width / 2;
    });

    startBtn.addEventListener('click', () => {
      startBtn.style.display = 'none';
      initGame();
      draw();
    });

    function drawPaddle() {
      ctx.fillStyle = '#89CFF0';
      ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    }

    function drawBall() {
  // ball
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = '#a8fa69';
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.strokeStyle = '#64963f'; // 
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.closePath();
  
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 1.5;

  // 
  ctx.beginPath();
  ctx.arc(ball.x + 6, ball.y, ball.radius - 4, Math.PI / 2, (Math.PI / 2) + Math.PI);
  ctx.stroke();
  ctx.closePath();

  // 
  ctx.beginPath();
ctx.arc(ball.x - 6, ball.y, ball.radius - 4, 3 * Math.PI / 2, 3 * Math.PI / 2 + Math.PI);
ctx.stroke();
ctx.closePath();

}


    function drawScore() {
      ctx.font = "20px LED Dot-Matrix";
      ctx.fillStyle = "#fff";
      ctx.fillText("SCORE: " + score, 10, 20);
      ctx.fillText("HIGH SCORE: " + highScore, 420, 20);
    }
//BRIK
    function drawObstacles() {
  ctx.fillStyle = '#C04657'; // 
  ctx.strokeStyle = '#732933';  // 
  ctx.lineWidth = 2;         // 

  for (let obs of obstacles) {
    ctx.fillRect(obs.x, obs.y, 40, 20);     // 
    ctx.strokeRect(obs.x, obs.y, 40, 20);   // 
  }
}

    function drawGameOver() {
      ctx.font = "28px LED Dot-Matrix";
      ctx.fillStyle = "#6CBB3C";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER!", canvas.width / 2, canvas.height / 2 - 30);
      ctx.fillText("SCORE: " + score, canvas.width / 2, canvas.height / 2 + 10);
      ctx.fillText("HIGH SCORE: " + highScore, canvas.width / 2, canvas.height / 2 + 40);
      ctx.textAlign = "start";
    }

    function updateObstacles() {
      for (let i = 0; i < obstacles.length; i++) {
        let obs = obstacles[i];
        if (
          ball.x + ball.radius > obs.x &&
          ball.x - ball.radius < obs.x + obs.size &&
          ball.y + ball.radius > obs.y &&
          ball.y - ball.radius < obs.y + obs.size
        ) {
          obstacles.splice(i, 1);
          score += 2;
          ball.dy *= -1;
          break;
        }
      }
    }

    function updateBall() {
      ball.x += ball.dx;
      ball.y += ball.dy;

      if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx *= -1;
      }

      if (ball.y - ball.radius < 0) {
        ball.dy *= -1;
      }

      if (
        ball.y + ball.radius >= paddle.y &&
        ball.x >= paddle.x &&
        ball.x <= paddle.x + paddle.width
      ) {
        ball.dy *= -1;
        ball.y = paddle.y - ball.radius;
        score += 1;

        if (score % 5 === 0) {
          addObstacle();
        }
      }

      if (ball.y - ball.radius > canvas.height) {
        isGameOver = true;
        if (score > highScore) {
          localStorage.setItem('highScore', score);
          highScore = score;
        }
        startBtn.style.display = 'inline-block';
		startBtn.style.top = (canvas.offsetTop + canvas.height / 2 + 60) + 'px';
startBtn.style.left = (canvas.offsetLeft + canvas.width / 2) + 'px';

      }
    }

    function addObstacle() {
      const size = 30;
      const x = Math.random() * (canvas.width - size);
      const y = Math.random() * (canvas.height / 2);
      obstacles.push({ x, y, size });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawPaddle();
      drawBall();
      drawScore();
      drawObstacles();

      if (isGameOver) {
        drawGameOver();
	      })();
        return;
      }

      updateBall();
      updateObstacles();
      requestAnimationFrame(draw);
    }

    // FIRST RUN
    initGame();
    draw();
