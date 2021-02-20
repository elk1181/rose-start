
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

var flow_log;
const router = express.Router();

const pdfMake = require('./pdfmake');
const vfsFonts = require('./vfs_fonts');

pdfMake.vfs = vfsFonts.pdfMake.vfs;
/*
fs.readFile('./info.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err)
        return
    }
    flow_log = JSON.parse(jsonString);
    console.log('File data:', flow_log['first_name']) 
})

*/



function work(){
    var l = []
    for(var i=0;i<jsonData[0].work_experience.length;i++){
        l.push(
        {
            text: jsonData[0].work_experience[i].company_name+", "+jsonData[0].work_experience[i].position,
            style: "subheader2"
        },{
			ul: jsonData[0].work_experience[i].job_description.split('.'),            
            style: "subheader3"
        }
        
        )
    }
    return l
}

function projects(){
    var l = []
    for(var i=0;i<jsonData[0].projects.length;i++){
        l.push(
        {
            text: jsonData[0].projects[i].project_name,
            style: "subheader2"
        },{
			ul: jsonData[0].projects[i].description.split('.'),            
            style: "subheader3"
        },
        {
        text: "Technologies: "+jsonData[0].projects[i].technologies,
        style: "subheader3"
        }
        )
    }
    return l
}

function activities(){
    var l = []
    for(var i=0;i<jsonData[0].activities.length;i++){
        l.push(
        {
            text: [jsonData[0].activities[i].activity_name,
            { text:  jsonData[0].activities[i].start_date, fontSize: 15, alignment: 'right'}
        ],
            style: "subheader2"
        },{
			ul: jsonData[0].activities[i].description.split('.'),            
            style: "subheader3"
        }
        )
    }
    return l
}

app.post('/pdf', (req, res, next)=>{
    //res.send('PDF');

    //const fname = req.body.fname;
    //const lname = req.body.lname;

    var documentDefinition = {
        content: [
            {
                text: jsonData[0].first_name+" "+jsonData[0].last_name,
                style: 'header'
            },
            {
                text: jsonData[0].email+","+jsonData[0].phone+","+jsonData[0].town+'\n',
                style: 'subheader3'
            },
            
            {
                text: "Education"+'\n',
                style: 'subheader'
            },
            {
            text:jsonData[0].school,
            style:'subheader2'
            },
            {
            text:"Bachelor of Science " + jsonData[0].major + ", Minor in "+ jsonData[0].minor[0],
            style:'subheader3'

        },
        {
            text: "Relevant Coursework: "+jsonData[0].courses+'\n',
            style: 'subheader3'
        }
        ,
            {
                text: "Experience",
                style: 'subheader'
            },
        
            work()
            ,'\n',
            {
                text: "Projects",
                style: 'subheader'
            },
            projects(),'\n',
            {
                text: "Activities",
                style: 'subheader'
            },
            activities(),'\n',
            {
                text: "Skills: "+jsonData[0].skills,
                style: 'subheader3'
            },
            {
                text: "Languages: "+jsonData[0].languages,
                style: 'subheader3'
            },
            {
                text: "Awards: "+jsonData[0].awards,
                style: 'subheader3'
            },

            {
                text: 'It is possible to apply multiple styles, by passing an array. This paragraph uses two styles: quote and small. When multiple styles are provided, they are evaluated in the specified order which is important in case they define the same properties',
                style: ['quote', 'small']
            }
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true
                //alignment: 'right'
            },
            subheader: {
                fontSize: 15,
                bold: true
            },
            quote: {
                italics: true
            },
            small: {
                fontSize: 8
            },
            subheader2:{
                bold: true,
                fontSize: 10
            },
            subheader3:{
                fontSize: 10
            }
        }      
    };

    const pdfDoc = pdfMake.createPdf(documentDefinition);
    pdfDoc.getBase64((data)=>{
        res.writeHead(200, 
        {
            'Content-Type': 'application/pdf',
            'Content-Disposition':'attachment;filename="filename.pdf"'
        });

        const download = Buffer.from(data.toString('utf-8'), 'base64');
        res.end(download);
    });

});
