const board = document.getElementById('board');
const message = document.getElementById('message');
const cells = [];
let currentPlayer = 'X';

// Create a 3x3 grid of cells
for (let i = 0; i < 3; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < 3; j++) {
        const cell = document.createElement('td');
        cell.addEventListener('click', onCellClick);
        row.appendChild(cell);
        cells.push(cell);
    }
    board.appendChild(row);
}

function onCellClick() {
    if (this.textContent === '') {
        this.textContent = currentPlayer;
        if (checkWin(currentPlayer)) {
            message.textContent = `${currentPlayer} wins!`;
            disableCells();
        } else if (checkDraw()) {
            message.textContent = 'It\'s a draw!';
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            message.textContent = `It's ${currentPlayer}'s turn`;
        }
    }
}

function checkWin(player) {
    // Check rows, columns, and diagonals for a win
    for (let i = 0; i < 3; i++) {
        if (cells[3*i].textContent === player && cells[3*i+1].textContent === player && cells[3*i+2].textContent === player) {
            return true;
        }
        if (cells[i].textContent === player && cells[i+3].textContent === player && cells[i+6].textContent === player) {
            return true;
        }
    }
    if (cells[0].textContent === player && cells[4].textContent === player && cells[8].textContent === player) {
        return true;
    }
    if (cells[2].textContent === player && cells[4].textContent === player && cells[6].textContent === player) {
        return true;
    }
    return false;
}

function checkDraw() {
    return [...cells].every(cell => cell.textContent !== '');
}

function disableCells() {
    for (const cell of cells) {
        cell.removeEventListener('click', onCellClick);
    }
}