import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://user:pass@omv.local:5672'],
        queue: 'payments',
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  await app.listen();
  console.info('Microservicio de pagos iniciado.');
}
bootstrap();
