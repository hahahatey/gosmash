import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
  Response,
  UnauthorizedException,
  UseGuards,
  Req,
  Headers,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyDto } from './dto/verify.dto';
import { Cookies } from 'src/shared/decorators/cookies.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from 'src/shared/decorators/refresh-token.decorator';

interface CustomResponse extends Response {
  cookie: (name: string, value: string, options?: any) => void;
  clearCookie: (name: string, options?: any) => void;
}

@Controller('auth')
@UsePipes(new ValidationPipe({ transform: true }))
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('signup')
  async signup(@Body() dto: CreateUserDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  async signin(
    @Body() dto: VerifyDto,
    // @Res({ passthrough: true }) res: CustomResponse,
  ) {
    const {
      tokens: { accessToken, refreshToken },
      user,
    } = await this.authService.signin(dto);
    // res.cookie('refreshToken', refreshToken, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
    //   sameSite: 'lax',
    //   path: '/',
    //   maxAge: 30 * 24 * 60 * 60 * 1000, // 30 дней
    // });

    return { accessToken, refreshToken, user };
  }

  @Post('refresh')
  async refresh(
    @RefreshToken() refreshToken: string,
    // @Res({ passthrough: true }) res: CustomResponse,
  ) {
    if (!refreshToken) throw new UnauthorizedException();

    try {
      const {tokens} = await this.authService.refresh(refreshToken);
      return tokens;
    } catch {
      throw new UnauthorizedException();
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    // req — это Express Request объект
    const {telegramId, ...rest} = req.user;
    return rest; // установленный JwtStrategy
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@RefreshToken() refreshToken: string) {
    if (refreshToken) {
      await this.authService.logoutWithToken(refreshToken);
    }
    return { success: true };
  }

  @Get('health')
  healthCheck() {
    return {
      status: 'ok',
      message: 'Bot is running!',
      timestamp: new Date().toISOString(),
    };
  }
}
