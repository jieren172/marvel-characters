module.exports = {
  marvelAPI: {
    apiKey: process.env.MARVEL_CHARACTERS_API_KEY || '08e0001d6ee2d39d066b89d3fa420fd7',  // value to change
    secret: process.env.MARVEL_CHARACTERS_API_SECRET || 'b45572d56db822ab1377f3bd57f70d3105eb5283', // value to change
    endpoint: 'http://gateway.marvel.com/v1/public/',
    thumbnailSize: 'portrait_xlarge',
  }
};
