import { Injectable, NotFoundException } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import { PrismaService } from '../prisma/prisma.service';
import { SecretDecrypt, SecretEncrypt } from '../types/Secret';

@Injectable()
export class SecretService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  async decrypt(id: number, token: string): Promise<SecretDecrypt> {
    const expiredAt = { gte: new Date() };
    const deletedAt = new Date();
    const secret = await this.prismaService.secret.findFirstOrThrow({ where: { id, expiredAt } });

    if (secret.deletedAt) {
      throw new NotFoundException();
    }
    await this.prismaService.secret.update({ where: { id }, data: { deletedAt }});

    const data = secret.data.split(':');
    const password = Buffer.from(token, 'hex');
    const iv = Buffer.from(data[0], 'hex');
    const key = await promisify(scrypt)(password, 'salt', 32);
    const decipher = createDecipheriv('aes-256-ctr', key as Buffer, iv);
    const encryptedData = Buffer.from(data[1], 'hex');
    const decryptData = Buffer.concat([
      decipher.update(encryptedData),
      decipher.final(),
    ]);

    const text = decryptData.toString('utf-8');
    return { id, text };
  }

  async encrypt(text: string): Promise<SecretEncrypt> {
    const password = randomBytes(8);
    const expiredAt = new Date(Date.now() + 2 * (60 * 60 * 1000));
    const iv = randomBytes(16);
    const key = await promisify(scrypt)(password, 'salt', 32);
    const cipher = createCipheriv('aes-256-ctr', key as Buffer, iv);
    const encryptedData = Buffer.concat([
      cipher.update(Buffer.from(text, 'utf-8')),
      cipher.final(),
    ]);

    const data = `${iv.toString('hex')}:${encryptedData.toString('hex')}`
    const secret = await this.prismaService.secret.create({ data: { data, expiredAt } });

    const id = secret.id;
    const token = password.toString('hex');
    const tokenExpiredAt = expiredAt.toUTCString();
    return { id, token, tokenExpiredAt };
  }
}
