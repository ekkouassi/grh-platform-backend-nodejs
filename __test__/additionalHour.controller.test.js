const request = require('supertest');
const app = require('../app');
const employeeModel = require('../models/employee.model');
const additionalHourModel = require('../models/additionalHour.model');
const {now} = require("mongoose");

describe('Additional Hour API', () => {
    it('POST /v1/rest/additional-hours --> Test that we can create', async () => {
        const employee = await employeeModel.findOne({})
        return request(app)
            .post('/v1/rest/additional-hours')
            .send({
                patterns: 'Les motifs varient.',
                startAt: new Date('2021-10-12 18:30'),
                endAt: new Date('2021-10-12 21:00'),
                employee: employee._id
            })
            .expect(201)
            .expect('Content-Type', /json/);
    });

    it('GET /v1/rest/additional-hours --> Test that we can list', async () => {
        return request(app)
            .get('/v1/rest/additional-hours')
            .expect(200)
            .expect('Content-Type', /json/);

    });

    it('GET /v1/rest/additional-hours/:id --> Test that we can read', async () => {
        const data = await additionalHourModel.findOne({});
        return request(app)
            .get(`/v1/rest/additional-hours/${data._id}`)
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it('UPDATE /v1/rest/additional-hours --> Test that we can read', async () => {
        const data = await additionalHourModel.findOne({});
        return request(app)
            .put(`/v1/rest/additional-hours/${data._id}`)
            .send({ endAt: new Date('2021-10-13 06:00')})
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it('DELETE /v1/rest/additional-hours --> Test that we can read', async () => {
        const data = await additionalHourModel.findOne({});
        return request(app)
            .delete(`/v1/rest/additional-hours/${data._id}`)
            .expect(204);
    });
})