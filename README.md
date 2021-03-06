# Restful API - NodeJS & ExpressJS

> Project Restful API is built on the <a href="https://nodejs.org/en/" target="_blank" rel="help">NodeJS</a> platform. The main module which providing communication HTTP and supporting middlewares is <a href="https://expressjs.com/" target="_blank" rel="help">ExpressJS</a>.

API in currently available configuration has:
- settings file project.config.js which allows defining supported languages in routing and location of directory containing static files,
- data file project.data.json,
- defined host and port (http://localhost:4000),
- enabled all Cross-Origin Resource Sharing (CORS) requests via <a href="https://github.com/expressjs/cors#cors" target="_blank" rel="help">cors</a> middleware,
- parser incoming request bodies before your handler start via <a href="https://github.com/expressjs/body-parser#body-parser" target="_blank" rel="help">body-parser</a> middleware,
- compressor response bodies for all request via <a href="https://github.com/expressjs/compression#compression" target="_blank" rel="help">compression</a> middleware,
- **Normal** and **Angular** modes of routing which handling all possible routes and allows to navigating through pages in different languages (/pl or /en).

Check out what exactly has changed in the latest version of the Restful API <a href="https://github.com/mateuszarchicinski/Restful-API--NodeJS-ExpressJS/releases/tag/1.0.1" target="_blank" rel="help">here</a>.

**Angular** mod is related to my other project <a href="https://github.com/mateuszarchicinski/Angular1.x-Template" target="_blank" rel="help">Angular 1.x - Template</a> in which I use Restful API server-side to return main application file (index-pl.html or index-en.html) and the rest of routing takes place on client side.

## Usage
Project is available only via Github repository.

In case usage app.js file in your own environment which provides automatic application run. Remember to install all required modules for proper work API. Use this command in console:
```
npm install --production
```

However, if you work with API locally install all modules using command:
```
npm install
```

It will install tool called <a href="https://nodemon.io/" target="_blank" rel="help">Nodemon</a> which will monitor for any changes in API source and automatically restart created server. Simply run using command:
```
nodemon app
```

Feel free to develop Project Restful API with me :)

## Changelog
Recent changes can be viewed on Github on the <a href="https://github.com/mateuszarchicinski/Restful-API--NodeJS-ExpressJS/releases" target="_blank" rel="help">Releases Page</a>.

## License
<a href="https://github.com/mateuszarchicinski/Restful-API--NodeJS-ExpressJS/blob/master/LICENSE" target="_blank" rel="help">MIT License</a>.