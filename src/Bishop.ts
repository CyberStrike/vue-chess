import { type Color, type Move, Piece } from './Piece'
import { type BoardState } from '@/ChessBoard'

// possible bishop move offsets
// const bishopMoves: Move[] = [
//   { row: -1, col: -1 },
//   { row: -1, col: 1 },
//   { row: 1, col: -1 },
//   { row: 1, col: 1 },
//   { row: -2, col: -2 },
//   { row: -2, col: 2 },
//   { row: 2, col: -2 },
//   { row: 2, col: 2 },
//   { row: -3, col: -3 },
//   { row: -3, col: 3 },
//   { row: 3, col: -3 },
//   { row: 3, col: 3 },
//   { row: -4, col: -4 },
//   { row: -4, col: 4 },
//   { row: 4, col: -4 },
//   { row: 4, col: 4 },
//   { row: -5, col: -5 },
//   { row: -5, col: 5 },
//   { row: 5, col: -5 },
//   { row: 5, col: 5 },
//   { row: -6, col: -6 }
// ]
export class Bishop extends Piece {
  static buildMoves(row = -1, col = -1, color: Color, board: BoardState): Move[] {
    const moves: Move[] = []

    type offset = Record<string, (row: number, col: number, i: number) => { row: number; col: number }>
    const offsets: offset = {
      upLeft(row: number, col: number, i: number) {
        return { row: row - i, col: col - i }
      },
      upRight(row: number, col: number, i: number) {
        return { row: row - i, col: col + i }
      },
      downLeft(row: number, col: number, i: number) {
        return { row: row + i, col: col - i }
      },
      downRight(row: number, col: number, i: number) {
        return { row: row + i, col: col + i }
      }
    }

    // I don't like this, but it works
    for (const offset in offsets) {
      for (let i = 1; i < 8; i++) {
        const { row: newRow, col: newCol } = offsets[offset](row, col, i)

        const isRowOnBoard = newRow >= 0 && newRow < board.length
        const isColumnOnBoard = isRowOnBoard && newCol >= 0 && newCol < board[newRow].length
        const isMoveOnBoard = isRowOnBoard && isColumnOnBoard

        if (!isMoveOnBoard) break

        const piece = board[newRow][newCol]

        if (piece === null) {
          moves.push({ row: newRow, col: newCol })
        } else {
          if (piece.getColor() !== color) {
            moves.push({ row: newRow, col: newCol })
          }
          break
        }
      }
    }

    return moves
  }

  // Custom logic for capturing for Bishop
  capture() {
    // ... logic for capturing with a bishop
  }

  moves(): Move[] {
    // loop through all possible bishop moves by quadrant (up-left, up-right, down-left, down-right)
    // for each quadrant, loop through all possible moves until we hit a piece
    // if we hit a piece, check if it's an enemy piece
    // if it's an enemy piece, add it to the list of moves
    // if it's a friendly piece, don't add it to the list of moves
    // if we hit an empty space, add it to the list of moves
    // return the list of moves

    const moves: Move[] = []

    if (this.board === undefined) return moves
    if (this.position === undefined) return moves

    const board = this.board.getState()
    const { row, col } = this.findPosition()

    return Bishop.buildMoves(row, col, this.color, board)
  }

  toString(): string {
    return this.color === 'b' ? '♗' : '♝'
  }
}
