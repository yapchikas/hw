import express from 'express';
import operatorMiddleware from '../operatorMiddleware.js';
import outputMiddleware from './finalMiddleware.js';

const app = express();

app.use(outputMiddleware);

app.get('/', (req, res, next) => {
    res.statusCode = 200;
    res.end('Welcome To Home Page!');
});

// app.get('/add', (req, res) => {
//     res.statusCode = req.output.statusCode;
//     if (req.output.error === 'true') {
//         res.end(req.output.errMsg);
//     } else {
//         res.end(`${req.output.print.add}`);
//     }
// });

// app.get('/subtract', (req, res) => {
//    res.statusCode = req.output.statusCode; 
//    if (req.output.error === 'true') { 
//         res.end(req.output.errMsg);
//     } else {
//         res.end(`${req.output.print.subtract}`);
//     }
// });

app.get('/add', (req, res) => {
    res.statusCode = req.output.statusCode;
    let a = Number(req.output.params.a)
    let b = Number(req.output.params.b)
    let sum = a+b;
    if (req.output.error === 'true') {
        res.end(req.output.errMsg);
    } else {
        res.end(`${a} + ${b} = ${sum}`);
    }
});

app.get('/subtract', (req, res) => {
    res.statusCode = req.output.statusCode;
    let a = Number(req.output.params.a)
    let b = Number(req.output.params.b)
    let sum = a-b;
    if (req.output.error === 'true') {
        res.end(req.output.errMsg);
    } else {
        res.end(`${a} - ${b} = ${sum}`);
    }
});


app.get('/operator', operatorMiddleware);

app.get('*', (req, res, next) => {
    
    res.status(404).send('<h1>404. Page not found</h1>');
    res.end();

});

app.listen(80);
