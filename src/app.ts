import fastify from 'fastify';
import { userRoutes } from './http/controllers/user/router';
import { ZodError } from 'zod';
import { env } from './env';
import fastifyJwt from '@fastify/jwt';
import { chatGtpIaRoutes } from './http/controllers/chatgtp-ia/router';

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '30d',
  },
});

app.register(userRoutes);
app.register(chatGtpIaRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    reply.status(400).send(error.errors);
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  }

  reply.status(500).send({ message: 'Internal Server Error' });
});
