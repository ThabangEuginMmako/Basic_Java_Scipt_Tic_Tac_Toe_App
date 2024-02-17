// Factory function for creating players
const Player = (name, symbol) => {
    return { name, symbol };
};

// Module for game logic
const Game = (() => {
    let board = ["", "", "", "", "", "", "", "", ""]; // Initial empty board
    let currentPlayer;
    let gameOver = false;

    const checkWinner = () => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
                return board[a];
            }
        }

        if (!board.includes("")) {
            return "tie"; // Game is a tie
        }

        return null; // No winner yet
    };

    const checkGameStatus = () => {
        const winner = checkWinner();
        if (winner) {
            gameOver = true;
            if (winner === "tie") {
                displayController.displayMessage("It's a tie!");
            } else {
                displayController.displayMessage(`${winner} wins!`);
            }
        } else {
            currentPlayer = currentPlayer === player1 ? player2 : player1;
            displayController.displayMessage(`${currentPlayer.name}'s turn`);
        }
    };

    const handleCellClick = (index) => {
        if (!gameOver && board[index] === "") {
            board[index] = currentPlayer.symbol;
            displayController.renderBoard();
            checkGameStatus();
        }
    };

    const getBoard = () => board.slice(); // Return a copy of the board

    const startGame = () => {
        currentPlayer = player1; // Set the first player
        gameOver = false;
        displayController.renderBoard();
        displayController.displayMessage(`${currentPlayer.name}'s turn`);
    };

    const resetGame = () => {
        board = ["", "", "", "", "", "", "", "", ""]; // Reset the board to the initial state
        currentPlayer = player1; // Set the first player
        gameOver = false;
        displayController.renderBoard();
        displayController.displayMessage(`${currentPlayer.name}'s turn`);
    };

    return { handleCellClick, startGame, getBoard, resetGame };
})();

// Module for DOM manipulation
const displayController = (() => {
    const gameBoard = document.getElementById("game-board");
    const message = document.getElementById("message");
    const restartBtn = document.getElementById("restart-btn")
    const renderBoard = () => {
        gameBoard.innerHTML = "";
        Game.getBoard().forEach((cell, index) => {
            const cellDiv = document.createElement("div");
            cellDiv.classList.add("cell");
            cellDiv.textContent = cell;
            cellDiv.addEventListener("click", () => Game.handleCellClick(index));
            gameBoard.appendChild(cellDiv);
        });
    };

    const displayMessage = (msg) => {
        message.textContent = msg;
    };

const bindRestartButton = () => {
        restartBtn.addEventListener("click", () => {
            Game.resetGame(); // Call the resetGame method on restart button click
        });
    };

    return { renderBoard, displayMessage, bindRestartButton };

    
})();

// Initialize players
const player1 = Player("Player 1", "X");
const player2 = Player("Player 2", "O");

// Start the game and Bind restart button
Game.startGame();
displayController.bindRestartButton();
