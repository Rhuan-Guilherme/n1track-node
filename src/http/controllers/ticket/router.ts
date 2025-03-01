import { FastifyInstance } from 'fastify';
import { createTicket } from './create-ticket';
import { JWTVerify } from '@/http/middlewares/jwt-verify';

export function ticketsRoutes(app: FastifyInstance) {
  app.post('/ticket/create', { onRequest: [JWTVerify] }, createTicket);
}
