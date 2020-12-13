/* globals AFRAME */
/* globals NAF */

AFRAME.registerComponent('update-rate', {
  schema: {
    rate: { type: "int", default: 10 }
  },

  update: function() {
    var data = this.data;

    let clients,
      clientList,
      scene = document.querySelector("a-scene");

    //When client connects, update client number and rate if necessary
    document.body.addEventListener("clientConnected", function(evt) {
      clients = NAF.connection.getConnectedClients();
      clientList = Object.keys(clients).length + 1;
      console.log("The number of users is: " + clientList);

      updateRate();
      NAF.options.updateRate = data.rate;
      console.log(data.rate);
    });

    //When client disconnects, update client number and rate if necessary
    document.body.addEventListener("clientDisconnected", function(evt) {
      clients = NAF.connection.getConnectedClients();
      clientList = Object.keys(clients).length;
      console.log("The number of users is: " + clientList);

      updateRate();
      NAF.options.updateRate = data.rate;
      console.log(data.rate);
      
    });

    function updateRate() {
      if (clientList <= 15) {
        data.rate = 10;
      } else if(clientList <= 25) {
        data.rate = 8;
      } else if(clientList <= 35) {
        data.rate = 6;
      } else if(clientList <= 45) {
        data.rate = 4;
      } else {
        data.rate = 1;
      }
    }
  }

  /*update: function() {
          NAF.options.updateRate = this.data.rate;
        }*/

  /*tick: function(){
          let scene = document.querySelector('a-scene');
          let fps = parseFloat(this.fpsDiv.innerHTML, 10);
          
          console.log(fps);
          
        }*/
});