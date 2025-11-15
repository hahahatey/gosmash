import { IsString, IsNumber, IsOptional } from 'class-validator';

export class SendLoginCodeDto {
  @IsString()
  nickname: string;
}