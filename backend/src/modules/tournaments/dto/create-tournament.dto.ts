import { TournamentCategory } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsInt, IsNumber, IsString } from 'class-validator';

export class CreateTournamentDto {
  @IsDate()
  @Type(() => Date)
  startsAt: Date;

  @IsInt()
  templateId: number;

  @IsEnum(TournamentCategory)
  category: TournamentCategory;

  @IsString()
  rating: string;

  @IsNumber()
  fee: number;
}