import { PrismaTicketRepository } from '@/repositories/prisma-repository/prisma-ticket-repository';
import { PrismaUserRepository } from '@/repositories/prisma-repository/prisma-user-repository';
import { CreateTicketUseCase } from '../create-ticket';

export function makeCreateTicket() {
  const userRepository = new PrismaUserRepository();
  const prismaRepository = new PrismaTicketRepository();
  const createTicketUseCase = new CreateTicketUseCase(
    prismaRepository,
    userRepository
  );

  return createTicketUseCase;
}
