import { Prisma, Ticket } from '@prisma/client';

export interface TicketRepositoryInterface {
  create(data: Prisma.TicketCreateInput): Promise<Ticket>;
  updateTicket(id: string, data: Prisma.TicketUpdateInput): Promise<Ticket>;
  findAllById(userId: string): Promise<Ticket[] | null>;
  deleteTicket(id: string): Promise<void>;
  alterStatusClose(id: string): Promise<void>;
  alterStatusOpen(id: string): Promise<void>;
}
