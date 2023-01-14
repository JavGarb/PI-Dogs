const { Dog, conn } = require('../../src/db.js');
const { expect } = require('chai');

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

describe('Raza Model', () => {
  it('Debe crear una nueva raza', (done) => {
    const razaData = {
      ID: 1,
      Nombre: 'Perro',
      Altura: '1.2m',
      Peso: '10kg',
      Años_de_vida: '10'
    };

    Raza.create(razaData)
      .then((raza) => {
        expect(raza.ID).to.equal(razaData.ID);
        expect(raza.Nombre).to.equal(razaData.Nombre);
        expect(raza.Altura).to.equal(razaData.Altura);
        expect(raza.Peso).to.equal(razaData.Peso);
        expect(raza.Años_de_vida).to.equal(razaData.Años_de_vida);
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  it('No se deberia crear una raza nueva si falta alguno de los campos requeridos', (done) => {
    const razaData = {
      ID: 2,
      Nombre: 'Gato',
    };

    Raza.create(razaData)
      .then(() => {
        done(new Error('Should have thrown an error'));
      })
      .catch((error) => {
        expect(error.name).to.equal('SequelizeValidationError');
        done();
      });
  });
});