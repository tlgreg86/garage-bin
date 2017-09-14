const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server.js');
const configuration = require('../knexfile')[process.env.NODE_ENV];
const db = require('knex')(configuration);

const should = chai.should();

chai.use(chaiHttp);

describe('Client Routes', () => {
  it('should render homepage', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html;
        done();
      })
  })
  
  it('should return 404 for a route that does not exist', (done) => {
    chai.request(server)
      .get('/api/v1/stuff')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
})
