import { IsString, IsDateString, MinLength, Matches, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsDateString()
  birthDate: string;  // Формат: 'YYYY-MM-DD'

  @IsString()
  email: string;

  @IsString()
  @IsOptional()
  @Matches(/^@[\w]+$/, { message: 'Telegram nickname must start with @ and contain only letters, numbers, underscores' })
  telegramNickname: string;
}