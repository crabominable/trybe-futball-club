import * as chai from 'chai';

import chaiHttp = require('chai-http');

import { exec } from 'shelljs';

import { app } from '../app';

import {
  getAllMatchsMock,
  matchsInProgressMock,
  matchsNotInProgressMock,
} from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

let chaiHttpResponse;

describe('GET /matchs', () => {
  it('Query string inProgress é inválido', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matchs?inProgress=itNeedsTobeBoolean')
      .set('content-type', 'application/json');

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(400);
    expect(response).to.have.own.property('message');
    expect(response.message).to.be.eql('\'inProgress\' must have \'true\' or \'false\'');
  });

  it('Query string inProgress possui o valor false', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matchs?inProgress=false')
      .set('content-type', 'application/json');

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(200);
    expect(response).to.be.eql(matchsNotInProgressMock);
  });

  it('Query string inProgress possui o valor true', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matchs?inProgress=true')
      .set('content-type', 'application/json');

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(200);
    expect(response).to.be.eql(matchsInProgressMock);
  });

  it('Query string inProgress vazia, retornando com sucesso allMatchs', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matchs')
      .set('content-type', 'application/json');

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(200);
    expect(response).to.be.eql(getAllMatchsMock);
  });
});

describe('POST /matchs', () => {
  const bodyRequestMock = {
    homeTeam: 8,
    awayTeam: 4,
    homeTeamGoals: 1,
    awayTeamGoals: 1,
    inProgress: true
  };

  const bodyResponseMock = {
    ...bodyRequestMock,
    id: 1,
  };

  let token: string;

  before(async () => {
    exec('npm run db:reset');

    const { body: { token: loginToken } } = await chai
      .request(app)
      .post('/login')
      .set('content-type', 'application/json')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      })

    token = loginToken;
  });

  after(() => {
    exec('npm run db:reset');
  });

  it('Hometeam inválido', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matchs')
      .set('content-type', 'application/json')
      .set('authorization', token)
      .send({
        ...bodyRequestMock,
        homeTeam: 'wrongInput',
      });

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(401);
    expect(response).to.have.own.property('message');
    expect(response.message).to.be.eql('\'homeTeam\' must be a number');
  });

  it('Awayteam inválido', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matchs')
      .set('content-type', 'application/json')
      .set('authorization', token)
      .send({
        ...bodyRequestMock,
        awayTeam: 'wrongInput',
      });

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(401);
    expect(response).to.have.own.property('message');
    expect(response.message).to.be.eql('\'awayTeam\' must be a number');
  });

  it('HomeTeamGoals inválido', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matchs')
      .set('content-type', 'application/json')
      .set('authorization', token)
      .send({
        ...bodyRequestMock,
        homeTeamGoals: 'wrongInput',
      });

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(401);
    expect(response).to.have.own.property('message');
    expect(response.message).to.be.eql('\'homeTeamGoals\' must be a number');
  });

  it('AwayTeamGoals inválido', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matchs')
      .set('content-type', 'application/json')
      .set('authorization', token)
      .send({
        ...bodyRequestMock,
        awayTeamGoals: 'wrongInput',
      });

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(401);
    expect(response).to.have.own.property('message');
    expect(response.message).to.be.eql('\'awayTeamGoals\' must be a number');
  });

  it('InProgress inválido', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matchs')
      .set('content-type', 'application/json')
      .set('authorization', token)
      .send({
        ...bodyRequestMock,
        inProgress: 'wrongInput',
      });

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(401);
    expect(response).to.have.own.property('message');
    expect(response.message).to.be.eql('There is no team with such id!');
  });

  it('Nenhum time foi encontrado com o id igual o de homeTeam', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matchs')
      .set('content-type', 'application/json')
      .set('authorization', token)
      .send({
        ...bodyRequestMock,
        homeTeam: 999,
      });

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(401);
    expect(response).to.have.own.property('message');
    expect(response.message).to.be.eql('There is no team with such id!');
  });

  it('Nenhum time foi encontrado com o id igual o de awayTeam', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matchs')
      .set('content-type', 'application/json')
      .set('authorization', token)
      .send({
        ...bodyRequestMock,
        awayTeam: 999,
      });

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(401);
    expect(response).to.have.own.property('message');
    expect(response.message).to.be.eql('There is no team with such id!');
  });

  it('HomeTeam e awayTeam com o id igual', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matchs')
      .set('content-type', 'application/json')
      .set('authorization', token)
      .send({
        ...bodyRequestMock,
        awayTeam: 1,
        homeTeam: 1,
      });

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(401);
    expect(response).to.have.own.property('message');
    expect(response.message).to.be.eql('It is not possible to create a match with two equal teams');
  });

  it('Caso de sucesso', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matchs')
      .set('content-type', 'application/json')
      .set('authorization', token)
      .send(bodyRequestMock);

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(201);
    expect(response).to.deep.equal(bodyResponseMock);
  });
});

/* describe('PATCH /matchs/:id/finish', () => {
  let token: string;

  before(async () => {
    exec('npm run db:reset');

    const { body: { token: loginToken } } = await chai
      .request(app)
      .post('/login')
      .set('content-type', 'application/json')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      })

    token = loginToken;
  });

  after(() => {
    exec('npm run db:reset');
  });

  it('with an invalid id', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .patch('/matchs/thisIsANumber/finish')
      .set('content-type', 'application/json')
      .set('authorization', token);

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(400);
    expect(response).to.have.own.property('message');
    expect(response.message).to.be.eql('id must be a number');
  });

  it('not found a team with this id', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .patch('/matchs/999/finish')
      .set('content-type', 'application/json')
      .set('authorization', token);

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(404);
    expect(response).to.have.own.property('message');
    expect(response.message).to.be.eql('Has no match with this id');
  });

  it('a match that is already over', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .patch('/matchs/1/finish')
      .set('content-type', 'application/json')
      .set('authorization', token);

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(409);
    expect(response).to.have.own.property('message');
    expect(response.message).to.be.eql('This match is already finished');
  });

  it('finish match with id \'47\'', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .patch('/matchs/47/finish')
      .set('content-type', 'application/json')
      .set('authorization', token);

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(200);
    expect(response).to.have.own.property('message');
    expect(response.message).to.be.eql('Match was finish');
  });
});

describe('PATCH \'/matchs/:id\'', () => {
  const bodyRequestMock = {
    homeTeam: 11,
    awayTeam: 7,
    homeTeamGoals: 3,
    awayTeamGoals: 1,
    inProgress: true,
  };

  const mockSuccessBodyResponse = {
    id: 1,
    ...bodyRequestMock,
  };

  let token: string;

  before(async () => {
    exec('npm run db:reset');

    const { body: { token: loginToken } } = await chai
      .request(app)
      .post('/login')
      .set('content-type', 'application/json')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      })

    token = loginToken;
  });

  after(() => {
    exec('npm run db:reset');
  });

  it('with an invalid id', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .patch('/matchs/thisIsANumber')
      .set('content-type', 'application/json')
      .set('authorization', token)
      .send(bodyRequestMock);

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(401);
    expect(response).to.have.own.property('message');
    expect(response.message).to.be.eql('\'id\' must be a number');
  });

  it('not found a team with this id', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .patch('/matchs/999')
      .set('content-type', 'application/json')
      .set('authorization', token)
      .send(bodyRequestMock);

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(404);
    expect(response).to.have.own.property('message');
    expect(response.message).to.be.eql('Has no match with this id');
  });

  it('with an invalid \'homeTeamGoals\'', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .patch('/matchs/1')
      .set('content-type', 'application/json')
      .set('authorization', token)
      .send({
        ...bodyRequestMock,
        homeTeamGoals: 'ThisIsANumber',
      });

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(401);
    expect(response).to.have.own.property('message');
    expect(response.message).to.be.eql('\'homeTeamGoals\' must be a number');
  });

  it('with an invalid \'awayTeamGoals\'', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .patch('/matchs/1')
      .set('content-type', 'application/json')
      .set('authorization', token)
      .send({
        ...bodyRequestMock,
        awayTeamGoals: 'ThisIsANumber',
      });

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(401);
    expect(response).to.have.own.property('message');
    expect(response.message).to.be.eql('\'awayTeamGoals\' must be a number');
  });

  it('on success', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .patch('/matchs/1')
      .set('content-type', 'application/json')
      .set('authorization', token)
      .send(bodyRequestMock);

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(200);
    expect(response).to.deep.equal(mockSuccessBodyResponse);
  });
}); */