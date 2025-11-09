import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class TelegramService {
  private botToken: string;

  constructor(
    private config: ConfigService,
    private http: HttpService,
  ) {
    this.botToken = this.config.get<string>('TELEGRAM_BOT_TOKEN') || '';
    if (!this.botToken) throw new Error('TELEGRAM_BOT_TOKEN not set');
  }

  async setWebhook(): Promise<void> {
    const url = `https://api.telegram.org/bot${this.botToken}/setWebhook`;
    const data = { url: this.config.get<string>('WEBHOOK_URL') };

    try {
      const response = await firstValueFrom(this.http.post(url, data));
      if (response.data.ok) {
        console.log('Webhook set successfully');
      } else {
        throw new Error(`Telegram API error: ${response.data.description}`);
      }
    } catch (error) {
      console.error('SetWebhook error:', error.response?.data || error.message);
      throw error;
    }
  }

  async sendCode(telegramId: bigint, code: string): Promise<void> {
    const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
    const data = {
      chat_id: telegramId,
      text: `🔐 Ваш код для входа: *${code}*\nДействует 5 минут.`,
      parse_mode: 'Markdown',
    };

    try {
      await firstValueFrom(this.http.post(url, data));
    } catch (error) {
      console.error(
        'Failed to send Telegram code:',
        error.response?.data || error.message,
      );
      throw new InternalServerErrorException(
        'Could not send code via Telegram',
      );
    }
  }

  // async setTelegramId(telegramId: bigint, nickname: string) {
  //   await this.prisma.telegramChat.upsert({
  //     create: {
  //       telegramNickname: nickname,
  //       id: telegramId,
  //     },
  //     update: {
  //       id: telegramId,
  //     },
  //     where: {
  //       telegramNickname: nickname,
  //     }
  //   });
  // }
}
