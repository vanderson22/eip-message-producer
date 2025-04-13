import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProducerService } from './producer.service';
import * as dotenv from 'dotenv';

dotenv.config();

// durable: true → a fila sobrevive ao reinício do broker (persistente)
// exclusive: false (padrão) → a fila pode ser acessada por múltiplas conexões
// autoDelete: false (padrão) → a fila não será deletada automaticamente quando o consumidor se desconectar
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
          queue: process.env.RABBITMQ_QUEUE || 'process_queue',
          queueOptions: {
            durable: true,
            autoDelete: false,
            exclusive: false,
          },
    
        },
      },
    ]),
  ],
  providers: [ProducerService],
  exports: [ProducerService],
})
export class ProducerModule {}
