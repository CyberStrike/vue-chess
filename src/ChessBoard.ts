import { type Piece } from '@/Piece'
import { Pawn } from '@/Pawn'
import { Rook } from '@/Rook'
import { Knight } from '@/Knight'
import { Bishop } from '@/Bishop'
import { Queen } from '@/Queen'
import { King } from '@/King'

// eslint-disable-next-line @typescript-eslint/array-type
export type BoardState = (Piece | null)[][]
export class ChessBoard {
  boardState: BoardState = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null]
  ]

  reset(): void {
    this.boardState = [
      [
        new Rook(this, 'w'),
        new Knight(this, 'w'),
        new Bishop(this, 'w'),
        new Queen(this, 'w'),
        new King(this, 'w'),
        new Bishop(this, 'w'),
        new Knight(this, 'w'),
        new Rook(this, 'w')
      ],
      [
        new Pawn(this, 'w'),
        new Pawn(this, 'w'),
        new Pawn(this, 'w'),
        new Pawn(this, 'w'),
        new Pawn(this, 'w'),
        new Pawn(this, 'w'),
        new Pawn(this, 'w'),
        new Pawn(this, 'w')
      ],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [
        new Pawn(this, 'b'),
        new Pawn(this, 'b'),
        new Pawn(this, 'b'),
        new Pawn(this, 'b'),
        new Pawn(this, 'b'),
        new Pawn(this, 'b'),
        new Pawn(this, 'b'),
        new Pawn(this, 'b')
      ],
      [
        new Rook(this, 'b'),
        new Knight(this, 'b'),
        new Bishop(this, 'b'),
        new Queen(this, 'b'),
        new King(this, 'b'),
        new Bishop(this, 'b'),
        new Knight(this, 'b'),
        new Rook(this, 'b')
      ]
    ]
  }

  getState() {
    return this.boardState
  }

  setState(boardState: BoardState) {
    this.boardState = boardState
  }

  // Methods for updating the board state, handling moves, captures, etc.
  updateBoardState() {
    // ... logic to update the board state
  }

  handleMove() {
    // ... logic to handle a move
  }

  handleCapture() {
    // ... logic to handle a capture
  }
}
