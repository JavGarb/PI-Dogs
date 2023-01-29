const { Dog, conn } = require('../../src/db.js');
const { expect } = require('chai');
const request = require('supertest');
const app = require('../../src/app');

// describe('Dog model', () => {
//   before(() => conn.authenticate()
//     .catch((err) => {
//       console.error('Unable to connect to the database:', err);
//     }));
//   describe('Validators', () => {
//     beforeEach(() => Dog.sync({ force: true }));
//     describe('name', () => {
//       it('should throw an error if name is null', (done) => {
//         Dog.create({})
//           .then(() => done(new Error('It requires a valid name')))
//           .catch(() => done());
//       });
//       it('should work when its a valid name', () => {
//         Dog.create({ name: 'Pug' });
//       });
//     });
//   });
// });

describe('Modelo Dog', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  it('No se crea la raza si no se envia name', async () => {
      try {
          await Dog.create({ height: '10-20', weight: '9-10' });
      } catch (error) {
          expect(error.message).to.include('notNull Violation: Dog.name cannot be null');
      }
  });

  it('No se crea si no se envia altura', async () => {
      try {
          await Dog.create({ name: 'Peludo Rustico', weight: '10-12' });
      } catch (error) {
          expect(error.message).to.include('notNull Violation: Dog.height cannot be null');
      }
  });

  it('No se crea si no se envia peso', async () => {
      try {
          await Dog.create({ name: 'Peludo Rustico', height: '1-1.5' });
      } catch (error) {
          expect(error.message).to.include('notNull Violation: Dog.weight cannot be null');
      }
  });

  it('Se crea la raza de perro si todo esta ok', async () => {
      const dog = await Dog.create({
          name: 'Alpino Moteado',
          height: '10-12',
          weight: '1-1.5',
          year_life: '7-9'
      });
      expect(dog.toJSON()).to.deep.include({
          name: 'Alpino Moteado',
          height: '10-12',
          weight: '1-1.5',
          year_life: '7-9'
      });
  });
});


