import { PrismaTicketRepository } from '@/repositories/prisma-repository/prisma-ticket-repository';
import { RestoreTicket } from '../restore-ticket';

export function makeRestoreTicket() {
  const prismaRepository = new PrismaTicketRepository();
  const restoreTicket = new RestoreTicket(prismaRepository);

  return restoreTicket;
}
