import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class SecretDecryptArgs {
  @Field()
  id: number;

  @Field()
  token: string;
}

@ArgsType()
export class SecretEncryptArgs {
  @Field()
  text: string;
}
