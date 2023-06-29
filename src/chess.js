// JavaScript code to implement the chess game logic

// 1. Set up the game board

const board = [
  ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
  ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
  ['_', '_', '_', '_', '_', '_', '_', '_'],
  ['_', '_', '_', '_', '_', '_', '_', '_'],
  ['_', '_', '_', '_', '_', '_', '_', '_'],
  ['_', '_', '_', '_', '_', '_', '_', '_'],
  ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
  ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
]
// 2. Render the initial position

function renderBoard() {
  for (let row = 0; row < board.length; row++) {
    let rowStr = ''
    for (let col = 0; col < board[row].length; col++) {
      rowStr += board[row][col] + ' '
    }
    console.log(rowStr)
  }
}
// 3. Implement the rules of chess

function getValidMovesForPawn(board, row, col) {
  const validMoves = []

  if (board[row][col] === '♙') {
    // move forward one space
    if (row - 1 >= 0 && board[row - 1][col] === '_') {
      validMoves.push({ row: row - 1, col })

      // Move two squares forward on first move
      if (row === 6 && board[row - 2][col] === '') {
        validMoves.push({ row: row - 2, col })
      }
    }

    // Capture diagonally
    if (row - 1 >= 0 && col - 1 >= 0 && board[row - 1][col - 1] !== '_') {
      validMoves.push({ row: row - 1, col: col - 1 })
    }

    if (row - 1 >= 0 && col + 1 < board[row].length && board[row - 1][col + 1] !== '_') {
      validMoves.push({ row: row - 1, col: col + 1 })
    }

    // Check for pawn promotion
    if (row - 1 === 0) {
      validMoves.push({ row: row - 1, col, promote: true })
    }
  }

  if (board[row][col] === '♟') {
    // move forward one space
    if (row + 1 < board.length && board[row + 1][col] === '_') {
      validMoves.push({ row: row + 1, col })

      // Move two squares forward on first move
      if (row === 1 && board[row + 2][col] === '') {
        validMoves.push({ row: row + 2, col })
      }
    }

    // Capture diagonally
    if (row + 1 < board.length && col - 1 >= 0 && board[row + 1][col - 1] !== '_') {
      validMoves.push({ row: row + 1, col: col - 1 })
    }

    if (row + 1 < board.length && col + 1 < board[row].length && board[row + 1][col + 1] !== '_') {
      validMoves.push({ row: row + 1, col: col + 1 })
    }

    // Check for pawn promotion
    if (row + 1 === board.length - 1) {
      validMoves.push({ row: row + 1, col, promote: true })
    }
  }

  return validMoves
}

function getValidMovesForRook(board, row, col) {
  const validMoves = []

  // possible rook move offsets
  const rookMoves = [
    { row: -1, col: 0 },
    { row: 1, col: 0 },
    { row: 0, col: -1 },
    { row: 0, col: 1 }
  ]

  for (const direction of rookMoves) {
    let newRow = row + direction.row
    let newCol = col + direction.col

    // Move in a straight line until reaching the board boundaries or an occupied square
    while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8 && board[newRow][newCol] === '') {
      validMoves.push({ row: newRow, col: newCol })
      newRow += direction.row
      newCol += direction.col
    }

    // Check if the last square is occupied by an opponent's piece
    if (
      newRow >= 0 &&
      newRow < 8 &&
      newCol >= 0 &&
      newCol < 8 &&
      board[newRow][newCol].charAt(0) !== board[row][col].charAt(0)
    ) {
      validMoves.push({ row: newRow, col: newCol })
    }
  }

  return validMoves
}

function getKnightMoves(board, row, col) {
  const validMoves = []

  // Possible knight move offsets
  const knightMoves = [
    { row: -2, col: -1 },
    { row: -2, col: 1 },
    { row: -1, col: -2 },
    { row: -1, col: 2 },
    { row: 1, col: -2 },
    { row: 1, col: 2 },
    { row: 2, col: -1 },
    { row: 2, col: 1 }
  ]

  for (const move of knightMoves) {
    const newRow = row + move.row
    const newCol = col + move.col

    // Check if the move is within the board boundaries
    if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
      // Check if the destination square is empty or occupied by an opponent's piece
      const destPiece = board[newRow][newCol]
      if (destPiece === '' || destPiece.charAt(0) !== board[row][col].charAt(0)) {
        validMoves.push({ row: newRow, col: newCol })
      }
    }
  }

  return validMoves
}

function getValidMovesForBishop(board, row, col) {
  const validMoves = []

  // possible bishop move offsets
  const bishopMoves = [
    { row: -1, col: -1 },
    { row: -1, col: 1 },
    { row: 1, col: -1 },
    { row: 1, col: 1 }
  ]

  for (const direction of bishopMoves) {
    let newRow = row + direction.row
    let newCol = col + direction.col

    // Move diagonally until reaching the board boundaries or an occupied square
    while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8 && board[newRow][newCol] === '') {
      validMoves.push({ row: newRow, col: newCol })
      newRow += direction.row
      newCol += direction.col
    }

    // If the destination square is occupied by an opponent's piece, add it as a valid move
    if (
      newRow >= 0 &&
      newRow < 8 &&
      newCol >= 0 &&
      newCol < 8 &&
      board[newRow][newCol].charAt(0) !== board[row][col].charAt(0)
    ) {
      validMoves.push({ row: newRow, col: newCol })
    }
  }

  return validMoves
}

function getValidMovesForQueen(board, row, col) {
  const validMoves = []

  // Get valid moves for rook
  validMoves.push(...getValidMovesForRook(board, row, col))

  // Get valid moves for bishop
  validMoves.push(...getValidMovesForBishop(board, row, col))

  return validMoves
}

function getValidMovesForKing(board, row, col) {
  const validMoves = []

  // Possible king move offsets
  const kingMoves = [
    { row: -1, col: -1 },
    { row: -1, col: 0 },
    { row: -1, col: 1 },
    { row: 0, col: -1 },
    { row: 0, col: 1 },
    { row: 1, col: -1 },
    { row: 1, col: 0 },
    { row: 1, col: 1 }
  ]

  for (const move of kingMoves) {
    const newRow = row + move.row
    const newCol = col + move.col

    // Check if the move is within the board boundaries
    if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
      // Check if the destination square is empty or occupied by an opponent's piece
      const destPiece = board[newRow][newCol]
      if (destPiece === '' || destPiece.charAt(0) !== board[row][col].charAt(0)) {
        validMoves.push({ row: newRow, col: newCol })
      }
    }
  }

  return validMoves
}

// 4. Handle player moves

// 5. Implement win/loss conditions

// 6. Implement game logic and user interface

// 7. Test and debug
