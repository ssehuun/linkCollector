/* jshint esversion:6 */
/* Hello nodejs*/
var express = require('express');
var app = express();
var bodyParser = require('body-parser');//middleware body-parser가 대기하고 있다가 post request오면 먼저처리
var fs = require('fs');

app.locals.pretty = true;
app.use('/static', express.static('public'));//create a virtual path prefix "static"
app.set('view engine', 'ejs');//link template engine ejs and express
app.set('views', './views');//template enjine directory
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//static file
app.get('/login', function (req, res) {
  var responseText = '<h1>login please!</h1><br>';
  responseText += '<img src="/static/images/photo.png">';
  res.send(responseText);
});

//dynamic expression
app.get('/dynamic', function (req, res) {
  var li = '';
  for(var i=0; i<5; i++){
    li += '<li>last javascript coding</li>';
  }
  var date = Date();
   var output = `
   <!DOCTYPE html>
   <html>
     <head>
       <title>Home</title>
     </head>
     <body>
     Hello dynamic Page!!
      <ul>
      ${li}
      </ul>
       ${date}
     </body>
   </html>`;
  res.send(output);
});

//redner template file
app.get('/template', function(req, res){
  res.render('about', {name:'Fuck', age:'27'});//render template ejs file in views
});
//query string
// app.get('/topic/:id', function(req, res) {
//   //res.send(req.query.id+','+req.query.name);
//     var drinks = [
//         'express is..',
//         'javascript is..',
//         'react is..'
//     ];
//     var output = `
//       <a href="/topic/0">express is ... </a><br>
//       <a href="/topic/1">javascript is ... </a><br>
//       <a href="/topic/2">react is ... </a><br>
//       ${drinks[req.params.id]}
//     `;
//     res.send(output);
// });
app.get('/topic/:id/:heck', function(req, res){
  res.send(req.params.id+','+req.params.heck);
});
app.get('/about', function (req, res) {
  res.render('about', {name:'Sehun'});
});
app.get('/', function (req, res) {
  res.send('<h1>Hello Homepage</h1>');
});
//form path request
app.get('/form', function(req, res){
  res.render('form');
});
//after form button, get request
app.get('/form_receiver', function(req, res){
  //res.send('get request');
  var title = req.query.title;
  var description = req.query.description;
  res.send(title+', '+description);
});
//after form button, post request
app.post('/form_receiver', function(req, res){
  //res.send('post request');
  var title = req.body.title; //bodyParser creates body object
  var description = req.body.description;
  res.send(title+', '+description);
});

//404 error handling
app.use(function (req, res, next) {
  var error = '<h1>FUCK! 404 Error!</h1>';
  res.status(404).send(error);
});
app.listen(1337, function () {
  console.log('Example app listening on port 1337!');
});
