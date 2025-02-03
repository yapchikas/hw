'use strict';

const fs = require('fs');

const path = require('path');


function fileFilter(filePath, ext) {
    fs.readdir(filePath, (err, list) =>{
        if (err){
            console.log(`${err.code} - ${err.message}`);
        }
        for (let i = 0; i<list.length; i++) {

            if (path.extname(list[i]) === `.${ext}`){

                console.log(list[i]);
            }
        }
    });
};

fileFilter(process.argv[2], process.argv[3]);
