import {
  Body,
  Controller,
  Post,
  Put,
  UseGuards,
  Param,
  Get,
  Delete,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Role } from '@prisma/client';
// import { TournamentTemplatesService } from './tournament-templates.service';
import { CreateTournamentTemplateDto } from './dto/create-tournament-template.dto';
// import { UpdateTournamentTemplateDto } from './dto/update-tournament-template.dto';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import type { CurrentUser as CurrentUserType } from 'src/shared/types';
import { RolesGuard } from '../auth/guards/roles.guard';
import { TournamentsService } from './tournaments.service';

@Controller('tournament-templates')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TournamentTemplatesController {
  constructor(private service: TournamentsService) {}

  @Post()
  @Roles(Role.ORGANIZER)
  create(
    @Body() dto: CreateTournamentTemplateDto,
    @CurrentUser() user: CurrentUserType,
  ) {
    console.log('body', dto);
    return this.service.createTournamentTemplate(dto, user.id);
  }

  @Get()
  @Roles(Role.ORGANIZER)
  findAll(@CurrentUser() user: CurrentUserType) {
    return this.service.getTournamentTemplateByUser(user.id);
  }

  @Put(':id')
  @Roles(Role.ORGANIZER)
  update(
    @Param('id') id: string,
    // @Body() dto: UpdateTournamentTemplateDto,
    @CurrentUser() user: CurrentUserType,
  ) {
    // return this.service.update(+id, dto, user.id);
  }

  @Delete(':id')
  @Roles(Role.ORGANIZER)
  delete(@Param('id') id: string, @CurrentUser() user: CurrentUserType) {
    return this.service.deleteTournamentTemplateById(+id, user.id);
  }

  @Get('autocomplete')
  async getAutocomplete(@Query('queryName') queryName: string) {
    if (!queryName || queryName.length < 2) {
      return [];
    }

    return this.service.getTournamentTemplatesByName(queryName);
  }
}
