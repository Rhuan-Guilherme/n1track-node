import { TicketRepositoryInterface } from '@/repositories/ticket-repository-interface';

export class allTicketsMetricsUseCase {
  constructor(private ticketsRepository: TicketRepositoryInterface) {}

  async execute() {
    const metrics = await this.ticketsRepository.allTicketsMetrics();

    return metrics;
  }
}
