const expect = require('expect');
const request = require('supertest');

//import app
const app = require('./../app');
// import * as app from './../app';

// var http = require('http');
// var testApp = http.createServer(app);

describe('POST /v1/account/login', () => {
    it('should return a 200', (done) => {
        request(app)
            .post('/v1/account/login')
            .send({
                email:'pete@email.com',
                password:'test'
            })
            .expect(200, done)
            // .end((err, res) => {
            //     if (err) {
            //         done(err);
            //     }           
            // })
       
    });

    it('should return a 200 and a user', (done) => {
        request(app)
            .post('/v1/account/login')
            .send({
                    email:'pete@email.com',
                    password:'test'
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.user).toMatch('pete@email.com');
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();         
            })
    });

    it('should return a 401 with incorrect log in used', (done) => {
        request(app)
            .post('/v1/account/login')
            .send({
                email:'pete@email.com',
                password:'tessst'
            })
            .expect(401, done)
    });

});