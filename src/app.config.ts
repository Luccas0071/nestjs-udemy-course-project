import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  database: {
    type: process.env.DB_TYPE as 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    // Carrega entidades sem precisar especifica-las
    autoLoadEntities: Boolean(process.env.DB_AUTOLOADENTITIES),
    // Sincroniza com o Bd. Não deve ser usado em produção
    synchronize: Boolean(process.env.DB_SYNCHRONIZE),
  },
  environment: process.env.NODE_ENV || 'development',
}));
