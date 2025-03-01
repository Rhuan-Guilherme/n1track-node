import { Prisma, Ticket } from '@prisma/client';

export interface TicketRepositoryInterface {
  create(data: Prisma.TicketCreateInput): Promise<Ticket>;
  findById(id: string): Promise<Ticket | null>;
}
