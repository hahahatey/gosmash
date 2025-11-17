// tournaments.controller.ts
import {
  Body,
  Controller,
  Post,
  Put,
  UseGuards,
  Param,
  Get,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '@prisma/client';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import type { CurrentUser as CurrentUserType } from 'src/shared/types';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { TournamentsService } from './tournaments.service';

@Controller('tournaments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TournamentsController {
  constructor(private service: TournamentsService) {}

  @Post()
  @Roles(Role.ORGANIZER)
  create(
    @Body() dto: CreateTournamentDto,
    @CurrentUser() user: CurrentUserType,
  ) {
    return this.service.createTournament(dto, user.id);
  }

  @Get('organizer')
  @Roles(Role.ORGANIZER)
  findAll(@CurrentUser() user: CurrentUserType) {
    return this.service.getTournamentsByOrganizer(user.id);
  }

  @Put(':id')
  @Roles(Role.ORGANIZER)
  update(
    @Param('id') id: string,
    // @Body() dto: UpdateTournamentDto,
    @CurrentUser() user: CurrentUserType,
  ) {
    // return this.service.update(+id, dto, user.id);
  }
}
