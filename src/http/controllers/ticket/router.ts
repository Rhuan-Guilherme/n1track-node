import { FastifyInstance } from 'fastify';
import { createTicket } from './create-ticket';
import { JWTVerify } from '@/http/middlewares/jwt-verify';
import { getAllTicketsByUser } from './get-all-tickets-by-user';

export function ticketsRoutes(app: FastifyInstance) {
  app.post('/ticket/create', { onRequest: [JWTVerify] }, createTicket);
  app.get('/tickets', { onRequest: [JWTVerify] }, getAllTicketsByUser);
}
