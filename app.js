var pg = require('pg');
var express=require('express');
var path=require('path');
var expressHBS = require('express-handlebars');
var bodyParser= require('body-parser');
var app=express();
app.set('views',path.join(__dirname,'views'));
console.log(__dirname);
app.engine('hbs',expressHBS({defaultLayout:'main'}))
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'lib' )));

var config = {
    user: 'suraj', //env var: PGUSER
    database: 'recipebookdb', //env var: PGDATABASE
    password: 'suraj', //env var: PGPASSWORD
    host: 'localhost', // Server hosting the postgres database
    port: 5432, //env var: PGPORT
};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
var pool = new pg.Pool(config)
app.get('/', function(req,res){
    pool.connect(function(err, client, done) {

        if(err) {
            return console.error('error fetching client from pool', err);
        }
        client.query('SELECT * FROM recipes', function(err, result) {
            //call `done()` to release the client back to the pool

            if(err) {
                return console.error('error running query', err);
            }

            res.render('home', {recipes: result.rows});
            done();
        });
    });
});

app.post('/add', function(req,res){

    pool.connect(function(err, client, done){
        if(err){
            return console.log("error fetching client from pool", err);
        }
        client.query("INSERT INTO recipes(name ,ingredients, directions) VALUES($1, $2, $3)",[req.body.name,  req.body.ingredients, req.body.directions]);
        done();
        res.redirect('/');
    });
});

app.post('/edit', function(req,res){
    console.log(req.body.id);
    pool.connect(function(err, client, done){
        if(err){
            return console.log("error fetching client from pool", err);
        }
        client.query("UPDATE recipes set name=$1, ingredients=$2, directions=$3 WHERE id=$4",[req.body.name, req.body.ingredients, req.body.directions, req.body.id]);
        done();
        res.redirect('/');
    });

});

app.delete('/delete/:id', function(req,res){
    pool.connect(function(err, client, done){
        if(err){
            return console.log("error fetching client from pool", err);
        }
        client.query("DELETE FROM recipes WHERE id=$1",[req.params.id]);
        done();
        res.sendStatus(200);
    });

});

var port=4000;
app.listen(port,function(req,res){
   console.log('server is running on '+port);
});
