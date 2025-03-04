import { JWTVerify } from '@/http/middlewares/jwt-verify';
import { FastifyInstance } from 'fastify';
import { findStfusers } from './find-stfusers';

export function stfUsersRoutes(app: FastifyInstance) {
  app.get('/stfusers/:params', { onRequest: [JWTVerify] }, findStfusers);
}
