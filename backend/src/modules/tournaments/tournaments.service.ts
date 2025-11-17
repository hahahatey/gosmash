import { Injectable } from '@nestjs/common';
import { CreateTournamentTemplateDto } from './dto/create-tournament-template.dto';
import { PrismaService } from 'database/prisma.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';

@Injectable()
export class TournamentsService {
  constructor(private readonly prisma: PrismaService) {}

  createTournamentTemplate(dto: CreateTournamentTemplateDto, userId: number) {
    return this.prisma.tournamentTemplate.create({
      data: { ...dto, organizerId: userId },
    });
  }

  getTournamentTemplateByUser(userId: number) {
    return this.prisma.tournamentTemplate.findMany({
      where: { organizerId: userId },
    });
  }

  getTournamentTemplatesByName(queryName: string) {
    return this.prisma.tournamentTemplate.findMany({
      where: {
        name: {
          contains: queryName,
          mode: 'insensitive', // для нечувствительного к регистру поиска
        },
      },
      select: {
        id: true,
        name: true,
      },
      take: 10, // ограничение количества результатов
    });
  }

  deleteTournamentTemplateById(id: number, userId: number) {
    return this.prisma.tournamentTemplate.delete({
      where: { id, organizerId: userId },
    });
  }

  getTournamentsByOrganizer(userId: number) {
    const today = new Date();
    return this.prisma.tournament.findMany({
      where: {
        organizerId: userId,
        startsAt: {
          gt: today, // Меньше или равно сегодняшней дате (включая начало дня)
        },
      },
      include: { template: true },
    });
  }

  createTournament(dto: CreateTournamentDto, userId: number) {
    return this.prisma.tournament.create({
      data: { ...dto, organizerId: userId },
    });
  }
}
