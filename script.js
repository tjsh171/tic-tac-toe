// Selecting all the elements that represent the cells of the game
const cells = document.querySelectorAll('[data-cell]');

// Selecting other game elements like winner message and buttons
const winnerMessage = document.getElementById('winnerMessage');
const restartButton = document.getElementById('restartButton');
const gameContainer = document.getElementById('gameContainer');
const landingPage = document.querySelector('.landing-page');
const startButton = document.getElementById('startGame');

// Audio elements for sounds when a player makes a move or wins
const moveSound = document.getElementById('moveSound');
const winSound = document.getElementById('winSound');

// Set the current player to 'X' initially (Player 1)
let currentPlayer = 'X';

// This array represents the game board state. We start with empty cells.
let board = Array(9).fill(null);

// Winning combinations for the game (3 in a row, column, or diagonal)
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Event listener to hide the landing page and start the game when the button is clicked
startButton.addEventListener('click', () => {
    landingPage.style.display = 'none'; // Hide the landing page
    gameContainer.style.display = 'flex'; // Show the game board
    startGame(); // Start the game logic
});

// Function to start the game by allowing clicks on the cells
function startGame() {
    cells.forEach(cell => {
        // Adding a click event to each cell, allowing only one click per cell
        cell.addEventListener('click', handleClick, { once: true });
    });
}

// Function that handles the player clicks on cells
function handleClick(e) {
    const cell = e.target; // The clicked cell
    const index = Array.from(cells).indexOf(cell); // Find the index of the clicked cell

    // If the cell is empty (not already played in)
    if (!board[index]) {
        board[index] = currentPlayer; // Set the cell's value to the current player (X or O)
        cell.innerText = currentPlayer; // Display the player's symbol in the cell
        moveSound.play(); // Play the move sound

        // Check if the current player has won
        if (checkWin(currentPlayer)) {
            // Display a winning message depending on which player won
            winnerMessage.innerText = `${currentPlayer === 'X' ? 'Player 1' : 'Player 2'} has won!`;
            winSound.play(); // Play the win sound
            endGame(); // End the game (disable further clicks)
        } else if (board.every(cell => cell)) {
            // If all cells are filled and no winner, it's a draw
            winnerMessage.innerText = "It's a Draw!";
        } else {
            // Switch to the other player (X to O, or O to X)
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

// Function to check if the current player has won the game
function checkWin(player) {
    // Check all winning combinations to see if the player has a winning pattern
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === player);
    });
}

// Function to end the game by disabling further clicks
function endGame() {
    cells.forEach(cell => {
        cell.removeEventListener('click', handleClick); // Remove click events on all cells
    });
}

// Event listener to restart the game when the restart button is clicked
restartButton.addEventListener('click', () => {
    board = Array(9).fill(null); // Reset the board to its initial state
    currentPlayer = 'X'; // Reset the current player to 'X' (Player 1)
    cells.forEach(cell => {
        cell.innerText = ''; // Clear the display of all cells
        cell.addEventListener('click', handleClick, { once: true }); // Re-enable clicks
    });
    winnerMessage.innerText = ''; // Clear the winner message
    moveSound.play(); // Play the move sound on restart
});
