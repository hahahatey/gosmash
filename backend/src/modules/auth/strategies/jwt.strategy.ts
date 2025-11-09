import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common'; // или твой путь
import { PrismaService } from 'database/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET, // например, 'MY_JWT_SECRET'
    });
  }

  async validate(payload: { id: string }) {
    // payload.sub — это userId из токена
    const user = await this.prisma.user.findUnique({
      where: { id: Number(payload.id) },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user; // будет доступен как req.user
  }
}
