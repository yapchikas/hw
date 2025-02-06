import express from 'express';
import operatorMiddleware from './operatorMiddleware.js';

const app = express();

app.get('/', (req, res, next) => {
    res.write('Welcome To Home Page!')
    res.end();
});

app.get('/add', (req, res) => {
    let a = req.query.a;
    let b = req.query.b;

    if (a == null || b == null) {
        res.statusCode = 500;
        res.end(`Please Enter Valid Query Parameters`)
    } else if (Number.isNaN(Number(a) + Number(b))) {
        res.statusCode = 500;
        res.end('Please Enter Valid Values For \'a\' And \'b\'');
    } else {
        res.end(`${a} + ${b} = ${Number(a) + Number(b)}`);
    }
});

app.get('/subtract', (req, res) => {
    let a = req.query.a;
    let b = req.query.b;

    if (a == null || b == null) {
        res.statusCode = 500;
        res.end(`Please Enter Valid Query Parameters`)
    } else if (Number.isNaN(Number(a) - Number(b))) {
        res.statusCode = 500;
        res.end('Please Enter Valid Values For \'a\' And \'b\'');
    } else {
        res.end(`${a} - ${b} = ${Number(a) - Number(b)}`);
    }
});

app.get('/operator', operatorMiddleware);

app.get('*', (req, res, next) => {
    res.status(404).send('<h1>404. Page not found</h1>');
    res.end();
});

app.listen(80);
