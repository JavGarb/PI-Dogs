const { expect } = require('chai');
const request = require('supertest');
const app = require('../../src/app.js');
const { Dog } = require('../../src/db.js');


describe('POST /dogs', () => {
  it('should create a new dog', async () => {
    const obj = { image:'Una imagen',name: 'Fido', height:'10-12', weight:'15-20', year_life:'15-20' };
    const response = await request(app)
      .post('/dogs')
      .send(obj);
      
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('id');
    expect(response.body).to.have.property('image', obj.image);
    expect(response.body).to.have.property('name', obj.name);
    expect(response.body).to.have.property('height', obj.height);
    expect(response.body).to.have.property('weight', obj.weight);
    expect(response.body).to.have.property('year_life', obj.year_life);
  });
});