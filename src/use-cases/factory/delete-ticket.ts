import { PrismaTicketRepository } from '@/repositories/prisma-repository/prisma-ticket-repository';
import { DeleteTicketUseCase } from '../delete-ticket';

export function makeDeleteTicket() {
  const prismaRepository = new PrismaTicketRepository();
  const deleteTicketUseCase = new DeleteTicketUseCase(prismaRepository);

  return deleteTicketUseCase;
}
