import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  
  app.use(helmet({
    crossOriginResourcePolicy: false,
  }));
  app.enableCors({
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  
  app.useLogger(app.get(Logger));

  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, 
      forbidNonWhitelisted: true, 
      transform: true, 
    }),
  );

  await app.listen(parseInt(process.env.PORT || '3001', 10), '0.0.0.0');
}
bootstrap().catch((err) => {
  console.error('Error starting application', err);
});
