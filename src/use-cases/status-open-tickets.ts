import { TicketRepositoryInterface } from '@/repositories/ticket-repository-interface';

export class StatusOpenTicketUseCase {
  constructor(private ticketRepository: TicketRepositoryInterface) {}

  async execute(id: string): Promise<void> {
    await this.ticketRepository.alterStatusOpen(id);
  }
}
