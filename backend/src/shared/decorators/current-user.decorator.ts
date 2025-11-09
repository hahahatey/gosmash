// decorators/current-user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import {CurrentUser as CurrentUserType} from '../types';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): CurrentUserType => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return (request as any).user as CurrentUserType; // предполагается, что passport кладёт user в req
  },
);