import * as chai from 'chai';
import chaiHttp from 'chai-http';

import { app } from '../app';
import { getAllClubsMock } from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /clubs', () => {
  let chaiHttpResponse;

  it('Caso de sucesso ao retornar todos os times', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .set('content-type', 'application/json')

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(401);
    expect(response).to.be.eql(getAllClubsMock);
  });
});

describe('GET /clubs/:id', () => {
  let chaiHttpResponse;

  const INVALID_ID = 'Id must be a number';

  const NO_CLUB = 'Has no club with this id';

  it('Há um id inválido', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/clubs/wrongid')
      .set('content-type', 'application/json');

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(400);
    expect(response).to.have.own.property('message');
    expect(response.message).to.be.eql(INVALID_ID);
  });

  it('Não foi encontrado um clube com este id', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/clubs/99')
      .set('content-type', 'application/json');

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(404);
    expect(response).to.have.own.property('message');
    expect(response.message).to.be.eql(NO_CLUB);
  });

  it('Sucesso ao tentar encontrar um clube com este id', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/clubs/1')
      .set('content-type', 'application/json');

    const response = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.eql(200);
    expect(response).to.be.eql(getAllClubsMock[0]);
  });
});