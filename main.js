let score = 0;
let timer = 10;
let gameActive = false;
let squareInterval;
const startBtn = document.querySelector('#startBtn');
const gameContainer = document.querySelector('.game');
const tableWinner = document.querySelector('table');

startBtn.addEventListener('click', startGame);

function updateScore() {
  document.querySelector('.score').textContent = `${score}`;
}

function updateTimer() {
  document.querySelector('.time-left').textContent = `${timer}`;
}

function endGame() {
  clearInterval(squareInterval);
  gameActive = false;
  alert(`Game is over, your score is ${score}`);
}

function getRandomPosition() {
  const maxX = gameContainer.clientWidth - 50;
  const maxY = gameContainer.clientHeight - 50;
  const x = Math.floor(Math.random() * maxX);
  const y = Math.floor(Math.random() * maxY);
  return { x, y };
}

function getRandomColor() {
  return Math.floor(Math.random() * 1000000);
}

function getRandomSize(max, min) {
  const rand = Math.floor(Math.random() * (max - min) + min);
  const randW = rand;
  const randH = rand;
  return { randW, randH };
}
let i = 1;
let bestScore = 0;
const scoresArr = [];
function addScores() {
  const gamesPlayed = document.querySelector('.games-played');

  const row = `
    <tr>
        <th>${i}</th>
        <th>${score}</th>
    </tr>
  `;
  scoresArr.push(score);
  gamesPlayed.textContent = `${i}`;

  i++;
  return tableWinner.insertAdjacentHTML('beforeend', row);
}

function updateBestScore() {
  bestScore = Math.max(bestScore, ...scoresArr);
  document.querySelector('.score-best').textContent = `${bestScore}`;
}

function createSquare() {
  const difficulty = document.querySelector('select').value;
  const square = document.createElement('div');
  const { randW, randH } = getRandomSize(50, 15);
  square.classList.add('square');
  if (difficulty === 'Easy') {
    square.style.width = '50px';
    square.style.height = '50px';
  } else if (difficulty === 'Medium') {
    square.style.width = '35px';
    square.style.height = '35px';
  } else if (difficulty === 'Hard') {
    square.style.width = '20px';
    square.style.height = '20px';
  } else if (difficulty === 'Extreme') {
    square.style.width = `${randW}px`;
    square.style.height = `${randH}px`;
  } else {
    square.style.width = '50px';
    square.style.height = '50px';
  }

  const { x, y } = getRandomPosition();
  square.style.left = `${x}px`;
  square.style.top = `${y}px`;
  square.style.backgroundColor = `#${getRandomColor()}`;

  square.addEventListener('click', () => {
    if (gameActive) {
      score++;
      updateScore();
      square.remove();
      createSquare();
    }
  });

  gameContainer.appendChild(square);
}

function delSquare() {
  gameContainer.lastElementChild.remove();
}

function startGame() {
  startBtn.style.display = 'none';
  gameActive = true;
  score = 0;
  timer = parseInt(document.querySelector('#durationInput').value) || 10;

  updateScore();
  updateTimer();

  squareInterval = setInterval(() => {
    if (timer > 0) {
      timer--;
      updateTimer();
    } else {
      delSquare();
      endGame();
      startBtn.style.display = 'block';

      addScores();
      updateBestScore();
    }
  }, 1000);

  createSquare();
}
