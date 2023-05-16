import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { SecretService } from './secret.service';
import { SecretController } from './secret.controller';
import { SecretResolver } from './secret.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(),
  ],
  controllers: [
    SecretController,
  ],
  providers: [
    PrismaService,
    SecretService,
    SecretResolver
  ],
})
export class SecretModule {}
