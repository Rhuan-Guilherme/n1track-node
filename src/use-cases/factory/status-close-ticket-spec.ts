import { PrismaTicketRepository } from '@/repositories/prisma-repository/prisma-ticket-repository';
import { StatusCloseTicketUseCase } from '../status-close-ticket';

export function makeStatusCloseTicket() {
  const prismaRepository = new PrismaTicketRepository();
  const statusCloseTicketUseCase = new StatusCloseTicketUseCase(
    prismaRepository
  );

  return statusCloseTicketUseCase;
}
