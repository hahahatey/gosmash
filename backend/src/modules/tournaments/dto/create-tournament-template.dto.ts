import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateTournamentTemplateDto {
  @IsString()
  name: string;

  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  description?: string;
}