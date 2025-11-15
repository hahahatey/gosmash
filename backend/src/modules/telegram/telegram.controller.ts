import { Body, Controller, Post } from '@nestjs/common';
import { PrismaService } from 'database/prisma.service';
import { AuthService } from '../auth/auth.service';
import { TelegramService } from './telegram.service';
import { BotService } from './bot.service';
import { SendLoginCodeDto } from './dto/send-login-code.dto';

@Controller('telegram')
export class TelegramController {
  constructor(private botService: BotService) {}

  @Post('send-login-code')
  sendCode(@Body() dto: SendLoginCodeDto,) {
    return this.botService.sendLoginCodeToNickname(dto.nickname);
  }
}