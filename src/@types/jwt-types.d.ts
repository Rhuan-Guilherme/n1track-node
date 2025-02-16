import '@fastify/jwt';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      is_active: boolean;
      role: 'ADMIN' | 'USER' | 'SUPER';
      sub: string;
    };
  }
}
