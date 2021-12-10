const request = require('supertest');
const app = require('../app');
const departmentModel = require('../models/department.model');
const specialityModel = require('../models/speciality.model');

describe('Speciality API', () => {
    it('Delete preview doc on db', async () => {
        await specialityModel.deleteOne({ name: 'Developpement mobile' });
        await departmentModel.deleteOne({ name: 'Support' });
    });

    it('POST /v1/rest/specialities --> Test that we can create speciality', async () => {
        const department = await departmentModel.create({
            name: 'Support',
            slug: 'support',
            description: 'Description du department support'
        });

        return request(app)
            .post('/v1/rest/specialities')
            .send({
                'name': 'Developpement mobile',
                'departmentId': department._id,
                'description': 'Description de la spécialité Dev mobile'
            })
            .expect(201)
            .expect('Content-Type', /json/);
    });

    it('GET /v1/rest/specialities --> Test that we can list', () => {
        return request(app)
            .get('/v1/rest/specialities')
            .expect(200)
            .expect('Content-Type', /json/);
    })

    it('GET /v1/rest/specialities/:id --- Test that we can read speciality by ID', async () => {
        const speciality = await specialityModel.findOne({ name: 'Developpement mobile' });

        return request(app)
            .get(`/v1/rest/specialities/${speciality._id}`)
            .expect(200)
            .expect('Content-Type', /json/)

    });

    it('PUT /v1/rest/specialities/:id --- Test that we can update speciality', async () => {
        const speciality = await specialityModel.findOne({ name: 'Developpement mobile' });

        return request(app)
            .put(`/v1/rest/specialities/${speciality._id}`)
            .send({'description': 'Description de la spécialité développement mobile...'})
            .expect(200)
            .expect('Content-Type', /json/);

    });

    it('DELETE /v1/rest/specialities/:id --- Test that we can delete speciality', async () => {
        const speciality = await specialityModel.findOne({ name: 'Developpement mobile' });
        return request(app)
            .delete(`/v1/rest/specialities/${speciality._id}`)
            .expect(204);
    });
});