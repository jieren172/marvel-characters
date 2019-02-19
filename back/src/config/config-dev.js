module.exports = {
  marvelAPI: {
    apiKey: process.env.MARVEL_CHARACTERS_API_KEY || '',  // value to change
    secret: process.env.MARVEL_CHARACTERS_API_SECRET || '', // value to change
    endpoint: 'http://gateway.marvel.com/v1/public/',
    thumbnailSize: 'portrait_xlarge',
  }
};
