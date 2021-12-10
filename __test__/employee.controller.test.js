const app = require('../app');
const request = require('supertest');
const specialityModel = require("../models/speciality.model");
const departmentModel = require("../models/department.model");
const employeeModel = require('../models/employee.model');

describe('Employees API', () => {
    it('DELETE preview department & speciality data', async () =>{
        /* Deleting */
        await specialityModel.deleteOne({ name: 'Recrutement' });
        await departmentModel.deleteOne({ name: 'Ressource Humaine' });
        await employeeModel.deleteOne({'mobilePhone': '0709834358'});
    })
    it('POST /v1/rest/employees --> Test that we create Employee', async () => {
        const department = await departmentModel.create({
            name: 'Ressource Humaine',
            slug: 'ressource-humaine',
            description: 'Description des Ressource Humaine'
        });
        const speciality = specialityModel.create({
            'name': 'Recrutement',
            'slug': 'recrutement',
            'departmentId': department._id,
            'description': 'Description de la spécialité Dev mobile'
        });

        return request(app)
            .post('/v1/rest/employees')
            .send(
                {
                    "civility": "M.",
                    "firstName": "Ernest",
                    "lastName": "KOUASSI",
                    "mobilePhone": "0709834358",
                    "birthDate": "1993-01-01",
                    "maritalStatus": "MARRIED",
                    "positionTitle": "Software engineer",
                    "specialityId": "615e7fea5d9ff01ef5c6f869",
                    "manager": "Cedric Baidai",
                    "email": "ernest.kouassi@veone.net",
                    "startDate": "2021-07-15",
                    "emergencyContactFullName": "Josiane BODJE",
                    "emergencyContactAddress": "Marcory remblais",
                    "emergencyContactPhone": "0769509418",
                    "relationship": "Wife"
                }
            )
            .expect('Content-Type', /json/)
            .expect(201);
    })

    it('GET /v1/rest/employees --> test that we can list', async () => {
        return request(app)
            .get('/v1/rest/employees')
            .expect(200)
            .expect('Content-Type', /json/)
    });

    it('GET /v1/rest/employees/:id --> test that we can read', async () => {
        const employee = await employeeModel.findOne({'mobilePhone': '0709834358'});
        return request(app)
            .get(`/v1/rest/employees/${employee._id}`)
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it('UPDATE /v1/rest/employees/:id --> test that we can update', async () => {
        const employee = await employeeModel.findOne({'mobilePhone': '0709834358'});
        return request(app)
            .put(`/v1/rest/employees/${employee._id}`)
            .send({ residentialCommune: 'Résidentiel' })
            .expect(200)
            .expect('Content-Type', /json/);
    });
/*
    it('PATCH /v1/rest/employees/:id --> test that we can patch documents[...]', async () => {
        const employee = await employeeModel.findOne({'mobilePhone': '0709834358'});
        const filePath = `${__dirname}/public/test-img.jpg`;
        return request(app)
            .patch(`/v1/rest/employees/${employee._id}`)
            .field('fileType', 'pictures')
            .attach('filename', filePath)
            .on('progress', event => {
                the event is:
                {
                  direction: "upload" or "download"
                  percent: 0 to 100 // may be missing if file size is unknown
                  total: // total file size, may be missing
                  loaded: // bytes downloaded or uploaded so far
                }
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .then(response => {
                console.log(response)
            })
            .catch(err => console.log(err))
    });
*/
    it('DELETE /v1/rest/employees/:id --> test that we can delete', async () => {
        const employee = await employeeModel.findOne({'mobilePhone': '0709834358'});
        return request(app)
            .delete(`/v1/rest/employees/${employee._id}`)
            .expect(204)
            .then(response => response.message === 'Successful deleted.')
    });

})