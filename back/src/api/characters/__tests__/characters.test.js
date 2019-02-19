const request = require('supertest');
const urlJoin = require('url-join');

jest.mock('axios');
const axios = require('axios');

const api = require('../../');
const config = require('../../../config');
const testData = require('./data/test');


describe('api/characters', () => {
  it('Test 1 : should get 200 with a correct offset 3', async () => {
    jest.setTimeout(10000);
    try {
      // test with filepath download
      axios.get.mockReturnValueOnce({
        data: {
          data: {
            offset: 1,
            count: 2,
            total: 6,
            results: testData,
          }
        }
      });
      res = await request(api).get('/api/characters').query({
        limit: 2,
        offset: 1,
      });
      expect(res.status).toEqual(200);
      // check call params
      expect(axios.get.mock.calls[0][1].params.limit).toEqual(2);
      expect(axios.get.mock.calls[0][1].params.offset).toEqual(1);

      // check result
      expect(res.body.offset).toEqual(3);
      const expectedData = testData.map(i => ({
        id: i.id,
        name: i.name,
        thumbnail: urlJoin(i.thumbnail.path, `${config.marvelAPI.thumbnailSize}.${i.thumbnail.extension}`),
      }));
      expect(res.body.data).toEqual(expectedData);
    } catch (e) {
      console.error(e);
      expect(e).not.toBeDefined();
    }
  });

  it('Test 1 : should get 200 with a correct offset null', async () => {
    jest.setTimeout(10000);
    try {
      // test with filepath download
      axios.get.mockReturnValueOnce({
        data: {
          data: {
            offset: 4,
            count: 2,
            total: 6,
            results: testData,
          }
        }
      });
      res = await request(api).get('/api/characters').query({
        limit: 2,
        offset: 4,
      });
      expect(res.status).toEqual(200);
      // check call params
      expect(axios.get.mock.calls[1][1].params.limit).toEqual(2);
      expect(axios.get.mock.calls[1][1].params.offset).toEqual(4);

      // check result
      expect(res.body.offset).toBeNull();
      const expectedData = testData.map(i => ({
        id: i.id,
        name: i.name,
        thumbnail: urlJoin(i.thumbnail.path, `${config.marvelAPI.thumbnailSize}.${i.thumbnail.extension}`),
      }));
      expect(res.body.data).toEqual(expectedData);
    } catch (e) {
      console.error(e);
      expect(e).not.toBeDefined();
    }
  });
});
