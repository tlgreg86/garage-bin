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

describe('API Routes', () => {
  before((done) => {
    db.migrate.latest()
      .then(() => done())
      .catch(error => console.log(error));
  });

  beforeEach((done) => {
    db.seed.run()
      .then(() => done())
      .catch(error => console.log(error));
  });

  describe('GET /api/v1/list', () => {
    it('should return all items in the list', (done) => {
      chai.request(server)
        .get('/api/v1/list')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.length.should.equal(3);
          res.body[0].should.have.property('name');
          res.body[0].name.should.equal('Shoes');
          res.body[0].should.have.property('reason');
          res.body[0].reason.should.equal('They suck');
          res.body[0].should.have.property('cleanliness');
          res.body[0].cleanliness.should.equal('Rancid');
          done();
        });
    });
  });
  