var express = require('express'), app = express(), port = 2013;

var mongoose = require('mongoose');

var lang = require('./modules/lang')(process.argv[2]);

var pages = require('./modules/i18n/'+ lang).pages;
pages.common.lang = lang;

var config = require('./modules/config')(app, express);

mongoose.connect('mongodb://localhost/visits');

var models = {};
models.visits = require('./models/visits')(mongoose);

require('./controllers/main')(app, models, pages);

app.listen(port);

console.log('[LOG]	Server started on port '+ port);