import { Prisma, Ticket } from '@prisma/client';
import { TicketRepositoryInterface } from '../ticket-repository-interface';
import { prisma } from '@/lib/prisma';

export class PrismaTicketRepository implements TicketRepositoryInterface {
  async create(data: Prisma.TicketCreateInput): Promise<Ticket> {
    const ticket = await prisma.ticket.create({
      data,
    });

    return ticket;
  }
  async findAllById(userId: string): Promise<Ticket[] | null> {
    const tickets = await prisma.ticket.findMany({
      where: {
        userId,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return tickets;
  }
}
