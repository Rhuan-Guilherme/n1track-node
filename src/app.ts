import fastify from 'fastify';
import { userRoutes } from './http/controllers/user/router';
import { ZodError } from 'zod';
import { env } from './env';

export const app = fastify();

app.register(userRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    reply.status(400).send(error.errors);
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  }

  reply.status(500).send({ message: 'Internal Server Error' });
});
