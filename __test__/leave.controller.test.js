const app = require('../app');
const request = require('supertest');
const employeeModel = require('../models/employee.model');
const leaveModel = require('../models/leave.model');

describe('Leave API', function () {
    it('GET /v1/rest/leaves --> Test that we can list', () => {
        return request(app)
            .get('/v1/rest/leaves')
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it('POST /v1/rest/leaves --> Test that we can create', async () => {
        const employee = await employeeModel.findOne({});
        return request(app)
            .post('/v1/rest/leaves')
            .send({employee: employee._id, patterns: 'Congé professionel', startAt: new Date('2021-09-20'), endAt: new Date('2021-10-19')})
            .expect(201)
            .expect('Content-Type', /json/);
    });

    it('GET /v1/rest/leaves/:id --> Test that we can read', async () => {
        const leave = await leaveModel.findOne({});
        return request(app)
            .get(`/v1/rest/leaves/${leave._id}`)
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it('PUT /v1/rest/leaves/:id --> Test that we can update', async () => {
        const leave = await leaveModel.findOne({});
        return request(app)
            .put(`/v1/rest/leaves/${leave._id}`)
            .send({justified: true, patterns: 'leave justifiée, cause: course pour des document administratifs'})
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it('DELETE /v1/rest/leaves/:id --> Test that we can delete', async () => {
        const leave = await leaveModel.findOne({});
        return request(app)
            .delete(`/v1/rest/leaves/${leave._id}`)
            .expect(204);
    });
});