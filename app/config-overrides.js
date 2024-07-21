const path = require('path');

module.exports = function override(config, env) {
    config.target = 'electron-renderer';
    return config;
};
