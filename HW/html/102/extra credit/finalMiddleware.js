export default (req, res, next) => {

    let a = req.query.a;
    let b = req.query.b;

    let output = {
        statusCode: '500',
        error: 'true',
        errMsg: 'generic error',
        // print: {
        //     multiply: '',
        //     divide: '',
        //     add: '',
        //     subtract: ''
        // },
        // sum: {
        //     multiply: '',
        //     divide: '',
        //     add: '',
        //     subtract: ''
        // },
        params: {
            a: a,
            b: b,
        }
    }

    if (a == null || b == null) {
        output.errMsg = 'Missing Parameter(s)';

    }
    else if (Number.isNaN(Number(a) + Number(b))) {


        output.errMsg = 'Missing Proper Value(s)';

    } else if (a === '' || b === '') {

        output.errMsg = 'Missing Value(s)';

    } else {
        
        a = Number(a);
        b = Number(b);
       
        output.statusCode = '200';
        output.errMsg = 'Success!';
        output.error = 'false';
       
        // output.print.multiply = `${a} * ${b} = ${a * b}`;
        // output.print.divide = `${a} / ${b} = ${a / b}`;
        // output.print.add = `${a} + ${b} = ${a + b}`;
        // output.print.subtract = `${a} - ${b} = ${a - b}`;
        
        // output.sum.multiply = String(a * b);
        // output.sum.divide = String(a / b);
        // output.sum.add = String(a + b);
        // output.sum.subtract = String(a - b);

    }

    req.output = output;
    next();

};