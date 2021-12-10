const app = require('../app');
const request = require('supertest');
const employeeModel = require('../models/employee.model')
const displacementModel = require('../models/displacement.model')

describe('Displacement API', function () {

    it('POST /v1/rest/displacements --> Test that wa can create', async () => {
        const employee = await employeeModel.findOne({});

        return request(app)
            .post('/v1/rest/displacements')
            .send(
                {
                    employee: employee._id,
                    destination: 'Dakar - Sénégal',
                    means: 'Les raisons de la mission ...',
                    costs: 450000,
                    accommodationCosts: 35000,
                    startAt: new Date('2021-09-26'),
                    endAt: new Date('2021-10-13')
                }
            )
            .expect(201)
            .expect('Content-Type', /json/);
    });

    it('GET /v1/rest/displacements --> Test that wa can list', async () => {
        return request(app)
            .get('/v1/rest/displacements')
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it('GET /v1/rest/displacements/:id --> Test that wa can read', async () => {
        const displacement = await displacementModel.findOne({});

        return request(app)
            .get(`/v1/rest/displacements/${displacement._id}`)
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it('PUT /v1/rest/displacements/:id --> Test that wa can update', async () => {
        const displacement = await displacementModel.findOne({});

        return request(app)
            .put(`/v1/rest/displacements/${displacement._id}`)
            .expect(200)
            .expect('Content-Type', /json/);

    });

    it('DELETE /v1/rest/displacements/:id --> Test that wa can delete', async () => {
        const displacement = await displacementModel.findOne({});

        return request(app)
            .delete(`/v1/rest/displacements/${displacement._id}`)
            .expect(204);
    });
});