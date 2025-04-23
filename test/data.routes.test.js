// test/data.routes.test.js
const request = require('supertest');
const sinon   = require('sinon');
const { expect } = require('chai');

const app  = require('../app');
const pool = require('../db');

describe('GET /data', () => {
  let queryStub;

  before(() => {
    queryStub = sinon.stub(pool, 'query');
  });

  after(() => {
    queryStub.restore();
  });

  beforeEach(() => {
    queryStub.resetHistory();
  });

  describe('GET /data/albums', () => {
    it('returns 200 and a JSON object with albums', async () => {
      const fakeAlbums = [
        { id: 1, title: 'Animal',   /* …other fields… */ },
        { id: 2, title: 'Warrior',  /* … */ },
      ];
      // make pool.query resolve with our fake rows
      queryStub.resolves({ rows: fakeAlbums });

      const res = await request(app).get('/data/albums');

      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal({ albums: fakeAlbums });
      expect(queryStub.calledOnceWith('SELECT * FROM albums ORDER BY id')).to.be.true;
    });
  });

  describe('GET /data/songs', () => {
    it('returns 200 and a JSON object with songs', async () => {
      const fakeSongs = [
        { id: 1, title: 'Your Love Is My Drug', album_id: 1 /* … */ },
        { id: 2, title: 'TiK ToK',             album_id: 1 /* … */ },
      ];
      queryStub.resolves({ rows: fakeSongs });

      const res = await request(app).get('/data/songs');

      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal({ songs: fakeSongs });
      expect(queryStub.calledOnceWith('SELECT * FROM songs ORDER BY id')).to.be.true;
    });
  });

  describe('Error handling', () => {
    it('passes errors to the errorHandler (and yields 500)', async () => {
      // make our stub throw
      queryStub.rejects(new Error('DB is down'));

      const res = await request(app).get('/data/albums');
      expect(res.status).to.equal(500);
    });
  });
});
