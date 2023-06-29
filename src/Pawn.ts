import { type Move, Piece } from '@/Piece'
import { type BoardState, type ChessBoard } from '@/ChessBoard'

export class Pawn extends Piece {
  capture() {
    // ... logic for capturing with a pawn
  }

  captureDiagonally(board: BoardState, moves: Move[], row: number, col: number) {
    const offset = this.color === 'b' ? -1 : 1
    const onBoard = row + offset >= 0 && row + offset < board.length
    const hasRight = col + 1 < board[row].length
    const hasLeft = col - 1 >= 0
    const hasLeftPiece = hasLeft && board[row + offset][col - 1] !== null
    const hasRightPiece = hasRight && board[row + offset][col + 1] !== null

    if (onBoard && hasLeftPiece) moves.push({ row: row + offset, col: col - 1 })

    if (onBoard && hasRightPiece) moves.push({ row: row + offset, col: col + 1 })
  }

  moveForward(board: BoardState, moves: Move[], row: number, col: number) {
    const offset = this.color === 'b' ? -1 : 1
    const startingPosition = this.color === 'b' ? row === 6 : row === 1

    const firstCellOnBoard = row + offset >= 0 && row + offset < board.length
    const firstCellEmpty = board[row + offset][col] === null

    const secondCellOnBoard = row + offset * 2 >= 0 && row + offset * 2 < board.length
    const secondCellEmpty = secondCellOnBoard && board[row + offset * 2][col] === null

    const blackPromotion = row + offset === 0 && this.color === 'b'
    const whitePromotion = row + offset === board.length - 1 && this.color === 'w'
    const promote = blackPromotion || whitePromotion

    // move forward one space
    if (firstCellOnBoard && firstCellEmpty) {
      moves.push({ row: row + offset, col, promote })
    }

    // Move two squares forward on first move
    if (firstCellEmpty && secondCellEmpty && startingPosition) {
      moves.push({ row: row + offset * 2, col, promote })
    }
  }

  moves() {
    const validMoves: Move[] = []
    if (this.board === undefined) return validMoves

    const board = this.board.getState()
    const { row, col } = this.findPosition()

    this.moveForward(board, validMoves, row, col)
    this.captureDiagonally(board, validMoves, row, col)

    return validMoves
  }

  toString() {
    return this.color === 'b' ? '♙' : '♟'
  }
}
