import { JWTVerify } from '@/http/middlewares/jwt-verify';
import { FastifyInstance } from 'fastify';
import { findStfusers } from './find-stfusers';
import { alterStfusersVip } from './alter-stfuser-vip';
import { removeStfusersVip } from './remove-stfuser-vip';

export function stfUsersRoutes(app: FastifyInstance) {
  app.get('/stfusers/:params', { onRequest: [JWTVerify] }, findStfusers);
  app.patch('/stfusers/vip/:id', { onRequest: [JWTVerify] }, alterStfusersVip);
  app.patch(
    '/stfusers/vipremove/:id',
    { onRequest: [JWTVerify] },
    removeStfusersVip
  );
}
