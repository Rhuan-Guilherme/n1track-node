import { TicketRepositoryInterface } from '@/repositories/ticket-repository-interface';
import { UserRepositoryInterface } from '@/repositories/user-repository-interface';
import { Ticket } from '@prisma/client';
import { ResourceNotFoundError } from './exceptions/resource-not-foud-error';

interface CreateTicketRequest {
  name: string;
  login: string;
  ramal: string;
  local: string;
  patrimono: string;
  chamado: string;
  informacao: string;
  destinatario: string;
  area: string;
  type: 'CHAMADO' | 'REITERACAO' | 'TRANSFERENCIA' | 'QUEDA';
  vip: boolean;
  userId: string;
  status: 'ABERTO' | 'FECHADO';
}

interface CreateTicketResponse {
  ticket: Ticket;
}

export class CreateTicketUseCase {
  constructor(
    private TicketRepository: TicketRepositoryInterface,
    private UserRepository: UserRepositoryInterface
  ) {}

  async execute({
    area,
    chamado,
    destinatario,
    local,
    login,
    name,
    patrimono,
    ramal,
    type,
    vip,
    userId,
    informacao,
    status,
  }: CreateTicketRequest): Promise<CreateTicketResponse> {
    const user = await this.UserRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    const ticket = await this.TicketRepository.create({
      area,
      chamado,
      destinatario,
      local,
      login,
      name,
      patrimono,
      ramal,
      type,
      vip,
      status,
      informacao,
      user: { connect: user },
      userName: user.name,
    });

    return {
      ticket,
    };
  }
}
