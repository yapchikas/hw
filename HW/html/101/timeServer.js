const net = require('net');


const server = net.createServer((socket) => {
    const clock = new Date();
    const year = clock.getFullYear();
    const month = (clock.getMonth() + 1).toString().padStart(2, '0');
    const date = clock.getDate().toString().padStart(2, '0');
    const hour = clock.getHours().toString().padStart(2, '0');
    const minute = clock.getMinutes().toString().padStart(2, '0');

    socket.write(`${year}-${month}-${date} ${hour}:${minute}\n`);
    socket.end('');

});
server.listen(process.argv[2]);
