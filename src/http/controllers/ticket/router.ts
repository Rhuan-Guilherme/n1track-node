import { FastifyInstance } from 'fastify';
import { createTicket } from './create-ticket';
import { JWTVerify } from '@/http/middlewares/jwt-verify';
import { getAllTicketsByUser } from './get-all-tickets-by-user';
import { statusCloseTicket } from './status-close-ticket';
import { statusOpenTicket } from './status-open-ticket';
import { deleteTicket } from './delete-ticket';
import { updateTicket } from './update-ticket';

export function ticketsRoutes(app: FastifyInstance) {
  app.post('/ticket/create', { onRequest: [JWTVerify] }, createTicket);
  app.get('/tickets', { onRequest: [JWTVerify] }, getAllTicketsByUser);
  app.patch('/ticket/close/:id', { onRequest: [JWTVerify] }, statusCloseTicket);
  app.patch('/ticket/open/:id', { onRequest: [JWTVerify] }, statusOpenTicket);
  app.delete('/ticket/delete/:id', { onRequest: [JWTVerify] }, deleteTicket);
  app.put('/ticket/update/:id', { onRequest: [JWTVerify] }, updateTicket);
}
