import { FastifyInstance } from 'fastify';
import { createUser } from './create-user';
import { authenticateUser } from './authenticate';

export function userRoutes(app: FastifyInstance) {
  app.post('/user', createUser);
  app.post('/session', authenticateUser);
}
