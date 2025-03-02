import { TicketRepositoryInterface } from '@/repositories/ticket-repository-interface';

export class DeleteTicketUseCase {
  constructor(private ticketRepository: TicketRepositoryInterface) {}

  async execute(id: string): Promise<void> {
    await this.ticketRepository.deleteTicket(id);
  }
}
