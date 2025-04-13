import { Module } from '@nestjs/common';
import { ProducerModule } from './producer/producer.module';
import { AppController } from './app.controller';
import { ProcessMessageController } from './process-message/process-message.controller';

@Module({
  imports: [ProducerModule],
  controllers: [AppController, ProcessMessageController],
})
export class AppModule {}
