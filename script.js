const gameBoard = (() => {
    const gameboard = document.querySelector('.gameboard');
    
    const gameBoardArr = ['','','','','','','','',''];

    const renderGameBoard = () => {
        for(let i = 0; i < gameBoardArr.length; i++) {
            let square = document.createElement('div');
            square.id= i;
            square.classList.add('empty');
            gameboard.append(square);
        }
    }
    return {
        gameBoardArr,
        renderGameBoard
    };
})();

gameBoard.renderGameBoard();

const Player = (name, mark) => {
    return { name, mark };
}

let playerOne = Player('playerOne', 'X');
let playerTwo = Player('playerTwo', 'O');

const game = (() => {
    const squares = document.querySelectorAll('.empty');
    const reset = document.querySelector('.reset');
    let board = gameBoard.gameBoardArr;
    let currentPlayer;
    let winner;

    const play = (e) => {
        if(currentPlayer === null) {
            currentPlayer = playerOne;
            displayController.playerTurn.innerText = `${playerOne.name}'s turn`; 
        } else if(currentPlayer === playerTwo) {
            board[`${e.target.id}`] = playerTwo.mark;
            displayController.displayMarkers();
            e.target.removeEventListener('click', play);
            isTie();
            findWinner();
            currentPlayer = playerOne;
            displayController.playerTurn.innerText = `${playerOne.name}'s turn`; 
        } else {
            currentPlayer = playerOne;
            board[`${e.target.id}`] = playerOne.mark;
            displayController.displayMarkers();
            e.target.removeEventListener('click', play);
            isTie();
            findWinner();
            currentPlayer = playerTwo;
            displayController.playerTurn.innerText = `${playerTwo.name}'s turn`; 
        }
    }

    const findWinner = () => {
        if(getHorizontalWin() || getVerticalWin() || getDiagonalWin()) {
            endGame();
            displayController.gameWinner.innerText = `${winner.name} wins! Play again!`;
        }
    }

    const determineWin = (firstSquare, secondSquare, thirdSquare) => {
        if(firstSquare === secondSquare && secondSquare === thirdSquare) {
            if(firstSquare === 'X') {
                currentPlayer = playerOne;
                winner = currentPlayer;
            } else if(firstSquare === 'O') {
                currentPlayer = playerTwo;
                winner = currentPlayer;
            }
        }
        return winner;
    }

    const isTie = () => {
        if (!board.includes('')) {
            endGame();
            displayController.gameWinner.innerText = `It's a tie! Play again!`;
        }
    }

    const getHorizontalWin = () => {
        let firstRow = determineWin(board[0], board[1], board[2]);
        let secondRow = determineWin(board[3], board[4], board[5]);
        let thirdRow = determineWin(board[6], board[7], board[8]);
        return firstRow || secondRow || thirdRow;
    }

    const getVerticalWin = () => {
        let firstCol = determineWin(board[0], board[3], board[6]);
        let secondCol = determineWin(board[1], board[4], board[7]);
        let thirdCol = determineWin(board[2], board[5], board[8]);
        return firstCol || secondCol || thirdCol;
    }

    const getDiagonalWin = () => {
        let firstDiag = determineWin(board[0], board[4], board[8]);
        let secondDiag = determineWin(board[2], board[4], board[6]);
        return firstDiag || secondDiag;
    }

    const endGame = () => {
        displayController.playerTurn.style.display = 'none';
        squares.forEach(square => {
            square.removeEventListener('click', play);
        });
        reset.style.display = 'block';
    }

    const resetGame = () => {
        currentPlayer = null;
        winner = null;
        displayController.playerTurn.style.display = 'block';
        displayController.playerTurn.innerText = `${playerOne.name}'s turn`; 
        displayController.gameWinner.innerText = '';
        reset.style.display = 'none';
        squares.forEach((square, index) => {
            square.addEventListener('click', play);
            square.innerText = '';
            board[index] = '';
        });
    }
    
    squares.forEach(square => {
        square.addEventListener('click', play);
    });
    return { resetGame };
})();

const displayController = (() => {
    const container = document.querySelector('.container');
    const board = gameBoard.gameBoardArr;
    const gameWinner = document.querySelector('.winner');
    const playerTurn = document.querySelector('.turn');
    const form = document.querySelector('.playersForm');
    const start = document.querySelector('.start');
    const reset = document.querySelector('.reset');

    const displayMarkers = () => {
        for(let i = 0; i < board.length; i++) {
            let square = document.getElementById(`${i}`);
            square.innerText = board[i];
        }
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        pOneInput = document.getElementById('pOne');
        pTwoInput = document.getElementById('pTwo');
        playerOneName = pOneInput.value || pOneInput.getAttribute('placeholder');
        playerTwoName = pTwoInput.value || pTwoInput.getAttribute('placeholder');
        playerOne = Player(playerOneName, 'X');
        playerTwo = Player(playerTwoName, 'O');
        container.style.display = 'block';
        start.style.display = 'none';
        displayController.playerTurn.innerText = `${playerOne.name}'s turn`; 
    });

    reset.addEventListener('click', game.resetGame);

    return {
        gameWinner,
        playerTurn,
        displayMarkers
    }
})();