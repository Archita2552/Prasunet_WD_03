document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset');
    const playerVsPlayerButton = document.getElementById('playerVsPlayer');
    const playerVsAIButton = document.getElementById('playerVsAI');
    const choiceDiv = document.getElementById('choice');
    const gameDiv = document.getElementById('game');
    const messageDiv = document.getElementById('message');
    const turnDiv = document.getElementById('turn');
    let isPlayerVsAI = false;
    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellClick(clickedCellEvent) {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.innerHTML = currentPlayer;

        // Add pop class for animation
        clickedCell.classList.add('pop');
        // Remove pop class after animation ends
        setTimeout(() => {
            clickedCell.classList.remove('pop');
        }, 300);

        if (checkWin()) {
            messageDiv.textContent = `${currentPlayer} wins!`;
            gameActive = false;
            return;
        }

        if (!gameState.includes('')) {
            messageDiv.textContent = 'Draw!';
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        turnDiv.textContent = `Player ${currentPlayer}'s turn`;

        if (isPlayerVsAI && currentPlayer === 'O') {
            setTimeout(aiMove, 1000);  // Add a delay of 1 second for AI move
        }
    }

    function checkWin() {
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                return true;
            }
        }
        return false;
    }

    function resetGame() {
        gameActive = true;
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => {
            cell.innerHTML = '';
            cell.classList.remove('show');
        });
        messageDiv.textContent = '';
        turnDiv.textContent = "Player X's turn";
        choiceDiv.style.display = 'block';
        gameDiv.style.display = 'none';
    }

    function aiMove() {
        const availableCells = gameState.map((cell, index) => cell === '' ? index : null).filter(val => val !== null);
        const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
        gameState[randomIndex] = 'O';
        cells[randomIndex].innerHTML = 'O';

        // Add pop class for animation
        cells[randomIndex].classList.add('pop');
        // Remove pop class after animation ends
        setTimeout(() => {
            cells[randomIndex].classList.remove('pop');
        }, 300);

        if (checkWin()) {
            messageDiv.textContent = 'O wins!';
            gameActive = false;
            return;
        }

        if (!gameState.includes('')) {
            messageDiv.textContent = 'Draw!';
            gameActive = false;
            return;
        }

        currentPlayer = 'X';
        turnDiv.textContent = `Player ${currentPlayer}'s turn`;
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
    playerVsPlayerButton.addEventListener('click', () => {
        isPlayerVsAI = false;
        choiceDiv.style.display = 'none';
        gameDiv.style.display = 'block';
        cells.forEach(cell => cell.classList.add('show'));
    });
    playerVsAIButton.addEventListener('click', () => {
        isPlayerVsAI = true;
        choiceDiv.style.display = 'none';
        gameDiv.style.display = 'block';
        cells.forEach(cell => cell.classList.add('show'));
    });
});
