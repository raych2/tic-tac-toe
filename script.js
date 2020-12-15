const gameBoard = (() => {
    const container = document.querySelector('.container');
    
    const gameBoardArr = ['','','','','','','','',''];

    const renderGameBoard = () => {
        container.style.display = 'grid';
        container.style.gridTemplateRows = `repeat(3, 1fr)`;
        container.style.gridTemplateColumns = `repeat(3, 1fr)`;
        for(let i = 0; i < gameBoardArr.length; i++) {
            let square = document.createElement('div');
            square.id= i;
            square.classList.add('empty');
            container.append(square);
        }
    }
    return {
        gameBoardArr,
        renderGameBoard
    };
})();

gameBoard.renderGameBoard();

const Player = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;
    return {name, mark};
}

const playerOne = Player('playerOne', 'X');
const playerTwo = Player('playerTwo', 'O');

const game = (() => {
    const squares = document.querySelectorAll('.empty');
    const board = gameBoard.gameBoardArr;
    let currentPlayer = playerOne;
    let winner;

    const play = (e) => {
        if(currentPlayer === null) {
            currentPlayer = playerOne;
        } else if (currentPlayer === playerOne) {
            board[`${e.target.id}`] = playerOne.mark;
            displayController.displayMarkers();
            e.target.removeEventListener('click', play);
            currentPlayer = playerTwo;
        } else {
            board[`${e.target.id}`] = playerTwo.mark;
            displayController.displayMarkers();
            e.target.removeEventListener('click', play);
            currentPlayer = playerOne;
        }
    }

    squares.forEach(square => {
        square.addEventListener('click', play);
    });
})();

const displayController = (() => {
    const board = gameBoard.gameBoardArr;

    function displayMarkers() {
        for(let i = 0; i < board.length; i++) {
            let square = document.getElementById(`${i}`);
            square.innerText = board[i];
        }
    }

    return {displayMarkers}
})();

