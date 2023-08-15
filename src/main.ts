import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.use('auth',AuthModule);
  await app.listen(3000);
}
bootstrap();
