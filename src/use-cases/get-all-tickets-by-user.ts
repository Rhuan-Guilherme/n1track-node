import { TicketRepositoryInterface } from '@/repositories/ticket-repository-interface';
import { ResourceNotFoundError } from './exceptions/resource-not-foud-error';

export class GetAllTicketsByUserUseCase {
  constructor(private TicketRepository: TicketRepositoryInterface) {}

  async execute(userId: string) {
    const tickets = await this.TicketRepository.findAllById(userId);

    if (!tickets) {
      throw new ResourceNotFoundError();
    }

    return tickets;
  }
}
