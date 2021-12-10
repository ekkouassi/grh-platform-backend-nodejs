const app = require('../app');
const request = require('supertest');
const employeeModel = require('../models/employee.model');
const absenceModel = require('../models/absence.model');

describe('Absence API', function () {
    it('GET /v1/rest/absences --> Test that we can list', () => {
        return request(app)
            .get('/v1/rest/absences')
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it('POST /v1/rest/absences --> Test that we can create', async () => {
        const employee = await employeeModel.findOne({});
        return request(app)
            .post('/v1/rest/absences')
            .send({employee: employee._id, patterns: 'Absence non justifiée', startAt: new Date('2021-10-12'), endAt: new Date('2021-10-15'), justified: false})
            .expect(201)
            .expect('Content-Type', /json/);
    });

    it('GET /v1/rest/absences/:id --> Test that we can read', async () => {
        const absence = await absenceModel.findOne({});
        return request(app)
            .get(`/v1/rest/absences/${absence._id}`)
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it('PUT /v1/rest/absences/:id --> Test that we can update', async () => {
        const absence = await absenceModel.findOne({});
        return request(app)
            .put(`/v1/rest/absences/${absence._id}`)
            .send({justified: true, patterns: 'Absence justifiée, cause: course pour des document administratifs'})
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it('DELETE /v1/rest/absences/:id --> Test that we can delete', async () => {
        const absence = await absenceModel.findOne({});
        return request(app)
            .delete(`/v1/rest/absences/${absence._id}`)
            .expect(204);
    });
});