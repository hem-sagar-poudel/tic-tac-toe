import calculateMove from "./calculateMove";

export default function minMax(p1, p2Co, player, boards) {
  let remain = [];
  const plMoves = [...boards];

  for (let i = 0; i < 9; i++) {
    if (!boards[i]) {
      remain[i] = i;
    }
  }
  // console.log("min-max", remain, remain.length, p1, p2Co, player, plMoves);

  const winner = calculateMove(boards);
  if (winner === p1) {
    return {
      score: -10,
    };
  } else if (winner === p2Co) {
    return {
      score: 10,
    };
  } else if (remain.length === 0) {
    return {
      score: 0,
    };
  }
  // console.log(winner, score);

  let moves = [];

  for (let i = 0; i < remain.length; i++) {
    let move = {};
    if (remain[i] >= 0) {
      move.index = remain[i];
      plMoves[i] = player;
      console.log("remain", remain, "number", Number(remain[i]), plMoves, move);
      // console.log("move", move, i, plMoves[i], plMoves);
      if (player === p2Co) {
        let g = minMax(p1, p2Co, p1, plMoves);
        move.score = g.score;
      } else {
        let g = minMax(p1, p2Co, p2Co, plMoves);
        move.score = g.score;
      }
      // console.log(move);
      // plMoves[remain[i]] = move.index;
      // console.log(plMoves, move);
      moves.push(move);
    }
    // console.log("move", move, plMoves);
  }
  // console.log("boards", plMoves);
  // return 0;

  var bestMove;
  if (player === p2Co) {
    var bestScore = -10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    var bestScore = 10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  console.log("bestMove", bestMove);
  return moves[bestMove];
}

// https://www.freecodecamp.org/news/how-to-make-your-tic-tac-toe-game-unbeatable-by-using-the-minimax-algorithm-9d690bad4b37/

// https://codepen.io/abdolsa/pen/vgjoMb?editors=0011
