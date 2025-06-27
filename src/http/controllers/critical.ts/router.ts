import { FastifyInstance } from 'fastify';
import { createCritical } from './create-critical';
import { getCritical } from './get-critical';
import { deleteCritical } from './delete-critical';
import { JWTVerify } from '@/http/middlewares/jwt-verify';

export function criticalRoutes(app: FastifyInstance) {
  app.get('/critical', { onRequest: [JWTVerify] }, getCritical);
  app.post('/critical/create', { onRequest: [JWTVerify] }, createCritical);
  app.delete(
    '/critical/delete/:id',
    { onRequest: [JWTVerify] },
    deleteCritical
  );
}
