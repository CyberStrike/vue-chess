import { type ChessBoard } from '@/ChessBoard'

export type Color = 'w' | 'b'

export interface Move {
  row: number
  col: number
  promote?: boolean
}

export class Piece {
  protected board: ChessBoard
  protected color: Color = 'w'
  protected position: Move | undefined
  public icons: Record<Color, string> = { w: '◦', b: '◦' }
  public id: number = Math.floor(Math.random() * 100000)

  constructor(board: ChessBoard, color: Color) {
    this.board = board
    this.color = color
    this.position = this.findPosition()
  }

  // Common methods for all chess pieces
  getColor(): Color {
    return this.color
  }

  // ... logic for getting valid moves for a chess piece
  moves(): Move[] {
    return []
  }

  // Common logic for capturing chess pieces
  capture() {
    // ... logic for capturing chess pieces
  }

  findPosition(): Move {
    const board = this.board.getState()

    // console.log({ board })

    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        // console.log({ row, col, piece: board[row][col] })
        if (board[row][col]?.id === this.id) {
          this.position = { row, col }
          // console.log({ row, col })
          return { row, col }
        }
      }
    }

    return { row: -1, col: -1 }
  }

  setPosition(position: Move | undefined) {
    this.position = position
  }

  toString(): string {
    return this.icons[this.color]
  }
}
