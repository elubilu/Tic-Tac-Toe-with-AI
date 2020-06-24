const ticTacToeGame = new TicTacToeGame();
let mainBoard = [
  ['O', '', ''],
  ['', '', ''],
  ['', '', '']
];
const human = 'X'
const ai = 'O'
ticTacToeGame.start();

function TicTacToeGame() {
  const board = new Board();
  const humanPlayer = new HumanPlayer(board);
  const computerPlayer = new ComputerPlayer(board);
  let turn = 0;

  this.start = function() {
    const config = { childList: true };
    const observer = new MutationObserver(() => takeTurn());
    board.positions.forEach((el) => observer.observe(el, config));
    takeTurn();
  }

  function takeTurn() {
    if (board.checkForWinner()) {
      return;
    }

    if(turn==0) {
      document.getElementById('00').innerText = 'O';
    }
    else if (turn % 2 === 1) {
      // console.log(turn)
      humanPlayer.takeTurn();
    } else {
      computerPlayer.takeTurn();
    }

    turn++;
  };
}

function Board() {
  this.positions = Array.from(document.querySelectorAll('.col'));
// console.log(this.positions)
  this.checkForWinner = function() {
    let winner = false;

    const winningCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,4,8],
        [2,4,6],
        [0,3,6],
        [1,4,7],
        [2,5,8]
    ];

    const positions = this.positions;
    winningCombinations.forEach((winningCombo) => {
      const pos0InnerText = positions[winningCombo[0]].innerText;
      const pos1InnerText = positions[winningCombo[1]].innerText;
      const pos2InnerText = positions[winningCombo[2]].innerText;
      const isWinningCombo = pos0InnerText !== '' &&
        pos0InnerText === pos1InnerText && pos1InnerText === pos2InnerText;
      if (isWinningCombo) {
          winner = true;
          winningCombo.forEach((index) => {
            positions[index].className += ' winner';
          })
      }
    });

    return winner;
  }
}

function ComputerPlayer(board) {
  this.takeTurn = function() {
  // console.log(board.positions);
    // let availablePositions = board.positions.filter((p) => p.innerText === '');
    
   
    // const move = Math.floor(Math.random() * (availablePositions.length - 0));
    const move = bestMove();
    // console.log(move)
    if(move)
    document.getElementById(move).innerText = 'O';

  }
}

function HumanPlayer(board) {
  this.takeTurn = function() {
    board.positions.forEach(el =>
      el.addEventListener('click', handleTurnTaken));
  }

  function handleTurnTaken(event) {
    // console.log(event.target.id)
    let pos =event.target.id
    let posx =parseInt(pos.slice(0,1))
    let posy =parseInt(pos.slice(1,2))
    mainBoard[posx][posy] = 'X';
    // console.log(posx+' '+posy)
    event.target.innerText = 'X';
    // console.log(mainBoard)
    
    board.positions
      .forEach(el => el.removeEventListener('click', handleTurnTaken));
  }
}



function equals3(a, b, c) {
  return a == b && b == c && a != '';
}

function checkWinner() {
  let winner = null;

  // horizontal
  for (let i = 0; i < 3; i++) {
    if (equals3(mainBoard[i][0], mainBoard[i][1], mainBoard[i][2])) {
      winner = mainBoard[i][0];
    }
  }

  // Vertical
  for (let i = 0; i < 3; i++) {
    if (equals3(mainBoard[0][i], mainBoard[1][i], mainBoard[2][i])) {
      winner = mainBoard[0][i];
    }
  }

  // Diagonal
  if (equals3(mainBoard[0][0], mainBoard[1][1], mainBoard[2][2])) {
    winner = mainBoard[0][0];
  }
  if (equals3(mainBoard[2][0], mainBoard[1][1], mainBoard[0][2])) {
    winner = mainBoard[2][0];
  }

  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (mainBoard[i][j] == '') {
        openSpots++;
      }
    }
  }

  if (winner == null && openSpots == 0) {
    return 'tie';
  } else {
    return winner;
  }
}
