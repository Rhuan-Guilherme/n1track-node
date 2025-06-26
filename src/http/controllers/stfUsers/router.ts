import { JWTVerify } from '@/http/middlewares/jwt-verify';
import { FastifyInstance } from 'fastify';
import { findStfusers } from './find-stfusers';
import { alterStfusersVip } from './alter-stfuser-vip';
import { removeStfusersVip } from './remove-stfuser-vip';
import { updateStfusers } from './update-stf-user';
import { returnTopStfUsers } from './return-top-stf-users';
import { returnTopStfUsersMonth } from './return-top-stf-users-month';
import { createStfUser } from './create-stf-user';

export function stfUsersRoutes(app: FastifyInstance) {
  app.get('/stfusers/:params', { onRequest: [JWTVerify] }, findStfusers);
  app.patch('/stfusers/vip/:id', { onRequest: [JWTVerify] }, alterStfusersVip);
  app.patch(
    '/stfusers/vipremove/:id',
    { onRequest: [JWTVerify] },
    removeStfusersVip
  );
  app.put('/stfusers/update/:id', updateStfusers);
  app.get('/stfusers/topusers', returnTopStfUsers);
  app.get('/stfusers/topusers/month', returnTopStfUsersMonth);
  app.post('/stfusers', createStfUser);
}
