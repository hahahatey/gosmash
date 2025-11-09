import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Cookies = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
   
    const request = ctx.switchToHttp().getRequest();
     console.log(request.cookies);
    return data ? request.cookies?.[data] : request.cookies;
  },
);
