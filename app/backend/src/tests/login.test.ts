import * as chai from 'chai';
import chaiHttp from 'chai-http';

import { app } from '../app';

import createToken from '../auth/createToken';

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login', () => {
  const mockPost = {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
  };

  let chaiResponse;

  const INCORRECT_EMAIL_OR_PASSWORD = 'Incorrect email or password';

  const NO_FIELD = 'All fields must be filled';

  it('Há um email incorreto no corpo da requisição', async () => {
    chaiResponse = await chai
      .request(app)
      .post('/login')
      .set('content-type', 'application/json')
      .send({
        email: 'wrong@wrong.com',
        password: 'secret_admin',
      });

    const { message } = chaiResponse.body;

    expect(chaiResponse.status).to.be.eql(401);
    expect(message).to.be.eql(INCORRECT_EMAIL_OR_PASSWORD);
  });

  it('Há uma senha incorreta no corpo da requisição', async () => {
    chaiResponse = await chai
      .request(app)
      .post('/login')
      .set('content-type', 'application/json')
      .send({
        email: 'admin@admin.com',
        password: 'wrong_secret',
      });

    const { message } = chaiResponse.body;

    expect(chaiResponse.status).to.be.eql(401);
    expect(message).to.be.eql(INCORRECT_EMAIL_OR_PASSWORD);
  });

  it('Não há um email no corpo da requisição', async () => {
    chaiResponse = await chai
      .request(app)
      .post('/login')
      .set('content-type', 'application/json')
      .send({
        password: 'secret_admin',
      });

    const { message } = chaiResponse.body;

    expect(chaiResponse.status).to.be.eql(401);
    expect(message).to.be.eql(NO_FIELD);
  });

  it('Não há uma senha no corpo da requisição', async () => {
    chaiResponse = await chai
      .request(app)
      .post('/login')
      .set('content-type', 'application/json')
      .send({
        email: 'admin@admin.com'
      });

    const { message } = chaiResponse.body;

    expect(chaiResponse.status).to.be.eql(401);
    expect(message).to.be.eql(NO_FIELD);
  });

  it('Corpo da requisição está correto', async () => {
    chaiResponse = await chai
      .request(app)
      .post('/login')
      .set('content-type', 'application/json')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      });

    const { user, token } = chaiResponse.body;

    expect(chaiResponse.status).to.be.eql(200);
    expect(user).to.be.eql(mockPost);
    expect(token).to.be.a('string');
  });
});

describe('GET /login/validate', () => {
  const mockPost = {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
  };

  let chaiResponse;

  const validMockToken = createToken(mockPost);

  it('Há um token inválido na cabeça da requisição', async () => {
    chaiResponse = await chai
      .request(app)
      .get('/login/validate')
      .set('content-type', 'application/json')
      .set('authorization', 'falseToken');

    const response = chaiResponse.body;

    expect(chaiResponse.status).to.be.eql(401);
    expect(response).to.have.own.property('message');
  });

  it('token válido', async () => {
    chaiResponse = await chai
      .request(app)
      .get('/login/validate')
      .set('content-type', 'application/json')
      .set('authorization', validMockToken);

    const response = chaiResponse.body;

    expect(chaiResponse.status).to.be.eql(200);
    expect(response).to.be.eql(mockPost.role);
  });
});
