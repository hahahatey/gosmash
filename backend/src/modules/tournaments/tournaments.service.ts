import { Injectable } from '@nestjs/common';
import { CreateTournamentTemplateDto } from './dto/create-tournament-template.dto';
import { PrismaService } from 'database/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';

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

  deleteTournamentTemplateById(id: number, userId: number) {
    return this.prisma.tournamentTemplate.delete({
      where: { id, organizerId: userId },
    });
  }
}
