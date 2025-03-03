import { PrismaTicketRepository } from '@/repositories/prisma-repository/prisma-ticket-repository';
import { UpdateTicketUseCase } from '../update-ticket';

export function makeUpdateTicket() {
  const prismaRepository = new PrismaTicketRepository();
  const updateTicketUseCase = new UpdateTicketUseCase(prismaRepository);

  return updateTicketUseCase;
}
