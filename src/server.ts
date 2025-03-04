import { app } from './app';
import { env } from './env';

app
  .listen({
    port: env.PORT,
    host: '0.0.0.0', // to allow connections from outside the container
  })
  .then(() =>
    console.log(`🚀 Server listening in http://localhost:${env.PORT}`)
  );
