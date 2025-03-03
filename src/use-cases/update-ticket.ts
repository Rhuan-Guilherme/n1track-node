import { TicketRepositoryInterface } from '@/repositories/ticket-repository-interface';

interface UpdateTicketRequest {
  id: string;
  name?: string;
  login?: string;
  ramal?: string;
  local?: string;
  patrimono?: string;
  chamado?: string;
  informacao?: string;
  destinatario?: string;
  area?: string;
  type?: 'CHAMADO' | 'REITERACAO' | 'TRANSFERENCIA' | 'QUEDA';
  vip?: boolean;
}

export class UpdateTicketUseCase {
  constructor(private ticketRepository: TicketRepositoryInterface) {}

  async execute(data: UpdateTicketRequest) {
    return await this.ticketRepository.updateTicket(data.id, data);
  }
}
