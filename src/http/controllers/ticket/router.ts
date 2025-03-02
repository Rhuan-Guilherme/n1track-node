import { FastifyInstance } from 'fastify';
import { createTicket } from './create-ticket';
import { JWTVerify } from '@/http/middlewares/jwt-verify';
import { getAllTicketsByUser } from './get-all-tickets-by-user';
import { statusCloseTicket } from './status-close-ticket';
import { statusOpenTicket } from './status-open-ticket';
import { deleteTicket } from './delete-ticket';

export function ticketsRoutes(app: FastifyInstance) {
  app.post('/ticket/create', { onRequest: [JWTVerify] }, createTicket);
  app.get('/tickets', { onRequest: [JWTVerify] }, getAllTicketsByUser);
  app.get('/ticket/close/:id', { onRequest: [JWTVerify] }, statusCloseTicket);
  app.get('/ticket/open/:id', { onRequest: [JWTVerify] }, statusOpenTicket);
  app.delete('/ticket/delete/:id', { onRequest: [JWTVerify] }, deleteTicket);
}
