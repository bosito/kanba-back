/* eslint-disable no-undef */
// Agrupamos las pruebas con describe

import supertest from 'supertest';
import faker from 'faker';
import app from '../src/app.js';
import UserServices from '../src/services/users.services.js';

// === Matchers ===
// toBe -> comprobar valores de tipo string, numeric y boolean
// toHaveProperty -> comprobar que el objeto tenga una propiedad

// === Hooks ===
// beforeEach -> antes de cada prueba
// beforeAll -> antes de todas las pruebas
// afterEach -> después de cada prueba
// afterAll -> después de todas las pruebas

describe('Probando el método GET para /users', () => {
  test('Debería de obtener un status 200 /users', async () => {
    const response = await supertest(app).get('/users');

    expect(response.statusCode).toBe(200);
  });

  test('Debería de obtener un status 200 /users/3', async () => {
    const response = await supertest(app).get('/users/3');

    expect(response.statusCode).toBe(200);
  });

  test('Debería de recibir un objeto con la propiedad firstname para la petición /users/3', async () => {
    const response = await supertest(app).get('/users/3');

    expect(response.body).toHaveProperty('firstname');
  });
});

describe('Probando el método POST para /users', () => {
  let newUser = {};
  beforeEach(() => {
    newUser = {
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
  });

  test('Debería recibir un status 201 al agregar un usuario al sistema', async () => {
    const response = await supertest(app).post('/users').send(newUser);

    expect(response.statusCode).toBe(201);
  });

  test('Debería recibir un objeto con la propiedad id al agregar un usuario al sistema', async () => {
    const response = await supertest(app).post('/users').send(newUser);

    expect(response.body).toHaveProperty('id');
  });
});

describe('Probando el método PUT para /users', () => {
  let newUser = {};
  let userId = 0;
  beforeEach(async () => {
    // 1. Crear un nuevo usuario con datos falsos
    newUser = {
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    // 2. Agregar ese usuario en la DB
    const saveUser = await UserServices.insert(newUser);

    // 3. Guardar el id del usuario que acabamos de agregar en la DB
    userId = saveUser.id;
  });

  test('Debería recibir un status 200 al actualizar un usuario al sistema', async () => {
    newUser.firstname = 'Academlo';
    const response = await supertest(app).put(`/users/${userId}`).send(newUser);
    expect(response.statusCode).toBe(200);
  });

  test('Debería de recibir un mensaje satisfactorio al actualizar el usuario', async () => {
    newUser.firstname = 'Academlo';
    const response = await supertest(app).put(`/users/${userId}`).send(newUser);
    expect(response.body).toHaveProperty('message', 'Se ha actualizado el registro en el sistema');
  });
});

describe('Probando el método DELETE para /users', () => {
  let newUser = {};
  let userId = 0;
  beforeEach(async () => {
    // 1. Crear un nuevo usuario con datos falsos
    newUser = {
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    // 2. Agregar ese usuario en la DB
    const saveUser = await UserServices.insert(newUser);

    // 3. Guardar el id del usuario que acabamos de agregar en la DB
    userId = saveUser.id;
  });

  test('Debería recibir un status 200 al eliminar un usuario en el sistema', async () => {
    const response = await supertest(app).delete(`/users/${userId}`);
    expect(response.statusCode).toBe(200);
  });

  test('Debería de recibir un mensaje satisfactorio al actualizar el usuario', async () => {
    const response = await supertest(app).delete(`/users/${userId}`);
    expect(response.body).toHaveProperty('message', 'Se ha eliminado el registro en el sistema');
  });
});
