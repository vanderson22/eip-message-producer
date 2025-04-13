import { Body, Controller, Post } from '@nestjs/common';
import { SendMessageDto } from 'src/producer/dto/send-message.dto';
import { ProducerService } from 'src/producer/producer.service';

@Controller('process-message')
export class ProcessMessageController {
    constructor(private readonly producerService: ProducerService) {}

    @Post()
    sendMessage(@Body() body: SendMessageDto) {
      console.log('body', JSON.stringify(body));
      const queue = process.env.RABBITMQ_QUEUE || '';
      return this.producerService.sendMessage(queue, body);
    }
}

 