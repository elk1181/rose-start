
'use strict';

let jsonData = require('./info.json');
var express = require('express');
var path = require('path');
var open = require('open');
var fs = require('fs');


var port = 3000;
var app = express();

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'information.html'));
});
var minors = "";
for(var i=0; i<jsonData[1].minor.length; i++){
minors+= jsonData[1].minor[i] + ", ";
}
var html = "<html><head> <title>" + jsonData[1].first_name +  "house </title> </head> <body style='background-color:teal'>" + jsonData[0].first_name + " " + jsonData[0].last_name + "'s website <br> <br>" +  " "+  jsonData[0].school+ "<br> <br>" + jsonData[0].major + " major with minors in " + minors + "</body> </html>"

app.post('/', function(request, respond) {
    fs.writeFile('message.html', html, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');


const file = `message.html`;
respond.download(file); // Set disposition and send it.

    });
});

app.listen(port, function(err){
    if(err){
        console.log(err);
    }else{
        open('http://localhost:' + port);
    }
});
