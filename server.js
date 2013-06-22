// var lang = (process.argv[2]) ? process.argv[2] : 'fr';

var express = require('express'), app = express();

var mongoose = require('mongoose');

var lang = require('./modules/lang')(process.argv[2]);

var pages = require('./modules/i18n/'+ lang).pages;

pages.common.lang = lang;

var config = require('./modules/config')(app, express);

mongoose.connect('mongodb://localhost/visits');

var models = {};
models.visits = require('./models/visits')(mongoose);

require('./controllers/main')(app, models, pages);

app.listen(process.env.PORT || 2013);

console.log('Server started');