const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server.js');
const configuration = require('../knexfile')[process.env.NODE_ENV];
const db = require('knex')(configuration);

const should = chai.should();

chai.use(chaiHttp);
