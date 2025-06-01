import { TicketRepositoryInterface } from '@/repositories/ticket-repository-interface';

export class RestoreTicket {
  constructor(private ticketRepository: TicketRepositoryInterface) {}

  async execute(id: string): Promise<void> {
    await this.ticketRepository.restoreTicket(id);
  }
}
