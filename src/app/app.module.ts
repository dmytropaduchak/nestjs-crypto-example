import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { VersionModule } from '../version/version.module';
import { SecretModule } from '../secret/secret.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      useFactory: () => {
        return {
          sortSchema: true,
          playground: false,
          autoSchemaFile: true,
          autoTransformHttpErrors: true,
          installSubscriptionHandlers: true,
          introspection: true,
          context: ({ req, connection }) => connection ? { req: connection.context } : { req },
          plugins: [ApolloServerPluginLandingPageLocalDefault()],
        };
      },
      imports: [],
      inject: [],
    }),
    SecretModule,
    VersionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
