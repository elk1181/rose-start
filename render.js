
'use strict';

let jsonData = require('./info2.json');
var express = require('express');
var path = require('path');
var open = require('open');
var fs = require('fs');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
console.log("hi");



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










app.post('/', function(request, respond) {

//String construction stuff

 
var minors = "<p style=text-align:center;>";
if(Array.isArray(request.body.minor)){
    for(var i=0; i<request.body.minor.length; i++){
    minors+= request.body.minor[i] + ", ";
    }



}
else{
    minors=request.body.minor;
}
minors += "</p>";

var majors = "<p style=text-align:center;>";
if(Array.isArray(request.body.major)){
    for(var i=0; i<request.body.major.length; i++){
    majors+= request.body.major[i] + ", ";
    }



}
else{
    majors=request.body.major;
}
majors += "</p>";

var webSkills = "<p style=text-align:center;>";
if(Array.isArray(request.body.skills)){
for(var i=0; i<request.body.skills.length; i++){
    if (i == request.body.skills.length-1){
        webSkills+= request.body.skills[i];
    }
    else {
        webSkills+= request.body.skills[i] + ", ";
    }
}
}
else{
    webSkills+=request.body.skills;
}
webSkills += "</p>";

var webLanguages = "<p style=text-align:center;>";
if(Array.isArray(request.body.languages)){
for(var i=0; i<request.body.languages.length; i++){
    if (i == request.body.languages.length-1){
        webLanguages+= request.body.languages[i];
    }
    else {
        webLanguages+= request.body.languages[i] + ", ";
    }
}
}
else{
    webLanguages+=request.body.languages;
}
webLanguages += "</p>";

var webAwards = "<p style=text-align:center;>";
if(Array.isArray(request.body.awards)){
for(var i=0; i<request.body.awards.length; i++){
    if (i == request.body.awards.length-1){
        webAwards+= request.body.awards[i];
    }
    else {
        webAwards+= request.body.awards[i] + ", ";
    }
}
}
else{
    webAwards+=request.body.awards;
}
webAwards += "</p>";

//Generated website helper functions
let h2titles = function(title){
    return ("<h2 style='font-size: 40px; text-align:center;'>" + title + "</h2>")
}

let webJobs = function(){
    let arr = [];
if(Array.isArray(request.body["work_experience"]["'company_name'"])){
    for(var i=0;i<request.body["work_experience"]["'company_name'"].length;i++){
        arr.push("<h2 style='text-align:center;'>" + request.body["work_experience"]["'company_name'"][i]+", " + request.body["work_experience"]["'position'"][i] + "</h2>"
        + "<p style='font-style:italic;text-align:center;'>" + request.body["work_experience"]["'start_date'"][i] + " - " + request.body["work_experience"]["'end_date'"][i] + "</p>"
        + "<p style='text-align:center;'>" + request.body["work_experience"]["'job_description'"][i]+ "</p>");
    }
}
else{
     arr.push("<h2 style='text-align:center;'>" + request.body["work_experience"]["'company_name'"]+", " + request.body["work_experience"]["'position'"] + "</h2>"
        + "<p style='font-style:italic;text-align:center;'>" + request.body["work_experience"]["'start_date'"] + " - " + request.body["work_experience"]["'end_date'"] + "</p>"
        + "<p style='text-align:center;'>" + request.body["work_experience"]["'job_description'"] + "</p>");
}
    return arr;
}

let floatingBox = function(firstName, lastName, email){
    return "<h1 style='float:right;background-color:#87CEFA;position:fixed;padding:10px;text-align:center;'>" + firstName + " " + lastName + "<p style='font-style:italic;font-size:20px'>" + email + "</h1>";
}

let webProjects = function(){
    let arr = [];  
if(Array.isArray(request.body["projects"]["'project_name'"])){
  
     for(var i=0;i<request.body["projects"]["'project_name'"].length;i++){
                arr.push("<h2 style='text-align:center;'>" + request.body["projects"]["'project_name'"][i] + "</h2>"
                + "<p style='font-style:italic;text-align:center;'>" + request.body["projects"]["'date'"][i] + "</p>"
                + "<p style='text-align:center;'>" + request.body["projects"]["'description'"][i] + "</p>");
            }



}
else{
    arr.push("<h2 style='text-align:center;'>" + request.body["projects"]["'project_name'"] + "</h2>"
                + "<p style='font-style:italic;text-align:center;'>" + request.body["projects"]["'date'"] + "</p>"
                + "<p style='text-align:center;'>" + request.body["projects"]["'description'"] + "</p>");
}
   
    return arr;
}

let webActivities = function(){
    let arr = [];
if(Array.isArray(request.body["activities"]["'activity_name'"])){
    for(var i=0;i<request.body["activities"].length;i++){
        arr.push("<h2 style='text-align:center;'>" + request.body["activities"]["'activity_name'"][i] + "</h2>"
        + "<p style='font-style:italic;text-align:center;'>" + request.body["activities"]["'start_date'"][i] + "-" + request.body["activities"]["'end_date'"][i] + "</p>"
        + "<p style='text-align:center;'>" + request.body["activities"]["'description'"][i] + "</p>");
    }
}
else{
     arr.push("<h2 style='text-align:center;'>" + request.body["activities"]["'activity_name'"] + "</h2>"
        + "<p style='font-style:italic;text-align:center;'>" + request.body["activities"]["'start_date'"] + "-" + request.body["activities"]["'end_date'"] + "</p>"
        + "<p style='text-align:center;'>" + request.body["activities"]["'description'"] + "</p>");
}
    return arr;
}


//Full css for generated website
var htmlE = "<html><head> <title>" + request.body.first_name + 
"house </title> </head> <body style='background-color:#fff0f5;'><h1 style='text-align:center;border-style:outset;padding:5px;background-color:#87CEFA;'>"
+ request.body.first_name + " " + request.body.last_name + "'s website" +
"<p style='font-style:italic;font-size:75%'>" + request.body.email +
"</p><h2 style ='text-align:center;'>" + request.body.school +
"</h2><h3 style='text-align:center;font-style:italic;'>" + request.body.major +
" major with minors in " + minors + "</h3>" + "</h1>" +
floatingBox(request.body.first_name, request.body.last_name, request.body.email) + 
h2titles("Experience") + webJobs() +
h2titles("Projects") + webProjects() +
h2titles("Activities") + webActivities() +
h2titles("Skills") + webSkills +
h2titles("Languages") + webLanguages +
h2titles("Awards") + webAwards + "</body> </html>"


        console.log(request.body);
        console.log(request.body["projects"]["'project_name'"]);
     
        const file = request.body.last_name + '.html';
    fs.writeFile(file, htmlE, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');



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
