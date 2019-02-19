const env = process.env.MARVEL_CHARACTERS_ENV || 'dev';  //eslint-disable-line

module.exports = require(`./config-${env}`);
