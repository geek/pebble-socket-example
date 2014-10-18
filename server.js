var Hapi = require('hapi');
var Ws = require('ws');

var webSockets = [];
var server = new Hapi.Server(8000);

server.start(function () {

    var ws = new Ws.Server({ server: server.listener });
    ws.on('connection', function (socket) {

        socket.send('Welcome');
    });

    webSockets.push(ws);
});


process.stdin.on('data', function (data) {

    transmit(data)
});

var transmit = function (data) {

    try {
        webSockets.forEach(function (ws) {

            if (!ws || !ws.clients) {
                return;
            }

            for (var i = 0, il = ws.clients.length; i < il; ++i) {
                var client = ws.clients[i];
                if (client && client.send) {
                    client.send(data.toString());
                }
            }
        });
    }
    catch (err) {}
};
