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

  async allTicketsMetrics(): Promise<
    { id: string; name: string; email: string; ticketCount: number }[]
  > {
    const result = await prisma.$queryRaw<
      Array<{ id: string; name: string; email: string; ticketCount: number }>
    >`
    SELECT 
      u.id,
      u.name,
      u.email,
      CAST(COUNT(t.id) AS INTEGER) AS ticketCount
    FROM users u
    LEFT JOIN tickets t ON t."userId" = u.id AND t."isDeleted" = false
    GROUP BY u.id, u.name, u.email
    ORDER BY ticketCount DESC
  `;

    return result;
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

  async restoreTicket(id: string): Promise<void> {
    await prisma.ticket.update({
      data: {
        isDeleted: false,
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

  async performaceUser(id: string): Promise<{
    total: number;
    chamado: number;
    reiteracao: number;
    transferencia: number;
    queda: number;
  }> {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const total = await prisma.ticket.count({
      where: {
        userId: id,
        created_at: {
          gte: startOfToday,
          lte: endOfToday,
        },
      },
    });

    const chamado = await prisma.ticket.count({
      where: {
        userId: id,
        type: 'CHAMADO',
        created_at: {
          gte: startOfToday,
          lte: endOfToday,
        },
      },
    });

    const reiteracao = await prisma.ticket.count({
      where: {
        userId: id,
        type: 'REITERACAO',
        created_at: {
          gte: startOfToday,
          lte: endOfToday,
        },
      },
    });

    const transferencia = await prisma.ticket.count({
      where: {
        userId: id,
        type: 'TRANSFERENCIA',
        created_at: {
          gte: startOfToday,
          lte: endOfToday,
        },
      },
    });

    const queda = await prisma.ticket.count({
      where: {
        userId: id,
        type: 'QUEDA',
        created_at: {
          gte: startOfToday,
          lte: endOfToday,
        },
      },
    });

    return { total, chamado, reiteracao, transferencia, queda };
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
