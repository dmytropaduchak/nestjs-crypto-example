import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SecretDecrypt {
  @Field()
  id: number;
  
  @Field()
  text: string;
}

@ObjectType()
export class SecretEncrypt {
  @Field()
  id: number;

  @Field()
  token: string;

  @Field()
  tokenExpiredAt: string;
}
