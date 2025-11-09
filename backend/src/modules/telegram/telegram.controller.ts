import { Body, Controller, Post } from '@nestjs/common';
import { PrismaService } from 'database/prisma.service';
import { AuthService } from '../auth/auth.service';
import { TelegramService } from './telegram.service';

@Controller('telegram')
export class TelegramController {
  constructor(private telegramService: TelegramService) {}

  @Post('webhook')
  async handleWebhook(@Body() update: any) {
    const message = update?.message;
    if (!message || !message.from?.id) return 'OK';

    const { id: telegramId, username, first_name, last_name } = message.from;

    console.log(message.from);

    // await this.telegramService.setTelegramId(telegramId, username);

    // const { id: telegramId, username, first_name, last_name } = message.from;
    // if (username) {
    //   // Сохраняем/обновляем user (lowercase для username)
    //   await this.prisma.user.upsert({
    //     where: { telegramUsername: username.toLowerCase() },
    //     update: { telegramId: BigInt(telegramId) },
    //     create: {
    //       telegramUsername: username.toLowerCase(),
    //       telegramId: BigInt(telegramId),
    //     },
    //   });
    // }
    // return 'OK';
    return 'OK';
  }
}