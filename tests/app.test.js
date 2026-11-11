
const request = require('supertest');
const app = require('../src/app');

describe('Orders API', () => {
  test('GET /health should return UP status', async () => {
    const response = await request(app).get('/health');

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('UP');
    expect(response.body.version).toBe('local');
  });

  test('GET /health should return configured APP_VERSION', async () => {
    const originalVersion = process.env.APP_VERSION;

    process.env.APP_VERSION = '1.0.0';

    const response = await request(app).get('/health');

    expect(response.statusCode).toBe(200);
    expect(response.body.version).toBe('1.0.0');

    if (originalVersion === undefined) {
      delete process.env.APP_VERSION;
    } else {
      process.env.APP_VERSION = originalVersion;
    }
  });

  test('GET /api/orders should return orders', async () => {
    const response = await request(app).get('/api/orders');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('POST /api/orders should create a new order', async () => {
    const response = await request(app)
      .post('/api/orders')
      .send({
        item: 'Mouse',
        quantity: 3
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.item).toBe('Mouse');
    expect(response.body.quantity).toBe(3);
    expect(response.body.id).toBeDefined();
  });

  test('POST /api/orders should reject a missing item', async () => {
    const response = await request(app)
      .post('/api/orders')
      .send({
        quantity: 2
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  test('POST /api/orders should reject a non-integer quantity', async () => {
    const response = await request(app)
      .post('/api/orders')
      .send({
        item: 'Mouse',
        quantity: 'two'
      });

    expect(response.statusCode).toBe(400);
  });

  test('POST /api/orders should reject zero quantity', async () => {
    const response = await request(app)
      .post('/api/orders')
      .send({
        item: 'Mouse',
        quantity: 0
      });

    expect(response.statusCode).toBe(400);
  });
});
