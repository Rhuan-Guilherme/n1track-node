import { PrismaTicketRepository } from '@/repositories/prisma-repository/prisma-ticket-repository';
import { allTicketsMetricsUseCase } from '../all-tickets-metrics';

export function makeAllTicketMetrics() {
  const prismaRepository = new PrismaTicketRepository();
  const allTicketsMetrics = new allTicketsMetricsUseCase(prismaRepository);

  return allTicketsMetrics;
}
