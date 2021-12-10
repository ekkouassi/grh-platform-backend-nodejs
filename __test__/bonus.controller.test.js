const request = require('supertest');
const app = require('../app');
const bonusModel = require('../models/bonus.model');
const employeeModel = require('../models/employee.model');

describe('Employee bonus API', () => {
    it('POST /v1/rest/bonuses --> Test that we can create', async () => {
        const employee = await employeeModel.findOne({});
        return request(app)
            .post('/v1/rest/bonuses')
            .send({ amount: 35000, patterns: 'Test create new bonus', employee: employee._id})
            .expect(201)
            .expect('Content-Type', /json/);
    });

    it('GET /v1/rest/bonuses --> Test that we can list', async () => {
        return request(app)
            .get('/v1/rest/bonuses')
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it('GET /v1/rest/bonuses/:id --> Test that we can read', async () => {
        const bonus = await bonusModel.findOne({});
        return request(app)
            .get(`/v1/rest/bonuses/${bonus._id}`)
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it('UPDATE /v1/rest/bonuses/:id --> Test that we can update', async () => {
        const bonus = await bonusModel.findOne({});
        return request(app)
            .put(`/v1/rest/bonuses/${bonus._id}`)
            .send({ amount: 50000, patterns: 'update bonus patterns' })
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it('DELETE /v1/rest/bonuses/:id --> Test that we can update', async () => {
        const bonus = await bonusModel.findOne({});
        return request(app)
            .delete(`/v1/rest/bonuses/${bonus._id}`)
            .expect(204);
    });
});