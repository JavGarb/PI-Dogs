const { Dog, conn } = require('../../src/db.js');
const { expect } = require('chai');
const request = require('supertest');
const app = require('../../src/app');

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Dog.create({ name: 'Pug' });
      });
    });
  });
});

describe('Dog Model', () => {
  it('Debe crear una nueva raza', (done) => {
    const razaData = {
      name: 'Perro',
      height: '1.2-1.5',
      weight: '10-12',
      year_life: '10-15'
    };

    Dog.create(razaData)
      .then((raza) => {
        expect(raza.name).to.equal(razaData.name);
        expect(raza.height).to.equal(razaData.height);
        expect(raza.weight).to.equal(razaData.weight);
        expect(raza.year_life).to.equal(razaData.year_life);
      }).done();
    })
  });