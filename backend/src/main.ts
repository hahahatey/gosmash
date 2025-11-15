import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { config } from 'dotenv';
import { TelegramService } from './modules/telegram/telegram.service';
import { Telegraf } from 'telegraf';
config(); // ← это загружает .env

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use((req, res, next) => {
    // Разрешить только твой фронтенд
    if (req.headers.origin === 'http://localhost:3001') {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    }
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization',
    );
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    // Ответить на OPTIONS сразу
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    next();
  });

  await app.listen(process.env.PORT ?? 3000);

  const telegramService = app.get(TelegramService);

  app.useGlobalFilters(new AllExceptionsFilter()); // Регистрация глобального фильтра

  // app.enableCors({
  //   origin: 'http://localhost:3001', // Specific origin
  //   // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   credentials: true,
  //   // allowedHeaders: 'Content-Type, Authorization, X-Requested-With, Accept',
  //   preflightContinue: false,
  //   optionsSuccessStatus: 204,
  // });

  // app.useGlobalInterceptors(new CorsInterceptor());

  // try {
  //   await telegramService.setWebhook();
  //   console.log(`✅ Webhook set`);
  // } catch (error) {
  //   console.error('❌ Failed to set webhook:', error.message);
  // }
}
bootstrap();

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AllExceptionsFilter } from './shared/allExceptionsFilter';

@Injectable()
export class CorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();

    console.log('intercept');

    response.header('Access-Control-Allow-Origin', '*');
    response.header(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    );
    response.header(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, Accept',
    );

    return next.handle();
  }
}
