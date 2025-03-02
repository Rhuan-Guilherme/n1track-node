import { TicketRepositoryInterface } from '@/repositories/ticket-repository-interface';

export class StatusCloseTicketUseCase {
  constructor(private ticketRepository: TicketRepositoryInterface) {}

  async execute(id: string): Promise<void> {
    await this.ticketRepository.alterStatusClose(id);
  }
}
