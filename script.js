document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("board");
    const cells = document.querySelectorAll(".cell");

    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];

    cells.forEach((cell) => {
        cell.addEventListener("click", () => cellClick(cell));
    });

    function cellClick(cell) {
        const index = cell.getAttribute("data-index");

        if (gameBoard[index] === "") {
            gameBoard[index] = currentPlayer;
            cell.textContent = currentPlayer;

            cell.classList.add(currentPlayer === "X" ? "bg-red" : "bg-blue");

            if (checkWinner()) {
                alert(`Jogador ${currentPlayer} venceu!`);
                resetGame();
            } else if (gameBoard.every((value) => value !== "")) {
                alert("Empate!");
                resetGame();
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        }
    }

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        return winPatterns.some(
            (pattern) =>
                gameBoard[pattern[0]] !== "" &&
                gameBoard[pattern[0]] === gameBoard[pattern[1]] &&
                gameBoard[pattern[1]] === gameBoard[pattern[2]]
        );
    }

    function resetGame() {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";

        
        cells.forEach((cell) => {
            cell.textContent = "";
            cell.classList.remove("bg-red", "bg-blue");
        });
    }
});