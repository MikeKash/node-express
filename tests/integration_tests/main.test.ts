import request from 'supertest';
import { createServer } from '../../src/server';

const app = createServer();

describe('/v1/main', () => {
  describe('GET /', () => {
    it('should return { ok: "hello world" }', async () => {
      const res = await request(app).get('/v1/main');

      expect(res.status).toBe(200);
      expect(res.body).toStrictEqual({ ok: 'hello world' });
    });
  });
});
