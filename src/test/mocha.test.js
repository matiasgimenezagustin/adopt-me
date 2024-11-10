import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import server from '../app.js';

chai.use(chaiHttp);

describe('Adoption Router', () => {
  let userId;
  let petId;

  before((done) => {
    const user = {
      first_name: 'Juan',
      last_name: 'Pérez',
      email: 'juan@example.com',
      password: 'password123'
    };
    const pet = {
      name: 'Firulais',
      specie: 'Perro',
      adopted: false
    };


    chai.request(server)
      .post('/api/users')
      .send(user)
      .end((err, res) => {
        if (err) return done(err);
        userId = res.body._id; 

        chai.request(server)
          .post('/api/pets')
          .send(pet)
          .end((err, res) => {
            if (err) return done(err);
            petId = res.body._id; 
            done();
          });
      });
  });

  it('Debería devolver un arreglo con todas las adopciones', (done) => {
    chai.request(server)
      .get('/api/adoptions')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('Debería devolver una adopción específica por ID', (done) => {
    chai.request(server)
      .post(`/api/adoptions/${userId}/${petId}`)
      .end((err, res) => {
        const adoptionId = res.body._id;
        chai.request(server)
          .get(`/api/adoptions/${adoptionId}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('owner');
            expect(res.body).to.have.property('pet');
            done();
          });
      });
  });

  it('Debería devolver un error si no se encuentra la adopción', (done) => {
    chai.request(server)
      .get('/api/adoptions/invalidAdoptionId')
      .end((err, res) => {
        expect(res).to.have.status(404); // Error 404 si no se encuentra
        done();
      });
  });

  it('Debería crear una nueva adopción cuando usuario y mascota existen y la mascota no está adoptada', (done) => {
    chai.request(server)
      .post(`/api/adoptions/${userId}/${petId}`)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('owner').eql(userId);
        expect(res.body).to.have.property('pet').eql(petId);
        done();
      });
  });

  it('Debería devolver un error si el usuario no existe', (done) => {
    const invalidUserId = mongoose.Types.ObjectId();
    chai.request(server)
      .post(`/api/adoptions/${invalidUserId}/${petId}`)
      .end((err, res) => {
        expect(res).to.have.status(404); 
        done();
      });
  });

  it('Debería devolver un error si la mascota no existe', (done) => {
    const invalidPetId = mongoose.Types.ObjectId();
    chai.request(server)
      .post(`/api/adoptions/${userId}/${invalidPetId}`)
      .end((err, res) => {
        expect(res).to.have.status(404); 
        done();
      });
  });

  it('Debería devolver un error si la mascota ya está adoptada', (done) => {
    chai.request(server)
      .post(`/api/adoptions/${userId}/${petId}`)
      .end((err, res) => {
        chai.request(server)
          .post(`/api/adoptions/${userId}/${petId}`)
          .end((err, res) => {
            expect(res).to.have.status(400); 
            done();
          });
      });
  });
});
