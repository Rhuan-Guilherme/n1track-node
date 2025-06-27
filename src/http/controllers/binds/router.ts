import { FastifyInstance } from 'fastify';
import { createBind } from './create-bind';
import { getBinds } from './get-binds';
import { deleteBind } from './delete-bind';
import { JWTVerify } from '@/http/middlewares/jwt-verify';

export function bindRoutes(app: FastifyInstance) {
  app.get('/binds', { onRequest: [JWTVerify] }, getBinds);
  app.post('/binds/create', { onRequest: [JWTVerify] }, createBind);
  app.delete('/binds/delete/:id', { onRequest: [JWTVerify] }, deleteBind);
}
