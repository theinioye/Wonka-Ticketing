import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { AccessTokenGuard } from './auth/guards/access-token.guards';
import { JwtService } from '@nestjs/jwt';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(
    new AccessTokenGuard(app.get(Reflector), app.get(JwtService)),
  );
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server is running on port ${process.env.PORT}`);
}
bootstrap();
