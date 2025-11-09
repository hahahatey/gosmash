import { IsString, Matches } from "class-validator";

export class CreateEmptyUserDto {
  @IsString()
  @Matches(/^@[\w]+$/, { message: 'Telegram nickname must start with @ and contain only letters, numbers, underscores' })
  telegramNickname: string;

  telegramChatId: number;
}