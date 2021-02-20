
'use strict';

let jsonData = require('./info2.json');
var express = require('express');
var path = require('path');
var open = require('open');
var fs = require('fs');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();




var port = 3000;
var app = express();
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'information.html'));
});

var minors = "";
for(var i=0; i<jsonData[1].minor.length; i++){
minors+= jsonData[1].minor[i] + ", ";
}
var html = "<html><head> <title>" + jsonData[1].first_name +  "house </title> </head> <body style='background-color:teal'>" + jsonData[0].first_name + " " + jsonData[0].last_name + "'s website <br> <br>" +  " "+  jsonData[0].school+ "<br> <br>" + jsonData[0].major + " major with minors in " + minors + "</body> </html>"

app.post('/', function(request, respond) {
    var minors = "";
    if(Array.isArray(request.body.minor)){
    for(var i=0; i<request.body.minor.length; i++){
    minors+= request.body.minor[i] + ", ";
    }
}
else{
    minors=request.body.minor;
}
    var htmlE = "<html><head> <title>" + request.body.first_name +  "house </title> </head> <body style='background-color:teal'>" + request.body.first_name + " " + request.body.last_name + "'s website <br> <br>" +  " "+  request.body.school+ "<br> <br>" + request.body.major + " major with minors in " + minors + "</body> </html>"
    
        console.log(request.body);
      
     

    fs.writeFile('message.html', htmlE, (err) => {
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

function spaces(s,s2){
    var e=""
    console.log(s.length+s2.length)
    for(var i=s.length+s2.length;i<168;i++){
        e+=" "
    }
    console.log(e.length)
    return e
}  

function work(){
    var l = []
    for(var i=0;i<jsonData[0].work_experience.company_name.length;i++){
        l.push(
        {
            text: [jsonData[0].work_experience.company_name[i]+", "+jsonData[0].work_experience.position[i]+"   ",
            {text: "("+jsonData[0].work_experience.start_date[i]+" - "+jsonData[0].work_experience.end_date[i]+")", style:"dates"}],
            style: "subheader2"
        },{
			ul: jsonData[0].work_experience.job_description[i].split('.'),            
            style: "subheader3"
        }
        
        )
    }
    return l
}

function projects(){

    var l = []
    for(var i=0;i<jsonData[0].projects.project_name.length;i++){
        l.push(
        {
            text: [jsonData[0].projects.project_name[i]+"   ",
            {text: "("+jsonData[0].projects.date[i]+")", style:"dates"}],
            style: "subheader2"
        },{
			ul: jsonData[0].projects.description[i].split('.'),            
            style: "subheader3"
        },
        {
        text: "Technologies: "+jsonData[0].projects.technologies[i],
        style: "subheader3"
        }
        )
    }
    return l
}

function activities(){
    var l = []
    for(var i=0;i<jsonData[0].activities.activity_name.length;i++){
        l.push(
        {
            text: [jsonData[0].activities.activity_name[i]+"   ",
            {text: "("+jsonData[0].activities.start_date[i]+" - "+jsonData[0].activities.end_date[i]+")", style:"dates"}
        ],
            style: "subheader2"
        },{
			ul: jsonData[0].activities.description[i].split('.'),            
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
                text: jsonData[0].email+"/"+jsonData[0].phone+"/"+jsonData[0].town,
                style: 'subheader3'
            },
            '\n',
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
            text: "Relevant Coursework: "+jsonData[0].courses,
            style: 'subheader3'
        }
        ,'\n',
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
            },
            dates:{
                alignment: 'right',
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
