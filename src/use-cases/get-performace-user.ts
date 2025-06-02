import { TicketRepositoryInterface } from '@/repositories/ticket-repository-interface';

export class GetPerformaceUser {
  constructor(private ticketRepository: TicketRepositoryInterface) {}

  async execute(id: string) {
    const performace = await this.ticketRepository.performaceUser(id);

    return performace;
  }
}
