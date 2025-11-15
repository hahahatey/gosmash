import { Injectable, OnModuleInit } from '@nestjs/common';
import { randomInt } from 'crypto';
import { PrismaService } from 'database/prisma.service';
import {
  Command,
  Ctx,
  Hears,
  InjectBot,
  On,
  Start,
  Update,
} from 'nestjs-telegraf';
import { Context, Markup, Telegraf } from 'telegraf';
import { AuthService } from '../auth/auth.service';

@Update()
@Injectable()
export class BotService {
  constructor(
    private authService: AuthService,
    @InjectBot() private bot: Telegraf<Context>,
  ) {}

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

    if (ctx.from?.username && ctx?.chat?.id) {
      console.log(ctx.from?.username, ctx.chat.id);
      await this.authService.updateTelegramId(
        `@${ctx.from?.username}`,
        ctx.chat.id,
      );
    }
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
      this.sendLoginCode(ctx);
      return;
    }
  }

  @Command('get_login_code')
  async onGetCode(@Ctx() ctx: Context) {
    await this.sendLoginCode(ctx);
  }

  async sendLoginCode(ctx: Context) {
    const user = ctx.from?.username
      ? await this.authService.getUserByTelegramNick(`@${ctx.from.username}`)
      : null;

    if (!user) {
      return ctx.reply(
        'Пользователь не найден. Зарегистрируйтесь в приложении.',
      );
    }

    const code = await this.authService.createLoginCode(user.id);

    //const messageText = `<span class="tg-spoiler">${code}</span>\n\nЭто код для входа. Нажми на размытый текст, чтобы раскрыть, и выдели для копирования.`;
    //const description = this.escapeMarkdownV2('Это код для входа. Или используй кнопку ниже для быстрого копирования.');
    //const messageText = `||\`${code}\`||\\n\\n${description}`;
    //const messageText = `<span class="tg-spoiler"><code>${code}</code></span>\n\nЭто код для входа. Нажми на размытый блок — он раскроется, и тапни на код, чтобы скопировать в буфер.`;
    let messageText = `Ваш код входа: ||\`${code}\`||\n`;

    const keyboard = {
      inline_keyboard: [
        [
          {
            text: '📋 Скопировать код',
            copy_text: {
              text: code, // Текст для копирования (твой код)
            },
          },
        ],
      ],
    };

    await ctx.reply(messageText, {
      // parse_mode: 'HTML',
      reply_markup: keyboard as any,
      parse_mode: 'MarkdownV2', // Для || и `
    });
  }

  // private escapeMarkdownV2(text: string): string {
  //   return text.replace(/([_*[\]()~`>#+-=|{}.!\\])/g, '\\$1');
  // }

  async sendLoginCodeToNickname(nickname: string) {
    const user = await this.authService.getUserByTelegramNick(`@${nickname}`);
    if (!user) {
      return {
        error: {
          type: 'USER_IS_NOT_FOUND',
        },
        success: false,
      };
    }

    if (!user.telegramId) {
      return {
        error: {
          type: 'START_CHAT_WITH_BOT',
        },
        success: false,
      };
    }

    const code = await this.authService.createLoginCode(user.id);
    const { messageText, keyboard } = this.formatLoginCodeMessage(code);
    try {
      await this.bot.telegram.sendMessage(
        user.telegramId.toString(),
        messageText,
        {
          reply_markup: keyboard as any,
          parse_mode: 'MarkdownV2',
        },
      );
      return { success: true };
    } catch (e) {
      return { success: false };
    }
  }

  formatLoginCodeMessage(code: string) {
    let messageText = `Ваш код входа: ||\`${code}\`||\n`;
    const keyboard = {
      inline_keyboard: [
        [
          {
            text: '📋 Скопировать код',
            copy_text: {
              text: code, // Текст для копирования (твой код)
            },
          },
        ],
      ],
    };
    return { messageText, keyboard };
  }
}
