import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SecretService } from './secret.service';
import { SecretEncrypt, SecretDecrypt } from '../types/Secret';
import { SecretDecryptArgs, SecretEncryptArgs } from '../args/secret.args';

@Resolver()
export class SecretResolver {
  constructor(
    private readonly secretService: SecretService,
  ) {}

  @Query(() => SecretDecrypt)
  async decrypt(@Args() args: SecretDecryptArgs): Promise<SecretDecrypt> {
    const { id, token } = args;
    return this.secretService.decrypt(id, token);
  }

  @Mutation(() => SecretEncrypt)
  async encrypt(@Args() args: SecretEncryptArgs): Promise<SecretEncrypt> {
    const { text } = args;
    return this.secretService.encrypt(text);
  }
}
