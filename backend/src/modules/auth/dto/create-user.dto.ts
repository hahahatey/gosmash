import { IsString, IsDateString, MinLength, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsDateString()
  birthDate: string;  // Формат: 'YYYY-MM-DD'

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  email: string;

  @IsString()
  @Matches(/^@[\w]+$/, { message: 'Telegram nickname must start with @ and contain only letters, numbers, underscores' })
  telegramNickname: string;

  @IsString() 
  @Matches(/^\+?[1-9]\d{1,14}$/) 
  phone: string;
}