import { PrismaTicketRepository } from '@/repositories/prisma-repository/prisma-ticket-repository';
import { GetPerformaceUser } from '../get-performace-user';

export function makePerformaceTicket() {
  const prismaRepository = new PrismaTicketRepository();
  const performaceUser = new GetPerformaceUser(prismaRepository);

  return performaceUser;
}
