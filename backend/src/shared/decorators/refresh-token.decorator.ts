import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RefreshToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string | null => {
    const request = ctx.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return null;
    }

    const match = authHeader.match(/^Bearer\s+(.+)$/i);
    return match ? match[1] : null;
  },
);
