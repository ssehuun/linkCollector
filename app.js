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

app.get('/index', function (req, res) {
  var sql = 'SELECT id, title, description FROM link';

  conn.query(sql, function(err, links, fields){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }else{
      res.render('index', {links:links});
    }
  });
});

app.get('/add', function(req, res){
  var sql = 'SELECT id, title, description FROM link';
  conn.query(sql, function(err, links, fields){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server error');
    }else{
      res.render('add', {links:links});
    }
  });
});

app.post('/add', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  var sql = 'INSERT INTO link (title, description) VALUES(?,?)';

  conn.query(sql, [title, description], function(err, links, fields){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server error');
    }else{
      res.redirect('/add');
    }
  });
});


app.get('/edit', function(req, res){
  var title = req.query.title;
  var sql = 'SELECT * From link WHERE title=?';
  conn.query(sql, [title], function(err, link, fiedls){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server error');
    }else{
      res.render('edit', {link:link});
    }
  });
});

app.post('/edit', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  var sql = 'UPDATE link SET description=? WHERE title=?';
  conn.query(sql, [description, title], function(err, links, fields){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server error');
    }else{
      res.redirect('/add');
    }
  });
});

app.post('/delete', function(req, res){
  var title = req.body.title;
  var sql = 'DELETE from link WHERE title=?';
  conn.query(sql, [title], function(err, links, fields){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server error');
    }else{
      res.redirect('/add');
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
