
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res) {
	console.log(req, res);
	res.render('index.jade', {title:'Understanding jQuery.Deferred and Promise'});
});

app.get('/basics', function(req, res) {
	res.render('basics.jade', {});
});

app.get('/what-you-know', function(req, res) {
	res.render('what-you-know.jade', {});
});

app.get('/then-when', function(req, res) {
	res.render('then-when.jade');
});

app.get('/notify-progress', function(req, res) {
	res.render('notify-progress.jade', {});
});

app.get('/example-1', function(req, res) {
	res.render('example-1.jade', {title:"Example 1"});
});

app.get('/race-condition', function(req, res) {
	res.render('race-condition.jade', {title:"Race Conditions"});
});

app.get('/cache', function(req, res) {
	res.render('cache.jade', {title:"API Cache"});
});

app.get('/wait', function(req, res) {
	console.log(req.query);
	setTimeout(function() {
		console.log('x');
		res.send(req.query.name);
	}, Number(req.query.wait));
});

app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
