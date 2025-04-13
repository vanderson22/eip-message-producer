import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';


dotenv.config();


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Conexão com RabbitMQ como microservice
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'], // URL do RabbitMQ
      queue: process.env.RABBITMQ_QUEUE || 'default_queue', // Nome da fila
      queueOptions: {
        durable: true,
      },
    },
  });

  // Iniciar ambos os servidores (HTTP e Microservice)
  await app.startAllMicroservices();
  
  console.log('Starting RabbitMQ Producer...' , process.env.PORT);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
