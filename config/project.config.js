// PROJECT CONFIG
module.exports = {
    MODE: 'Normal', // Normal / Angular - atm works only Normal mode
    LANGUAGES: [ // Add to each HTML file a language suffix e.g index-en.html etc.
        'pl', // First element is default variable
        'en'
    ],
    MAIN_PAGE: {
        NAME: 'dashboard page',
        IS_URL: true
    },
    404: {
        NAME: '404 page'
    },
    500: {
        NAME: '500 page'
    },
    PAGES: [ // All types of pages need to be defined in this array
        {
            name: 'main page',
            url: '/',
            fileName: 'index',
            type: 'main',
            root: __dirname + '/../public/'
        },
        {
            name: 'dashboard page',
            url: 'dashboard',
            fileName: 'dashboard',
            type: 'normal'
        },
        {
            name: 'dashboard page2',
            url: 'dashboard2',
            fileName: 'dashboard2',
            type: 'normal'
        },
        {
            name: '404 page',
            url: '404',
            statusCode: 404,
            fileName: '404',
            type: '404'
        },
        {
            name: '500 page',
            url: '500',
            statusCode: 500,
            fileName: '500',
            type: '500'
        }
    ],
    HTTP_CODE: {
        SUCCESS: 200,
        REDIRECT: 301,
        SUPPORTED_ERRORS: [
            500,
            404
        ]
    },
    CONFIG_FILE: 'project.config.js',
    DATA_FILE: 'project.data.json',
    DIRECTORY: {
        STATIC_DIR: __dirname + '/../public/', // Static files directory
        PAGES_DIR: __dirname + '/../public/pages/'
    }
};