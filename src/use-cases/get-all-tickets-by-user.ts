import { TicketRepositoryInterface } from '@/repositories/ticket-repository-interface';
import { ResourceNotFoundError } from './exceptions/resource-not-foud-error';

export class GetAllTicketsByUserUseCase {
  constructor(private TicketRepository: TicketRepositoryInterface) {}

  async execute(
    userId: string,
    isDeleted?: boolean,
    vip?: boolean,
    open?: boolean,
    close?: boolean
  ) {
    const tickets = await this.TicketRepository.findAllById(
      userId,
      isDeleted,
      vip,
      open,
      close
    );

    if (!tickets) {
      throw new ResourceNotFoundError();
    }

    return tickets;
  }
}
