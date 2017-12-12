var path = require('path');
var config = require('nconf');

function configure() {
    var configFileLocation = path.resolve(__dirname);
    config.argv().env();
    var environment = process.env.NODE_ENV || 'development'; // eslint-disable-line
    console.log('***Environment*** : ', process.env.NODE_ENV);
    configFileLocation = path.join(configFileLocation, '../configs/', environment.toLowerCase());
    configFileLocation += '.json';
    config.file(configFileLocation);    
}

configure.prototype.get = function(key) {
    return config.get(key);
};

module.exports = new configure();