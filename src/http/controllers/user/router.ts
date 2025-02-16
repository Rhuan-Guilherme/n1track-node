import { FastifyInstance } from 'fastify';
import { createUser } from './create-user';
import { authenticateUser } from './authenticate';
import { getUser } from './get-user';
import { JWTVerify } from '@/http/middlewares/jwt-verify';

export function userRoutes(app: FastifyInstance) {
  app.post('/user', createUser);
  app.post('/session', authenticateUser);
  app.get('/profile', { onRequest: [JWTVerify] }, getUser);
}
