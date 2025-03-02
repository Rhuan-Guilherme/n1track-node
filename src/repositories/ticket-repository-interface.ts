import { Prisma, Ticket } from '@prisma/client';

export interface TicketRepositoryInterface {
  create(data: Prisma.TicketCreateInput): Promise<Ticket>;
  findAllById(userId: string): Promise<Ticket[] | null>;
}
