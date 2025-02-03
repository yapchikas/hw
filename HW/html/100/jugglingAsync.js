'use strict';

const http = require('http');
const { argv } = require('process');

function printUrls(...urlList) {
    let allData = new Array(urlList.length).fill('');
    let count = 0;
    urlList.forEach( (url, index) => {
        http.get(url, (res) => {
            res.setEncoding('utf8');
            res.on('data', chunk => {
                allData[index] += chunk;
            });
            res.on('error', err => {
                console.log(err.message);
            });
            res.on('end', () => {
                if (count === urlList.length - 1) {
                    allData.forEach(data => {
                        console.log(data);
                    });
                }
                count++;
                
            });
        });
    });
}

printUrls(argv[2], argv[3], argv[4]);