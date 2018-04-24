export default class BoardService {

  getData() {
    return {
      board: {
        height: 300,
        width: 300,
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
    }
  }
}
