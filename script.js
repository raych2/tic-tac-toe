const gameBoard = (() => {
    const container = document.querySelector('.container');
    
    const gameBoardArr = ['','','','','','','','',''];

    const renderGameBoard = () => {
        container.style.display = 'grid';
        container.style.gridTemplateRows = `repeat(3, 1fr)`;
        container.style.gridTemplateColumns = `repeat(3, 1fr)`;
        for(let i = 0; i < gameBoardArr.length; i++) {
            let square = document.createElement('div');
            square.innerHTML = 'X';
            square.classList.add('blank');
            container.append(square);
        }
    }
    return {
        gameBoardArr,
        renderGameBoard
    };
})();

gameBoard.renderGameBoard();