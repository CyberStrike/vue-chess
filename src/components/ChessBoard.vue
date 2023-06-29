<template>
  <div>
    <button @click="game.reset()">New Game</button>
    <!--    col labels A-H -->
    <div class="flex flex-center row-reverse">
      <div class="flex flex-center w-50 h-50">★</div>
      <div v-for="col in 8" :key="col" class="flex flex-center w-50 h-50">
        {{ String.fromCharCode(col + 64) }}
      </div>
      <div class="flex flex-center w-50 h-50">★</div>
    </div>
    <div class="flex flex-center">
      <div class="flex col">
        <div v-for="row in 8" :key="row" class="flex flex-center w-50 h-50">
          {{ row }}
        </div>
      </div>
      <div class="chess-board">
        <div v-for="row in 8" :key="row" class="chess-row">
          <div v-for="col in 8" :key="col" @mouseenter="setPreview(row, col)">
            <template v-if="state[row - 1][col - 1]">
              {{ state[row - 1][col - 1] }}
            </template>
            {{ possibleMoves.some(({ row: r, col: c }) => r + 1 === row && c + 1 === col) ? '.' : '' }}
          </div>
        </div>
      </div>
      <div class="flex col">
        <div v-for="row in 8" :key="row" class="flex flex-center w-50 h-50">
          {{ row }}
        </div>
      </div>
    </div>
    <div class="flex flex-center row-reverse">
      <div class="flex flex-center w-50 h-50">★</div>
      <div v-for="col in 8" :key="col" class="flex flex-center w-50 h-50">
        {{ String.fromCharCode(col + 64) }}
      </div>
      <div class="flex flex-center w-50 h-50">★</div>
    </div>
  </div>
</template>

<script>
  import { ChessBoard } from '@/ChessBoard'
  import { Queen } from '@/Queen'

  // <component :is="state[row - 1][col - 1].constructor.name" :piece="state[row - 1][col - 1]" />

  export default {
    name: 'ChessBoard',
    data: () => ({
      game: new ChessBoard(),
      preview: null
    }),
    computed: {
      state() {
        return this.game.getState()
      },
      possibleMoves() {
        if (this.preview) {
          return this.preview.moves()
        } else {
          return []
        }
      }
    },
    mounted() {
      this.game.setState([
        [null, null, null, new Queen(this.game, 'w'), null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, new Queen(this.game, 'w'), null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, new Queen(this.game, 'b'), null, null, null, null]
      ])

      this.setPreview(5, 5)
    },
    methods: {
      setPreview(row, col) {
        console.log(this.state[row - 1][col - 1])
        this.preview = this.state[row - 1][col - 1]
      },
      removeCurrent() {
        this.current = null
      },
      move(row, col) {
        this.game.move(this.current, row, col)
      },
      reset() {
        this.game.reset()
      }
    }
  }
</script>

<style scoped>
  .chess-board {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    background-color: #26190d;
    font-size: 2em;
  }

  .chess-row {
    display: flex;
  }

  .chess-row div {
    width: 50px;
    height: 50px;
  }

  .chess-row:nth-child(odd) div:nth-child(odd) {
    background-color: #b58863;
  }

  .chess-row:nth-child(even) div:nth-child(even) {
    background-color: #b58863;
  }

  .flex {
    display: flex;
  }

  .row {
    flex-direction: row;
  }

  .col {
    flex-direction: column;
  }

  .row-reverse {
    flex-direction: row-reverse;
  }

  .flex-center {
    align-items: center;
    justify-content: center;
  }

  .w-50 {
    width: 50px;
  }

  .h-50 {
    height: 50px;
  }
</style>
