/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');



describe('POST /dogs', () => {
  it('should create a new dog', async () => {
      const obj = { name: 'Fido', age: 3 };
      const dogCreate = jest.fn().mockResolvedValue(obj);
      const response = await request(app)
          .post('/dogs')
          .send(obj);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(obj);
  });
});

// const agent = session(app);
// const dog = {
//   name: 'Pug',
// };

// describe('Videogame routes', () => {
//   before(() => conn.authenticate()
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   }));
//   beforeEach(() => Dog.sync({ force: true })
//     .then(() => Dog.create(dog)));
//   describe('GET /dogs', () => {
//     it('should get 200', () =>
//       agent.get('/dogs').expect(200)
//     );
//   });
// });
