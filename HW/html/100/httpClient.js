'use strict';

const http = require('http');
const { argv } = require('process');

function getUrl(url){
    http.get(url, (res) => {
        res.setEncoding('utf8');
        res.on('data', (data) => {
            console.log(data);
        });
    }).on('error', (err)=>{
        console.error(err.message);});
}

//getUrl(`http://www.${argv[2]}`);
getUrl(`${argv[2]}`);