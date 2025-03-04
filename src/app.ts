import fastify from 'fastify';
import { userRoutes } from './http/controllers/user/router';
import { ZodError } from 'zod';
import { env } from './env';
import fastifyJwt from '@fastify/jwt';
import { chatGtpIaRoutes } from './http/controllers/chatgtp-ia/router';
import fastifyCors from '@fastify/cors';
import { ticketsRoutes } from './http/controllers/ticket/router';
import { stfUsersRoutes } from './http/controllers/stfUsers/router';

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '30d',
  },
});

app.register(fastifyCors, {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Authorization', 'Content-Type', 'Origin'],
  credentials: true,
});

app.register(userRoutes);
app.register(ticketsRoutes);
app.register(stfUsersRoutes);
app.register(chatGtpIaRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    reply.status(400).send(error.errors);
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  }

  reply.status(500).send({ message: 'Internal Server Error' });
});
