import { FastifyInstance } from 'fastify';
import { formatEmail } from './format-email';
import { formatText } from './format-text';
import { JWTVerify } from '@/http/middlewares/jwt-verify';

export function chatGtpIaRoutes(app: FastifyInstance) {
  app.post('/api/formatemail', { onRequest: [JWTVerify] }, formatEmail);
  app.post('/api/formattext', { onRequest: [JWTVerify] }, formatText);
}
