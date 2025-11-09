import { Body, Controller, Post, UseGuards, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RegisterParticipantDto } from './dto/register-participant.dto';
import type {CurrentUser as CurrentUserType} from 'src/shared/types'
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';

@Controller('tournament-participants')
@UseGuards(JwtAuthGuard)
export class TournamentParticipantsController {
  @Post()
  register(
    @Body() dto: RegisterParticipantDto,
    @CurrentUser() user: CurrentUserType,
  ) {
  //   return this.service.register(user.id, dto.tournamentId);
  }

  // Опционально: отмена участия
  @Post(':tournamentId/unregister')
  unregister(
    @Param('tournamentId') tournamentId: string,
    @CurrentUser() user: CurrentUserType,
  ) {
    // return this.service.unregister(user.id, +tournamentId);
  }
}