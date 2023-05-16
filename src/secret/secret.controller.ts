import { Body, Controller, Param, Get, Post } from '@nestjs/common';
import { SecretService } from './secret.service';
import { SecretDecrypt, SecretEncrypt } from '../types/Secret';

@Controller('/secret')
export class SecretController {
  constructor(
    private readonly secretService: SecretService,
  ) {}

  @Get('/:id/:token')
  async decrypt(@Param('id') id: number, @Param('token') token: string): Promise<SecretDecrypt> {
    return this.secretService.decrypt(Number(id), token);
  }

  @Post('/')
  async encrypt(@Body('text') text: string): Promise<SecretEncrypt> {
    return this.secretService.encrypt(text);
  }
}
