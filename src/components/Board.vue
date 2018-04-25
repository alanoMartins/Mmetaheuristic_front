<template>
    <v-stage :config="board">
      <v-layer>
        <v-rect :config="board"></v-rect>
      </v-layer>
      <v-layer>
        <v-rect :config="piece" v-for="piece in transform_data"></v-rect>
      </v-layer>
    </v-stage>
</template>

<script>
import BoardService from '../services/BoardService'

export default {
  // mixins: [BoardService],
  name: 'Board',
  methods: {
    fetchData: function() {
        var self = this;
        return this.$http.get('boards/5adfded05124b9ca7f8c9318').then( board => {
          console.log(board);
          this.board = board.body;
          this.board.fill = 'red';
          this.board.stroke = 'black';
          this.board.strokeWidth = 4;
          return board.body
        });
    },
    fillBoard: function(board) {
      const data_full = board;
      const data = board.pierces;
      var line_x = 0;
      var line_y = 0;
      for (let i = 0; i < data.length; i++) {

        data[i].fill = 'green';
        data[i].stroke = 'black';
        data[i].strokeWidth = 1;

        if (data[i].height + line_y > board.height) {
          data[i].x = 99999;
          data[i].y = 99999;
          console.log('Error: Tentando inserir um item que não cabe no board');
        }

        if (i == 0) {
          data[i].x = 0;
          data[i].y = 0;
          line_x = data[i].width;
          continue;
        }

        if (data[i].width + line_x > board.width) {
          const heights = data.filter(d => d.y != undefined && d.y === line_y).map(x => x.height);
          data[i].x = 0;
          data[i].y = line_y + heights[0];
          line_x = data[i].width;
          line_y += data[i].height;
          continue;
        }

        data[i].x = line_x;
        data[i].y = line_y;
        line_x += data[i].width;
        //line_y = line_y += data[i].height;
      }

      this.transform_data = data;
    }
  },
  mounted () {
        this.fetchData().then(board => this.fillBoard(board));
    },
  data() {
    return {
      aboard: {
        height: 300,
        width: 300
      },
      transform_data: []
    }
  }
}
</script>
