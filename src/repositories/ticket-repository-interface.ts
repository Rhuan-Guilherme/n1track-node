import { Prisma, Ticket } from '@prisma/client';

export interface TicketRepositoryInterface {
  create(data: Prisma.TicketCreateInput): Promise<Ticket>;
  updateTicket(id: string, data: Prisma.TicketUpdateInput): Promise<Ticket>;
  allTicketsMetrics(): Promise<unknown>;
  findAllById(
    userId: string,
    isDeleted?: boolean,
    vip?: boolean,
    open?: boolean,
    close?: boolean,
    type?: 'CHAMADO' | 'REITERACAO' | 'TRANSFERENCIA' | 'QUEDA'
  ): Promise<Ticket[] | null>;
  deleteTicket(id: string): Promise<void>;
  restoreTicket(id: string): Promise<void>;
  alterStatusClose(id: string): Promise<void>;
  performaceUser(id: string): Promise<{
    total: number;
    chamado: number;
    reiteracao: number;
    transferencia: number;
    queda: number;
  }>;
  alterStatusOpen(id: string): Promise<void>;
}
