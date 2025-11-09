import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNumber } from 'class-validator';

export class CreateTournamentDto {
  @IsDate()
  @Type(() => Date)
  startsAt: Date;

  @IsDate()
  @Type(() => Date)
  registrationEndsAt: Date;

  @IsInt()
  templateId: number;

  @IsInt()
  categoryId: number;

  @IsNumber()
  fee: number;
}