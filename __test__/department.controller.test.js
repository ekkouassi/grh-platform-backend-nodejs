const request = require('supertest');
const app = require('../app');
const departmentModel = require('../models/department.model');

const res = departmentModel.deleteOne({ name: 'Recherche et Développement' })

describe('Department API', () => {

    it('Delete preview document on db', async () => {
        await departmentModel.deleteOne({ name: 'Recherche et Développement' });
    })
    
    it('POST /rest/v1/departments --> Test that we can create', () => {
        return request(app).post('/v1/rest/departments')
            .set('Accept', 'application/json')
            .send({
                "name": "Recherche et Développement"
            })
            .expect(201)
            .expect('Content-Type', /json/);
    });

    it('GET /rest/v1/departments --> Test that we can list', () => {
        return request(app).get('/v1/rest/departments')
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it('GET /rest/v1/departments/id --> Test that we can read', async () => {
        const department = await departmentModel.findOne({ name: 'Recherche et Développement' });
        return request(app)
            .get(`/v1/rest/departments/${department._id}`)
            .expect(200)
            .expect('Content-Type', /json/);
    });

    it('UPDATE /rest/v1/departments/id --> Test that we can update', async () => {
        const department = await departmentModel.findOne({ name: 'Recherche et Développement' });

        return request(app)
            .put(`/v1/rest/departments/${department._id}`)
            .send({
                'description': 'description du départment recherche et développement...'
            })
            .expect(200)
            .expect('Content-Type', /json/)

    });

    it('DELETE /rest/v1/departments/id --> Test tht we can delete', async () => {
        const department = await departmentModel.findOne({ name: 'Recherche et Développement' });
        return request(app)
            .delete(`/v1/rest/departments/${department._id}`)
            .expect(204)
            .then(response => response.message === 'Successful deleted.');
    });

})
