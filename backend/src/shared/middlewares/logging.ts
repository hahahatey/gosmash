import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggingMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, body, query, headers } = req;
    const startTime = Date.now();

    // Логируем начало запроса
    this.logger.log(
      `${method} ${originalUrl} | Query: ${JSON.stringify(query)} | Body: ${JSON.stringify(body)} | Headers: ${JSON.stringify(headers)}`
    );

    // Логируем завершение запроса с кодом ответа
    res.on('finish', () => {
      const endTime = Date.now();
      const duration = endTime - startTime;
      this.logger.log(
        `${method} ${originalUrl} | ${res.statusCode} | ${duration}ms`
      );
    });

    next();
  }
}