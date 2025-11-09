import { Injectable, OnModuleInit } from '@nestjs/common';
import { randomInt } from 'crypto';
import { PrismaService } from 'database/prisma.service';
import { Command, Ctx, Hears, On, Start, Update } from 'nestjs-telegraf';
import { Context, Markup } from 'telegraf';
import { AuthService } from '../auth/auth.service';

@Update()
@Injectable()
export class BotService {
  constructor(private authService: AuthService) {}

  // Обработчик команды /start — показываем меню
  @Start()
  async startCommand(ctx: Context) {
    const menuText = 'Привет! Выберите действие:';
    await ctx.reply(
      menuText,
      Markup.inlineKeyboard([
        [Markup.button.callback('🔐 Получить код входа', 'get_code')], // Кнопка для отправки кода
      ]),
    );
  }

  @On('callback_query')
  async handleCallback(@Ctx() ctx: Context) {
    console.log('handle query', ctx.from?.username);
    const callbackQuery = ctx.callbackQuery;

    // Проверяем, что это именно DataQuery (содержит data)
    if (!callbackQuery || !('data' in callbackQuery)) {
      return; // Игнорируем другие типы callback'ов
    }

    if (callbackQuery.data === 'get_code') {
      await ctx.answerCbQuery();
      this.getLoginCode(ctx);
    }
  }

  @Command('get_login_code')
  async onGetCode(@Ctx() ctx: Context) {
    await this.getLoginCode(ctx);
  }

  async getLoginCode(ctx: Context) {
    const user = ctx.from?.username
      ? await this.authService.getUserByTelegramNick(`@${ctx.from.username}`)
      : null;

    if (!user) {
      return ctx.reply(
        'Пользователь не найден. Зарегистрируйтесь в приложении.',
      );
    }

    const code = await this.authService.createLoginCode(user.id);

    await ctx.reply(`Ваш код входа: *${code}*\nДействует 5 минут\\.`, {
      parse_mode: 'MarkdownV2',
    });
  }
}
