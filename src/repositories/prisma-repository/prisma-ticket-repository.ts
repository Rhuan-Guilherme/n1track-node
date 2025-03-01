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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findById(id: string): Promise<Ticket | null> {
    throw new Error('Method not implemented.');
  }
}
