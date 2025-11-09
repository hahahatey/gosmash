import { Module } from '@nestjs/common';
import { TournamentsController } from './tournaments.controller';
import { TournamentTemplatesController } from './tournament-templates.controller';
import { TournamentParticipantsController } from './tournament-participants.controller';
import { TournamentsService } from './tournaments.service';
import { PrismaService } from 'database/prisma.service';

@Module({
  controllers: [
    TournamentsController,
    TournamentTemplatesController,
    TournamentParticipantsController,
  ],
  providers: [TournamentsService, PrismaService],
  exports: [TournamentsService],
})
export class TournamentsModule {}