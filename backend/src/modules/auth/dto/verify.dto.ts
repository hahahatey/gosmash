import { IsString, Matches, Length } from 'class-validator';

export class VerifyDto {
  @IsString()
  @Matches(/^@[\w]+$/)
  telegramNickname: string;

  @IsString()
  @Length(6, 6)  // Код — 6 цифр
  code: string;
}