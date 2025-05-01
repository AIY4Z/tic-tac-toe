let boardEl;
let messageEl;
let restartBtn;
let currentPlayer = 'X';
let gameBoard = Array(9).fill(null);

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

document.addEventListener('DOMContentLoaded', () => {
  boardEl = document.getElementById('board');
  messageEl = document.getElementById('message');
  restartBtn = document.getElementById('restart');

  restartBtn.addEventListener('click', restartGame);
  restartGame();
});

function createBoard() {
  boardEl.innerHTML = '';
  gameBoard.forEach((value, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.textContent = value || '';
    cell.addEventListener('click', () => handleCellClick(index));
    boardEl.appendChild(cell);
  });
}

function handleCellClick(index) {
  if (gameBoard[index] || checkWinner()) return;

  gameBoard[index] = currentPlayer;
  createBoard();

  if (checkWinner()) {
    messageEl.textContent = `🎉 Player ${currentPlayer} wins!`;
  } else if (gameBoard.every(cell => cell)) {
    messageEl.textContent = '😐 It\'s a draw!';
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    messageEl.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  return winningCombinations.some(([a, b, c]) =>
    gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]
  );
}

function restartGame() {
  gameBoard = Array(9).fill(null);
  currentPlayer = 'X';
  messageEl.textContent = `Player ${currentPlayer}'s turn`;
  createBoard();
}

