"use strict";


// RESTFULL API - NODEJS & EXPRESSJS


// NODE MODULES
const express = require('express'),
      cors = require('cors'),
      bodyParser = require('body-parser'),
      compression = require('compression'),
      chalk = require('chalk');


// PROJECT CONFIG
const PROJECT_CONFIG = require('./config/project.config.js');


// USEFUL FUNCTIONS
// To display a console log message in four types: success, info, warning and error
function alertHandler (args) {
    
    args = args || {};
    
    let types = {
        success: 'green',
        info: 'blue',
        warning: 'yellow',
        error: 'red'
    },
        type = args.type || 'info',
        title = args.title || type,
        message = args.message || 'Remember to specify necessary property type & message in a configuration object.',
        color = types[type],
        messageTemplate = `
**~~~~~~~~* ${title.toUpperCase()} LOG - OPEN *~~~~~~~~**
${message}
**~~~~~~~~* ${title.toUpperCase()} LOG - CLOSE *~~~~~~~~**`;
    
    console.log(chalk[color](messageTemplate));
    
};


// To create full URL address as a value (string) or false (boolean)
function createFullUrl (lang, url) {
    
    return lang && url ? `/${lang}/${url}` : false;
    
};


// To create file full name as a value (string) or false (boolean)
function createFileFullName (name, lang) {
    
    return name && lang ? `${name}-${lang}.html` : false;
    
};


// To create redirect page as a value (object)
function createPageRedirect (args) {
    
    args = args || {};
    
    let self = {
        statusCode: args.statusCode || PROJECT_CONFIG.HTTP_CODE.REDIRECT,
        redirect: {
            url: args.url || createFullUrl(PROJECT_CONFIG.LANGUAGES[0], getPage( {param: 'name', value: '404 page'} ).url)
        }
    };
    
    return self;
    
};


// To get supported language as a value (string) or false (boolean)
function getLang (arg) {
    
    return PROJECT_CONFIG.LANGUAGES.includes(arg) ? arg : false;
    
};


// To get existed page as a value (object) or false (boolean)
function getPage (args) {
    
    args = args || {};
    
    if (!args.value) {
        return false;
    }
    
    let searchTypes = ['name', 'url'],
        searchParam = searchTypes.includes(args.param) ? args.param : 'name',
        searchValue = args.value,
        pages = PROJECT_CONFIG.PAGES;
    
    for (let i in pages) {
        if (pages[i][searchParam] === searchValue) {
            pages[i].statusCode = pages[i].statusCode || PROJECT_CONFIG.HTTP_CODE.SUCCESS;
            pages[i].root = pages[i].root || PROJECT_CONFIG.DIRECTORY.PAGES_DIR;
            pages[i].redirect = pages[i].redirect || false;
            
            return pages[i];
        }
    }
    
    return false;
    
};


// To handle all possible routes, returns value (object) with properties of an appropriate page or a redirect page
function routeHandler (params) {
    
    params = params || {};
    
    
    let langValue = getLang(params.lang);
    
    
    if (!PROJECT_CONFIG.MAIN_PAGE.IS_URL && langValue && !params.page && !params[0]) {
        params.page = '/';
    }
    
    let pageObj = getPage( {param: 'url', value: params.page} );
    
    if (pageObj) {
        pageObj.fileFullName = createFileFullName(pageObj.fileName, langValue || PROJECT_CONFIG.LANGUAGES[0]);
    }
    
    
    // Redirects in these cases to Main Page
    if (!pageObj && (((!PROJECT_CONFIG.MAIN_PAGE.IS_URL || !langValue) && !params[0]) || ((PROJECT_CONFIG.MAIN_PAGE.IS_URL || langValue) && !params[0]) || (!langValue && params[0]))) {
        let mainPageUrl = getPage( {param: 'name', value: PROJECT_CONFIG.MAIN_PAGE.NAME} ).url;
        
        return pageObj = createPageRedirect({
            url: `/${langValue || PROJECT_CONFIG.LANGUAGES[0]}${mainPageUrl === '/' ? '' : '/' + mainPageUrl}`
        });
    }
    
    
    // Redirects in these cases to 404 Page
    if (!langValue || !pageObj || params[0]) {
        pageObj = createPageRedirect({
            url: createFullUrl(langValue || PROJECT_CONFIG.LANGUAGES[0], getPage( {param: 'name', value: PROJECT_CONFIG[404].NAME} ).url)
        });
    }    
    
    
    return pageObj;
    
};


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


// Compresses response bodies for all request, more info about COMPRESSION middleware ---> https://github.com/expressjs/compression#compression
app.use(compression({threshold: 0}));


// Redirects all insecure requests to secure protocol HTTPS only in production environment
/*
if (app.get('env') === 'production') {
    
    app.use(function(req, res, next) {
        var protocol = req.get('x-forwarded-proto');
        
        protocol === 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
    });
    
}
*/


// Serves static files from the directory, which is defined in the project.config.js file
app.use('/', express.static(PROJECT_CONFIG.DIRECTORY.STATIC_DIR));


////////////////////////////////////
//                                //
//          *** OPEN ***          //
//  * HERE ADD ALL YOUR ROUTES *  //
//                                //
////////////////////////////////////


//


////////////////////////////////////
//                                //
//  * HERE ADD ALL YOUR ROUTES *  //
//         *** CLOSE ***          //
//                                //
////////////////////////////////////


// Handles all possible routes to send the appropriate HTML file
app.get(['/', '/:lang', '/:lang/:page', '/:lang/:page/*', '*'], function (req, res, next) {
    
    var options = routeHandler(req.params);
    
    
    if (options.redirect) {
        return res.redirect(options.statusCode, options.redirect.url);
    }
    
    res.status(options.statusCode).type('html').sendFile(options.fileFullName, {
        maxAge: 86400000,
        root: options.root
    });
    
});


// Handles HTTP errors
app.use(function (err, req, res, next) {
    
    alertHandler({
        type: 'error',
        message: err
    });
    
    alertHandler({
        type: 'error',
        message: err.stack
    });
    
    
    let statusCode = PROJECT_CONFIG.HTTP_CODE.SUPPORTED_ERRORS.includes(err.statusCode) ? err.statusCode : PROJECT_CONFIG.HTTP_CODE.SUPPORTED_ERRORS[0],
        options = createPageRedirect({
            url: createFullUrl(getLang(req.params.lang) || PROJECT_CONFIG.LANGUAGES[0], getPage( {param: 'name', value: PROJECT_CONFIG[statusCode].NAME} ).url)
        });
    
    
    res.redirect(options.statusCode, options.redirect.url);
    
});


// Runs the server
app.listen(app.get('port'), app.get('host'), function() {

    console.log('Express server listening on port ' + app.get('port'));

});