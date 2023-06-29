import { type Move, Piece } from './Piece'

export class King extends Piece {
  moves(): Move[] {
    if (this.board === undefined) return []
    if (this.position === undefined) return []

    const board = this.board.getState()
    const { row, col } = this.findPosition()

    // possible king move offsets
    const kingMoves: Move[] = [
      { row: -1, col: -1 }, // top left
      { row: -1, col: 0 }, // top
      { row: -1, col: 1 }, // top right
      { row: 0, col: -1 }, // left
      { row: 0, col: 1 }, // right
      { row: 1, col: -1 }, // bottom left
      { row: 1, col: 0 }, // bottom
      { row: 1, col: 1 } // bottom right
    ]

    return kingMoves.reduce((acc: Move[], move) => {
      const newRow = row + move.row
      const newCol = col + move.col
      const isRowOnBoard = newRow >= 0 && newRow < board.length
      const isColumnOnBoard = isRowOnBoard && newCol >= 0 && newCol < board[newRow].length
      const isMoveOnBoard = isRowOnBoard && isColumnOnBoard
      const isMoveBlocked = isMoveOnBoard && board[newRow][newCol] !== null

      // TODO: Add logic for castling

      if (isMoveOnBoard && !isMoveBlocked) {
        acc.push({ row: newRow, col: newCol })
      }

      return acc
    }, [])
  }

  toString(): string {
    return this.color === 'b' ? '♔' : '♚'
  }
}
