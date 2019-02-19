const router = require('express').Router();
const fetchCharactersFromAPI = require('./lib/fetch-characters');


/**
 * Route list characters
 * querystring:
 *  - limit: limit of the return items count
 *  - offset: offset of the previous fetch
 */
router.get('/api/characters', async (req, res) => {
  try {
    let {query: { limit, offset }} = req;
    console.log('characters requested, limit and offset:', limit, offset);
    // check limit and offset in query strings
    if((limit && (isNaN(limit) || limit < 0)) || (offset && (isNaN(offset)) || offset < 0)) {
      return res.status(400).send('Wrong query parameters');
    }

    limit = limit >= 100 && 99 || limit;


    limit = limit && parseInt(limit);
    offset = offset && parseInt(offset);
    const result = await fetchCharactersFromAPI(limit, offset);
    console.log('characters sucessfully read', result);
    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal server error');
  }
});


module.exports = router;
