const http = require('http');
const { URL } = require('url');
let base = 'http://localhost';

function parseTime(urlString) {
    let urlData = new URL(urlString, base);
    let urlDate = urlData.searchParams.get('iso');
    let clock = new Date(urlDate);

    return {
        hour: clock.getHours(),
        minute: clock.getMinutes(),
        second: clock.getSeconds()
    };
     
}

function parseEpochTime(urlString) {
    let urlData = new URL(urlString, base);
    let urlDate = urlData.searchParams.get('iso');
    let clock = new Date(urlDate);

    return { unixtime: clock.getTime() };
}

http.createServer((req, res) => {
    
    let urlData = new URL(req.url, base);
    let pathName = urlData.pathname;
    if (req.method === 'GET') {

        res.writeHead(200, { 'Content-Type': 'application/json' });

        switch (pathName) {

            case '/api/parsetime': {
                res.write(JSON.stringify(parseTime(req.url)));
                res.end();
                break;
            }
            case '/api/unixtime': {
                res.write(JSON.stringify(parseEpochTime(req.url)));
                res.end();
                break;
            }
            default:
                res.end();
                break;
        }
    }

}).listen(process.argv[2]);