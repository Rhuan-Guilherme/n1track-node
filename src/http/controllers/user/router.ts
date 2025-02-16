import { FastifyInstance } from 'fastify';
import { createUser } from './create-user';

export function userRoutes(app: FastifyInstance) {
  app.post('/user', createUser);
}
