/*
Given a chessboard that is inifinite in all directions and a knight placed at (0,0) and an
arbitrary square (x,y) compute the shortest path (optimal set of moves) (x,y).
*/

/*
Ideas:

Knights have 8 possible moves, of which 2 are in each "quadrant" (depending on direction).

The problem is symmetric around both axes in the 2D plane. If we have an optimal path to (9,11) and
we want an optimal path to (-9,11) we can just "fold" the move sequence across the y-axis to produce
the mirror image of it by multiplying the x-coordinate of every move by -1, and the moves will still
all be valid. In the same way, to get the solution for (9,-11) we can negate the y-coordinates of
all the moves. And to get to (-9,-11) we can negate the x- and y-coords.

So we can just think about quadrant 1, and assume x >= 0 and y >= 0 in the part of the solution
where we're trying to determine the next move.
*/

// When x< =4 and y <= 4 we rely on pre-computed knowledge of "special" moves because if we were to
// just move the knight "toward" (x,y) then in some cases it would be the wrong first step.
const SPECIAL_RANGE = 4;

// This array is used to look up the best first move to get to (x,y) when the distance to (x,y)
// is so small that the "make a move in the closest direction" strategy might not be optimal.
// In some cases the heuristic still works, so we could choose to store nulls in this array and
// then have the algorithm just check for null and use the heuristic, or we could hard-code the
// same best first move that he heuristic would find. Since we're not talking about a lot of
// space to include moves that would be found anyway by the heuristic, it simplifies the
// algorithm a bit if it can just read the best first move from this array whenever (x,y) is
// within a certain distance of the knight's current position.
const SPECIAL_MOVES = [
  // x=0
  [
    // 0,0: no move needed (algorithm probably will never read this)
    [],
    // 0,1: 3 moves
    [1, 2],
    // 0,2: 2 moves, first is "special"
    [2, 1],
    // 0,3: 3 moves
    [1, 2],
    // 0,4: 2 moves
    [1, 2],
  ],
  // x=1
  [
    // 1,0: 3 moves
    [2, 1],
    // 1,1: 2 moves, first is "special" by jumping to different quadrant
    [2, -1],
    // 1,2: direct (1 move, easy)
    [1, 2],
    // 1,3: 2 moves, first is "special"
    [2, 1],
    // 1,4: 3 moves
    [1, 2],
  ],
  // x=2
  [
    // 2,0: 2 moves, first is "special"
    [1, 2],
    // 2,1: direct (1 move, easy)
    [2, 1],
    // 2,2: 4 moves
    [1, 2],
    // 2,3: 3 moves
    [1, 2],
    // 2,4: 2 moves
    [1, 2],
  ],
  // x=3
  [
    // 3,0: 3 moves
    [2, 1],
    // 3,1: 2 moves, first is "special"
    [1, 2],
    // 3,2: 3 moves
    [2, 1],
    // 3,3: 2 moves
    [1, 2],
    // 3,4: 3 moves, first is "special"
    [2, 1],
  ],
  // x=4
  [
    // 4,0: 2 moves
    [2, 1],
    // 4,1: 3 moves
    [2, 1],
    // 4,2: 2 moves
    [2, 1],
    // 4,3: 3 moves, first is "special"
    [1, 2],
    // 4,4: 4 moves
    [2, 1],
  ],
  // For x > 4 no first moves are "special" because we could always find an optimal path by choosing
  // a first move in the direction of (x,y).
];

function findMovesToXY(targetX, targetY) {
  let curX = 0,
    curY = 0;
  let moves = [];
  while (curX !== targetX || curY !== targetY) {
    let distX = targetX - curX,
      distY = targetY - curY;
    // If we're not pointing toward "quadrant 1", just track which direction we're pointing.
    // We can adjust the computed next move once we figure out what it is.
    const multX = (distX >= 0) ? 1 : -1;
    const multY = (distY >= 0) ? 1 : -1;
    // Are we close enough to use a "special" move?
    let distXPos = Math.abs(distX),
      distYPos = Math.abs(distY);
    let move = null;
    if (distXPos <= SPECIAL_RANGE && distYPos <= SPECIAL_RANGE) {
      move = SPECIAL_MOVES[distXPos][distYPos];
    }
    if (move === null) {
      move = (distY >= distX) ? [1, 2] : // "upper half" of quadrant 1
        [2, 1];                          // "lower half" of quadrant 1
    }
    const [dx, dy] = [
      move[0] * multX,
      move[1] * multY
    ];
    // Now negate the x- and/or y-coordinate of the move as necessary.
    move = [dx, dy];
    moves.push(move);
    //logMove([curX, curY], move);
    curX += dx;
    curY += dy;
  }
  log(`${moves.length} moves to get from 0,0 to ${targetX},${targetY}:`);
  log(JSON.stringify(moves, null));
  return moves;
}

function log(s) {
  console.log(s); // eslint-disable-line
}

module.exports = findMovesToXY;
