import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
// import * as TelegramBot from 'node-telegram-bot-api';
import { createHash, randomInt } from 'crypto'; // Для генерации кода
import { PrismaService } from 'database/prisma.service';
import { UserUncheckedCreateInput } from 'generated/prisma/models';
import { Role, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { VerifyDto } from './dto/verify.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(dto: CreateUserDto) {
    const {
      firstName,
      lastName,
      email,
      telegramNickname,
      birthDate,
    } = dto;

    const data = {
      firstName,
      lastName,
      email,
      telegramNickname,
      birthDate: new Date(birthDate),
    };

    await this.prisma.user.create({data});
    return {success: true};
  }

  async getUserByTelegramNick(telegramNick: string): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: { telegramNickname: telegramNick },
    });
  }

  async createLoginCode(userId: number): Promise<string> {
    const code = randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await this.prisma.loginCode.create({
      data: { code, userId: userId, expiresAt },
    });

    return code;
  }

  async generateTokens(userId: number, userRole: Role) {
    const payload = { id: userId, role: userRole };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '15m', // короткоживущий
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '30d',
    });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    await this.prisma.refreshToken.create({
      data: {
        token: this.hashToken(refreshToken), // безопаснее хранить хеш
        userId,
        expiresAt,
      },
    });

    return { accessToken, refreshToken };
  }

  // Хешируем токен перед сохранением (защита от утечки БД)
  private hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  async signin({ telegramNickname, code }: VerifyDto) {
    const user = await this.prisma.user.findUnique({
      where: { telegramNickname },
    });

    if (!user) throw new BadRequestException('Invalid nickname');

    const loginCode = await this.prisma.loginCode.findFirst({
      where: {
        userId: user.id,
        code,
        used: false,
        expiresAt: { gt: new Date(Date.now() - 5 * 60 * 1000) },
      },
    });

    if (!loginCode)
      throw new UnauthorizedException({
        message: 'Login code expired',
        errorCode: 'LOGIN_CODE_EXPIRED',
      });

    await this.prisma.loginCode.update({
      where: { id: loginCode.id },
      data: { used: true },
    });

    const { telegramId, ...userWithoutTelegramId } = user;

    return {
      tokens: await this.generateTokens(user.id, user.role),
      user: userWithoutTelegramId,
    };
  }

  // Проверка и обновление refresh-токена
  async refresh(refreshToken: string) {
    let payload: { id: number; userRole: Role };
    try {
      payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: payload.id },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Проверяем, существует ли токен в БД
    const hashedToken = this.hashToken(refreshToken);
    const storedToken = await this.prisma.refreshToken.findUnique({
      where: { token: hashedToken },
    });

    if (!storedToken || storedToken.expiresAt < new Date()) {
      throw new UnauthorizedException('Refresh token revoked or expired');
    }

    // ✅ Опционально: отзывать старый и выдавать новый
    await this.prisma.refreshToken.delete({ where: { id: storedToken.id } });

    const newTokens = await this.generateTokens(user.id, user.role);
    return { tokens: newTokens, user };
  }

  async logout(userId: number) {
    await this.prisma.refreshToken.deleteMany({
      where: { userId },
    });
  }

  // Или отзыв конкретного токена (если передаёте его на logout)
  async logoutWithToken(refreshToken: string) {
    const hashed = this.hashToken(refreshToken);
    await this.prisma.refreshToken.deleteMany({
      where: { token: hashed },
    });
  }

  updateTelegramId(nickname: string, telegramId: number) {
    return this.prisma.user.update({
      where: { telegramNickname: nickname },
      data: {
        telegramId,
      },
    });
  }
}
