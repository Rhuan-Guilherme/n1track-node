import { PrismaTicketRepository } from '@/repositories/prisma-repository/prisma-ticket-repository';
import { StatusOpenTicketUseCase } from '../status-open-tickets';

export function makeStatusOpenTicket() {
  const prismaRepository = new PrismaTicketRepository();
  const statusOpenTicketUseCase = new StatusOpenTicketUseCase(prismaRepository);

  return statusOpenTicketUseCase;
}
