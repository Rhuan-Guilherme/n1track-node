import { PrismaTicketRepository } from '@/repositories/prisma-repository/prisma-ticket-repository';
import { GetAllTicketsByUserUseCase } from '../get-all-tickets-by-user';

export function makeGetAllTicketsByUser() {
  const prismaRepository = new PrismaTicketRepository();
  const getAllTicketsByUserUseCase = new GetAllTicketsByUserUseCase(
    prismaRepository
  );

  return getAllTicketsByUserUseCase;
}
