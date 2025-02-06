export default (req, res, next) => {
    let a = req.query.a;
    let b = req.query.b;
    let operator = req.query.operator;
    res.statusCode = 500;

    if (a == null || b == null || operator == null) {
        res.end('Missing Parameters');
    } else if (a === '' || b === '' || operator === ''){
        res.end('Missing Value(s)');
    } else if ((operator !== '+' && operator !== '-' && operator !== '*' && operator !== '/') || Number.isNaN(Number(a) + Number(b))) {
        res.end('Invalid Value(s)');
    } else {
        let result = null;
        a = Number(a);
        b = Number(b);
        switch (operator) {
            case '+':
                result = a + b;
                break;
            case '-':
                result = a - b;
                break;
            case '*':
                result = a * b;
                break;
            case '/':
                result = a / b;
                break;
            default:
                break;
        }
        res.statusCode = 200;
        res.end(`${a} ${operator} ${b} = ${result}`)
    }
};