import { FastifyInstance } from 'fastify';
import { createUser } from './create-user';
import { authenticateUser } from './authenticate';
import { getUser } from './get-user';
import { JWTVerify } from '@/http/middlewares/jwt-verify';
import { AlterActiveAndRole } from './alter-active-and-role-user';
import { RoleVerify } from '@/http/middlewares/role-verify';
import { getAllUsers } from './get-all-users';
import { deleteUsers } from './delete-user';

export function userRoutes(app: FastifyInstance) {
  app.post('/user', createUser);
  app.post('/session', authenticateUser);
  app.get('/profile', { onRequest: [JWTVerify] }, getUser);
  app.delete(
    '/deleteuser/:id',
    { onRequest: [JWTVerify, RoleVerify('ADMIN')] },
    deleteUsers
  );
  app.get(
    '/allusers',
    { onRequest: [JWTVerify, RoleVerify('ADMIN')] },
    getAllUsers
  );
  app.post(
    '/alteruser',
    { onRequest: [JWTVerify, RoleVerify('ADMIN')] },
    AlterActiveAndRole
  );
}
