const request = require('supertest');
const app = require('../app');
const employeeModel = require('../models/employee.model');
const wageModel = require('../models/wage.model');

describe('Employee wages API', function () {
    it('POST /v1/rest/wages --> Test that we can create', async () => {
        const employee = await employeeModel.findOne({});

        return request(app)
            .post('/v1/rest/wages')
            .send({ amount: 500000, employee: employee._id })
            .expect(201)
            .expect('Content-Type', /json/);
    });

    it('GET /v1/rest/wages --> Test that we can list', async () => {
        return request(app)
            .get('/v1/rest/wages')
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it('GET /v1/rest/wages/:id --> Test that we can read', async () => {
        const wage = await wageModel.findOne({});
        return request(app)
            .get(`/v1/rest/wages/${wage._id}`)
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it('PUT /v1/rest/wages --> Test that we can update', async () => {
        const wage = await wageModel.findOne({});

        return request(app)
            .put(`/v1/rest/wages/${wage._id}`)
            .send({ amount: 750000 })
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it('DELETE /v1/rest/wages --> Test that we can delete', async () => {
        const wage = await wageModel.findOne({});

        return request(app)
            .delete(`/v1/rest/wages/${wage._id}`)
            .expect(204);
    });
});