const axios = require('axios');
const md5 = require('md5');
const urlJoin = require('url-join');
const config = require('../../../config');


/**
 * Get a file stream from a url
 * Try to get the filename from it's content-disposition (in the response)
 * @param  {String} url [url to download]
 * @return {Object}     [composite : stream object and obtained filename]
 */
async function fetchCharactersFromAPI(limit, offset) {
  const { marvelAPI: { apiKey, secret, endpoint, thumbnailSize } } = config;

  const now = Date.now();

  const params = {
    ts: now,
    apikey: apiKey,
    hash: md5(`${now}${secret}${apiKey}`),
    limit,
    offset,
  };

  const response = await axios.get(`${endpoint}/characters`, {
    params,
  });

  const body = response.data;
  if (body.data && body.data.results) {
    const data = body.data.results.map((item) => {
      const { id, name, thumbnail: {path, extension} } = item;
      const ext = extension ? `.${extension}` : '';
      return {
        id,
        name,
        thumbnail: urlJoin(path, `${thumbnailSize}${ext}`),
      };
    });

    const newOffset =  body.data.count + body.data.offset;

    return {
      data,
      offset: (newOffset >= body.data.total ? null : newOffset),
    };
  } else {
    console.error(body);
    throw new Error('Something is wrong with the marvel api');
  }
}


module.exports = fetchCharactersFromAPI;
