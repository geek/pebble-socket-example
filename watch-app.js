var UI = require('ui');

var ws = new WebSocket('ws://192.168.0.5:8000');    // Replace with IP of computer running server

ws.onmessage = function (event) { 

    var card = new UI.Card();
    card.title('Data from server');
    card.body(event.data);
    card.show();
};


var main = new UI.Card({
  title: 'Connected',
  icon: 'images/menu_icon.png',
  subtitle: 'Waiting for data'
});
main.show();
