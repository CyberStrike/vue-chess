import { type Move, Piece } from '@/Piece'
import { type BoardState } from '@/ChessBoard'

export class Rook extends Piece {
  moves(x = -1, y = -1): Move[] {
    if (this.board === undefined) return []
    if (this.position === undefined) return []

    const board = this.board.getState()

    const { col, row } = this.findPosition()

    return this.buildMoves(row, col, board)
  }

  buildMoves(row = -1, col = -1, board: BoardState): Move[] {
    const moves: Move[] = []

    // possible rook move offsets
    const rookMoves = [
      { row: -1, col: 0 },
      { row: 1, col: 0 },
      { row: 0, col: -1 },
      { row: 0, col: 1 }
    ]

    // loop through all possible rook moves
    for (const move of rookMoves) {
      // loop through all possible rook moves
      for (let i = 1; i < board.length; i++) {
        const newRow = row + move.row * i
        const newCol = col + move.col * i

        // check if the move is on the board
        if (newRow < 0 || newRow >= board.length) break
        if (newCol < 0 || newCol >= board[newRow].length) break

        // check if the move is blocked by a piece
        if (board[newRow][newCol] !== null) break

        // add the move to the list of valid moves
        moves.push({ row: newRow, col: newCol })
      }
    }

    return moves
  }

  // Custom logic for capturing for Rook
  capture() {
    // ... logic for capturing with a rook
  }

  toString(): string {
    return this.color === 'b' ? '♖' : '♜'
  }
}
