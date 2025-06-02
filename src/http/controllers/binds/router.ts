import { FastifyInstance } from 'fastify';
import { createBind } from './create-bind';
import { getBinds } from './get-binds';
import { deleteBind } from './delete-bind';

export function bindRoutes(app: FastifyInstance) {
  app.get('/binds', getBinds);
  app.post('/binds/create', createBind);
  app.delete('/binds/delete/:id', deleteBind);
}
