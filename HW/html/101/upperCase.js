const http = require('http');

http.createServer((req, res) =>{
    if (req.method === 'POST')
        {   
            let body ='';
            req.on('data', (chunk)=>{
                body += chunk;
            });
            req.on('end', () => {
                res.writeHead(200, {'Content-Type' : 'text/plain'});
                res.write(body.toString().toUpperCase());
            });
        }
      
}).listen(process.argv[2]);