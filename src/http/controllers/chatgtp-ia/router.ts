import { FastifyInstance } from 'fastify';
import { formatEmail } from './format-email';
import { formatText } from './format-text';

export function chatGtpIaRoutes(app: FastifyInstance) {
  app.post('/api/formatemail', formatEmail);
  app.post('/api/formattext', formatText);
}
