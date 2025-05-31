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

  async updateTicket(
    id: string,
    data: Prisma.TicketUpdateInput
  ): Promise<Ticket> {
    const ticket = await prisma.ticket.update({
      where: {
        id,
      },
      data,
    });

    return ticket;
  }

  async findAllById(
    userId: string,
    isDeleted?: boolean,
    vip?: boolean,
    open?: boolean,
    close?: boolean,
    type?: 'CHAMADO' | 'REITERACAO' | 'TRANSFERENCIA' | 'QUEDA'
  ): Promise<Ticket[] | null> {
    console.log(type);

    const tickets = await prisma.ticket.findMany({
      where: {
        vip,
        userId,
        type,
        isDeleted: isDeleted ? true : false,
        status:
          open && close
            ? undefined
            : open
            ? 'ABERTO'
            : close
            ? 'FECHADO'
            : undefined,
      },
      orderBy: {
        created_at: 'desc',
      },
      take: 100,
    });

    return tickets;
  }

  async deleteTicket(id: string): Promise<void> {
    await prisma.ticket.update({
      data: {
        isDeleted: true,
      },
      where: {
        id,
      },
    });
  }
  async alterStatusClose(id: string): Promise<void> {
    await prisma.ticket.update({
      where: {
        id,
      },
      data: {
        status: 'FECHADO',
      },
    });
  }
  async alterStatusOpen(id: string): Promise<void> {
    await prisma.ticket.update({
      where: {
        id,
      },
      data: {
        status: 'ABERTO',
      },
    });
  }
}
