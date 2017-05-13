var assert = require('assert');
var server = require('../server.js');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = require('chai').expect;
chai.use(chaiHttp);


describe('the server', function(){
  describe('root route', function(){
    it('succeeds silently!', function(done) {
      chai.request(server)
      .get('/')
      .end(function(err, res) {
        expect(true).to.be.true;
        done();
      });
    });
  });
  describe('search route', function(){
    it('succeeds silently!', function(done) {
      chai.request(server)
      .get('/search')
      .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
      });
    });
    it('returns a json', function(done) {
      chai.request(server)
      .get('/search/*')
      .end(function(err, res) {
        expect(res).to.be.a('string');
        done();
      });
    });
  });
  describe('latest route', function(){
    it('succeeds silently!', function(done) {
      chai.request(server)
      .get('/latest')
      .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
      });
    });
  });
  
});