const app = require('../app');
const request = require('supertest');
const employeeModel = require('../models/employee.model');
const departureModel = require('../models/departure.model');

describe('Departure API', function () {
    it('GET /v1/rest/departures --> Test that we can list', () => {
        return request(app)
            .get('/v1/rest/departures')
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it('POST /v1/rest/departures --> Test that we can create', async () => {
        const employee = await employeeModel.findOne({});
        return request(app)
            .post('/v1/rest/departures')
            .send({employee: employee._id, patterns: 'Raison personnelle', DepartureDate: new Date('2021-10-12') })
            .expect(201)
            .expect('Content-Type', /json/);
    });

    it('GET /v1/rest/departures/:id --> Test that we can read', async () => {
        const departure = await departureModel.findOne({});
        return request(app)
            .get(`/v1/rest/departures/${departure._id}`)
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it('PUT /v1/rest/departures/:id --> Test that we can update', async () => {
        const departure = await departureModel.findOne({});
        return request(app)
            .put(`/v1/rest/departures/${departure._id}`)
            .send({justified: true, patterns: 'departure justifiée, cause: course pour des document administratifs'})
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it('DELETE /v1/rest/departures/:id --> Test that we can delete', async () => {
        const departure = await departureModel.findOne({});
        return request(app)
            .delete(`/v1/rest/departures/${departure._id}`)
            .expect(204);
    });
});