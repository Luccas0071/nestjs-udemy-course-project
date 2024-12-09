import { Module } from '@nestjs/common';
import { RecadosModel } from './recados/recados.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoasModule } from './pessoas/pessoas.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from './app.config';
import { AuthModule } from './auth/auth.module';
// import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      //Configuração padrão/ não precisa especificar
      // envFilePath: '.env',
      // ignoreEnvFile: false,
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: Boolean(process.env.DB_AUTOLOADENTITIES), // Carrega entidades sem precisar especifica-las
      synchronize: Boolean(process.env.DB_SYNCHRONIZE), // Sincroniza com o Bd. Não deve ser usado em produção
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [],
    //   useFactory: async (configService: ConfigService) => {
    //     return {
    //       type: process.env.DB_TYPE as 'postgres',
    //       //   host: process.env.DB_HOST,
    //       //   port: +process.env.DB_PORT,
    //       //   username: process.env.DB_USER,
    //       //   database: process.env.DB_DATABASE,
    //       //   password: process.env.DB_PASSWORD,
    //       //   autoLoadEntities: Boolean(process.env.DB_AUTOLOADENTITIES), // Carrega entidades sem precisar especifica-las
    //       //   synchronize: Boolean(process.env.DB_SYNCHRONIZE), // Sincroniza com o Bd. Não deve ser usado em produção
    //     };
    //   },
    // }),
    // TypeOrmModule.forRoot(typeOrmConfig),
    RecadosModel,
    PessoasModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
