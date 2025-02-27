import { FastifyInstance } from 'fastify';
import { formatEmail } from './format-email';

export function chatGtpIaRoutes(app: FastifyInstance) {
  app.post('/api/formatemail', formatEmail)
}
