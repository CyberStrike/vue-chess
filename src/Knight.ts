import { type Move, Piece } from '@/Piece'

// possible knight move offsets
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
export class Knight extends Piece {
  moves() {
    if (this.board === undefined) return []
    if (this.position === undefined) return []

    const board = this.board.getState()
    const { row, col } = this.findPosition()

    return knightMoves.reduce((acc: Move[], move) => {
      const newRow = row + move.row
      const newCol = col + move.col
      const isRowOnBoard = newRow >= 0 && newRow < board.length
      const isColumnOnBoard = isRowOnBoard && newCol >= 0 && newCol < board[newRow].length
      const isMoveOnBoard = isRowOnBoard && isColumnOnBoard
      const isMoveBlocked = isMoveOnBoard && board[newRow][newCol] !== null

      if (isMoveOnBoard && !isMoveBlocked) {
        acc.push({ row: newRow, col: newCol })
      }
      return acc
    }, [])
  }

  // Custom logic for capturing for Knight
  capture() {
    // ... logic for capturing with a knight
  }

  toString(): string {
    return this.color === 'b' ? '♘' : '♞'
  }
}
