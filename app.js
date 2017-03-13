"use strict";


// RESTFULL API - NODEJS & EXPRESSJS


// NODE MODULES
const express = require('express'),
      cors = require('cors'),
      bodyParser = require('body-parser'),
      compression = require('compression');


// PROJECT CONFIG
const PROJECT_CONFIG = require('./config/project.config.js');


// INIT EXPRESS APP ---> https://expressjs.com/en/4x/api.html
const app = express();


// Sets variables host & port in app object
app.set('host', process.env.NODE_IP || 'localhost');
app.set('port', process.env.NODE_PORT || 4000);


// Enables all Cross-Origin Resource Sharing (CORS) requests, more info about CORS middleware ---> https://github.com/expressjs/cors#cors
app.use(cors());


// Parses incoming request bodies before your handler start, more info about BODY PARSER middleware ---> https://github.com/expressjs/body-parser#body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// Redirects all insecure requests to secure protocol HTTPS only in production environment
/*
if (app.get('env') === 'production') {
    
    app.use(function(req, res, next) {
        var protocol = req.get('x-forwarded-proto');
        
        protocol === 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
    });
    
}
*/


// Compresses response bodies for all request, more info about COMPRESSION middleware ---> https://github.com/expressjs/compression#compression
app.use(compression({threshold: 0}));


// Serves static files from the directory, which is defined in the project.config.js file
app.use('/', express.static(PROJECT_CONFIG.DIRECTORY.STATIC_DIR));


// Simple routes to send the appropriate index file
app.get(['/', '/:lang', '/:lang/*'], function (req, res) {
    
    var value = req.params.lang,
        lang = PROJECT_CONFIG.LANGUAGES.includes(value) ? value : PROJECT_CONFIG.LANGUAGES[0],
        index = 'index-' + lang + '.html';
    
    
    res.setHeader('Content-Type', 'text/html');
    
    res.sendFile(index, {
        maxAge: 86400000,
        root: PROJECT_CONFIG.DIRECTORY.STATIC_DIR
    });
    
});


// Runs the server
app.listen(app.get('port'), app.get('host'), function() {

    console.log('Express server listening on port ' + app.get('port'));

});