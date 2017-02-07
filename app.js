/* jshint esversion:6 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var conn = mysql.createConnection({
  host      : 'localhost',
  user      : 'root',
  password  : 'ekqlscl135',
  database  : 'o2'
});
conn.connect();

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  // var sql = 'SELECT id, address, description FROM link';
  //
  // conn.query(sql, function(err, topic, fields){
  //
  // });
  res.render('index');
});

app.post('/add', function(req, res){
  var address = req.body.address;
  var description = req.body.description;
  var sql = 'INSERT INTO link (address, description) VALUES(?,?)';

  conn.query(sql, [address, description], function(err, results, fields){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server error');
    }else{
      res.redirect('/');
    }
  });
});


//404 error handling
app.use(function (req, res, next) {
  var error = '<h1>FUCK! 404 Error!</h1>';
  res.status(404).send(error);
});
app.listen(1337, function () {
  console.log('Example app listening on port 1337!');
});
