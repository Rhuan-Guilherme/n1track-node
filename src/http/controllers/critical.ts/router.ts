import { FastifyInstance } from 'fastify';
import { createCritical } from './create-critical';
import { getCritical } from './get-critical';
import { deleteCritical } from './delete-critical';

export function criticalRoutes(app: FastifyInstance) {
  app.get('/critical', getCritical);
  app.post('/critical/create', createCritical);
  app.delete('/critical/delete/:id', deleteCritical);
}
