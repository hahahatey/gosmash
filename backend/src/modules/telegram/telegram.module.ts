import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotService } from './bot.service';
import { AuthModule } from '../auth/auth.module'; // ← нужен для AuthService
import { TelegramService } from './telegram.service';
import { HttpModule } from '@nestjs/axios';
import { TelegramController } from './telegram.controller';

@Module({
  imports: [
    HttpModule,
    AuthModule, // ← BotService зависит от AuthService
    // TelegrafModule.forRootAsync({
    //   useFactory: () => ({
    //     token: process.env.TELEGRAM_BOT_TOKEN || '',
    //     include: [BotService], // ✅ регистрируем обработчик здесь
    //   }),
    // }),
  ],
  controllers: [TelegramController],
  providers: [BotService, TelegramService],
  exports: [BotService, TelegramService], // на случай, если понадобится где-то ещё
})
export class TelegramModule {}