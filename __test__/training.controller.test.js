const app = require('../app');
const request = require('supertest');
const employeeModel = require("../models/employee.model");
const trainingModel = require('../models/training.model');

describe('Training API', () => {
    it('GET /v1/rest/trainings --> Test that we can list', function () {
        return request(app)
            .get('/v1/rest/trainings')
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it('POST /v1/rest/trainigs --> Test that we can create', async () => {
        const employee = await employeeModel.findById({_id: '615ff8e939aa705e8f73c7a0'});
        return request(app)
            .post('/v1/rest/trainings')
            .send({ type: 'Mise à niveau', startAt: new Date('2021-09-05'), endAt: new Date('2021-09-25'), employee: employee._id })
            .expect(201)
            .expect('Content-Type', /json/)
    });

    it('GET /v1/rest/trainings/:id --> Test that we can read', async () => {
        const training = await trainingModel.findOne({});
        return request(app)
            .get(`/v1/rest/trainings/${training._id}`)
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it('PUT /v1/rest/trainings/:id --> Test that we can update', async () => {
        const training = await trainingModel.findOne({});
        return request(app)
            .put(`/v1/rest/trainings/${training._id}`)
            .send({type: 'Formation de test'})
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it('DELETE /v1/rest/trainings/:id --> Test that we can delete', async () => {
        const training = await trainingModel.findOne({});
        return request(app)
            .delete(`/v1/rest/trainings/${training._id}`)
            .expect(204);
    });
});

