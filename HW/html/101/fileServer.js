const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    /*let data = '';
    let stream = */fs.createReadStream(`${process.argv[3]}`).pipe(res);
    // stream.on('data', (chunk => {
    //     data += chunk;
    // }));
    // stream.on('error', (err) =>{
    //     console.log(`${err.name} -- ${err.message}`);
    // });
    // stream.on('end', () => {
    //     res.write(data);
    //     res.end;
    // });
}).listen(process.argv[2]);