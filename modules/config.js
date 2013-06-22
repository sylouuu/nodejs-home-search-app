module.exports = function(app, express, mongoose){

	var path = require('path');
	var config = this;

	app.configure(function() {
		app.engine('.html', require('ejs').__express)
		.set('views', path.join(__dirname +'/../views'))
		.set('view engine', 'html')
		.use(express.bodyParser())
		.use(express.cookieParser())
		.use(express.session({ secret: 'topsecret' }))
		.use(app.router)
		.use('/assets', express.static(path.join(__dirname +'/../assets')));
	})

	.configure('development', function() {
		app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
	})

	.configure('production', function() {
		app.use(express.errorHandler());
	});

	return config;

};