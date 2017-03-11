// PROJECT CONFIG
module.exports = {
    LANGUAGES: [ // Remember to rename your index files as index-pl.html & index-en.html
        'pl', // First element is default variable
        'en'
    ],
    CONFIG_FILE: 'project.config.js',
    DATA_FILE: 'project.data.json',
    DIRECTORY: {
        STATIC_DIR: __dirname + '/../public/' // Static files directory
    }
};