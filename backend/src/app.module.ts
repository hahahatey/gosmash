import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaService } from 'database/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { TelegramService } from './modules/telegram/telegram.service';
import { TelegramModule } from './modules/telegram/telegram.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotService } from './modules/telegram/bot.service';
import { TournamentsModule } from './modules/tournaments/tournaments.module';
// ... другие модули

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TelegramModule, // ← теперь он импортирован
    TournamentsModule,
    TelegrafModule.forRootAsync({
      useFactory: () => ({
        token: process.env.TELEGRAM_BOT_TOKEN || '',
        // include: [BotService],
      }),
    }),
  ],
  providers: [PrismaService],
  // ...
})
export class AppModule {}
