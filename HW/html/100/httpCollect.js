'use strict'

const http = require('http');
const { argv } = require('process');

function getUrl(url){
    let myData = '';
    http.get(url, (res) => {
        res.setEncoding('utf8');
        res.on('data', (data) => {
             myData += data;
        });
        res.on('end', (e) => {
            console.log(myData.length);
            console.log(myData);
        });
    });
}
getUrl(`${argv[2]}`);