import { IsInt } from 'class-validator';

export class RegisterParticipantDto {
  @IsInt()
  tournamentId: number;
  // userId берётся из токена
}