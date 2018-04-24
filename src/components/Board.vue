<template>
  <div>
    <v-stage :config="canvas">
      <v-layer>
        <v-rect :config="board"></v-rect>
      </v-layer>
      <v-layer>
        <v-rect :config="piece" v-for="piece in transform_data"></v-rect>
      </v-layer>
    </v-stage>
    <span style="color:red;""> {{error}} </span>
</div>
</template>

<script>
import BoardService from '../services/BoardService'

export default {
  // mixins: [BoardService],
  name: 'Board',
  data () {
    this.$http.get('/api/board').then(response => {
    this.board = response.body;
  }, response => {
    this.error = "Deu ruim :(";
    console.log("Erro na request");
  });
    return {
      canvas: {
        width: 300,
        height: 300
      },
      board: {
        x: 0,
        y: 0,
        width: 300,
        height: 300,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 4
      },
      pieces: [{
        height: 80,
        width: 65
      },{
        height: 60,
        width: 85
      },{
        height: 60,
        width: 93
      },{
        height: 73,
        width: 115
      },{
        height: 60,
        width: 90
      },{
        height: 73,
        width: 50
      },{
        height: 20,
        width: 50
      },{
        height: 20,
        width: 20
      },{
        height: 20,
        width: 50
      }]
    }
  },
  computed: {
    transform_data: function () {
      const data = this.pieces;
      var line_x = 0;
      var line_y = 0;
      const board = {
        height: 300,
        width: 300
      }
      for (let i = 0; i < data.length; i++) {

        data[i].fill = 'green';
        data[i].stroke = 'black';
        data[i].strokeWidth = 1;

        if (data[i].height + line_y > this.board.height) {
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

        if (data[i].width + line_x > this.board.width) {
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

      return data;
    }
  }
}
</script>
