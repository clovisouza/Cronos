import { NestFactory } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { winstonConfig } from './Infrastructure/Configs/winston.config';

async function bootstrap() {

  const logger = WinstonModule.createLogger(winstonConfig);

  const app = await NestFactory.create(AppModule, { logger });

  const options = new DocumentBuilder()
    .setTitle('Cadastro de Usuários Cronos')
    .setDescription('Api de Cadastro de Usuário')
    .setVersion('1.0')
    .addTag('Usuários')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
