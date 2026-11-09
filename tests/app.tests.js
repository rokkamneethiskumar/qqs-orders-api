const request = require('supertest');
const app = require('../src/app');

describe('Orders API', () => {
  test('GET /health should return UP status', async () => {
    const response = await request(app).get('/health');

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('UP');
  });

  test('GET /api/orders should return orders', async () => {
    const response = await request(app).get('/api/orders');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });
});