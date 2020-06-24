
function bestMove() {
    // AI to make its turn
    let bestScore = Infinity;
    let moveI=-1,moveJ=-1;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (mainBoard[i][j] == '') {
          mainBoard[i][j] = ai;
          let score = minimax(mainBoard, 0, false);
          // console.log(score)
          // console.log(i+' '+j)
          mainBoard[i][j] = '';
          if (score < bestScore) {
            bestScore = score;
            console.log('Best Score: '+bestScore)
            moveI = i;
            moveJ = j;
          }
        }
      }
    }
    
    // console.log(moveI+' '+moveJ)
    if(moveI!=-1 && moveJ!=-1){
      mainBoard[moveI][moveJ] = 'O';
      let res = moveI+''+moveJ;
      // console.log(res)
      return res;
    }
    
    
  }
  
  let scores = {
    X: 10,
    O: -10,
    tie: 0
  };
  
  function minimax(mainBoard, depth, isMaximizing) {
    let result = checkWinner();
    // console.log(result)
    if (result !== null) {
      return scores[result];
    }
  
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Is the spot available?
          if (mainBoard[i][j] == '') {
            mainBoard[i][j] = ai;
            let score = minimax(mainBoard, depth + 1, false);
            // console.log(depth+' minimax')
            mainBoard[i][j] = '';
            bestScore = Math.max(score, bestScore);
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Is the spot available?
          if (mainBoard[i][j] == '') {
            mainBoard[i][j] = human;
            let score = minimax(mainBoard, depth + 1, true);
            mainBoard[i][j] = '';
            bestScore = Math.min(score, bestScore);
          }
        }
      }
      return bestScore;
    }
  }
  