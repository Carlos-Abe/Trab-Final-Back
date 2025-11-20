// Issue 09

const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../app');
const Freelancer = require('../models/freelancerModel');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Freelancer.deleteMany();
});

describe('CRUD Completo de Freelancers', () => {

  test('POST /api/freelancers - Deve criar um novo freelancer com dados válidos', async () => {
    const res = await request(app)
      .post('/api/freelancers')
      .send({ nome: 'João', area: 'Design', disponibilidade: 'disponível', nota: 4 });

    expect(res.statusCode).toBe(201);
    expect(res.body.nome).toBe('João');
  });

  test('POST /api/freelancers - Deve falhar ao criar freelancer sem nome', async () => {
    const res = await request(app)
      .post('/api/freelancers')
      .send({ area: 'Design' });

    expect(res.statusCode).toBe(400);
    expect(res.body.erro).toBeDefined();
  });

  test('GET /api/freelancers - Deve retornar todos os freelancers', async () => {
    await Freelancer.create({ nome: 'Maria', area: 'Desenvolvimento' });
    const res = await request(app).get('/api/freelancers');

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].nome).toBe('Maria');
  });

  test('GET /api/freelancers/:id - Deve retornar freelancer por ID', async () => {
    const freelancer = await Freelancer.create({ nome: 'Carlos', area: 'Marketing' });
    const res = await request(app).get(`/api/freelancers/${freelancer._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.nome).toBe('Carlos');
  });

  test('GET /api/freelancers/:id - Deve retornar 404 se freelancer não existir', async () => {
    const res = await request(app).get(`/api/freelancers/${new mongoose.Types.ObjectId()}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.erro).toBe('Freelancer não encontrado');
  });

  test('PUT /api/freelancers/:id - Deve atualizar um freelancer existente', async () => {
    const freelancer = await Freelancer.create({ nome: 'Ana', area: 'UX', nota: 3 });
    const res = await request(app)
      .put(`/api/freelancers/${freelancer._id}`)
      .send({ nota: 5 });

    expect(res.statusCode).toBe(200);
    expect(res.body.nota).toBe(5);
  });

  test('PUT /api/freelancers/:id - Deve retornar 404 ao tentar atualizar freelancer inexistente', async () => {
    const res = await request(app)
      .put(`/api/freelancers/${new mongoose.Types.ObjectId()}`)
      .send({ nota: 5 });

    expect(res.statusCode).toBe(404);
    expect(res.body.erro).toBe('Freelancer não encontrado');
  });

  test('DELETE /api/freelancers/:id - Deve deletar um freelancer existente', async () => {
    const freelancer = await Freelancer.create({ nome: 'Pedro', area: 'Frontend' });
    const res = await request(app).delete(`/api/freelancers/${freelancer._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.mensagem).toBe('Freelancer deletado com sucesso');
  });

  test('DELETE /api/freelancers/:id - Deve retornar 404 ao tentar deletar freelancer inexistente', async () => {
    const res = await request(app).delete(`/api/freelancers/${new mongoose.Types.ObjectId()}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.erro).toBe('Freelancer não encontrado');
  });

});
