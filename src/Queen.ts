import { type Move, Piece } from './Piece'
import { Rook } from '@/Rook'
import { Bishop } from '@/Bishop'

export class Queen extends Piece {
  icons = { w: '♕', b: '♛' }

  moves(x?: number, y?: number): Move[] {
    if (this.board === undefined) return []
    if (this.position === undefined) return []

    const board = this.board.getState()
    const { row, col } = this.findPosition()

    return [new Rook(this.board, this.color), new Bishop(this.board, this.color)].reduce((acc: Move[], piece) => {
      piece.setPosition({ row, col })
      console.log({ moves: piece.buildMoves(row, col, this.board.getState()) })
      return acc.concat(piece.moves())
    }, [])
  }
}
