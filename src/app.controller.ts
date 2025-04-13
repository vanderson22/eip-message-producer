import { Controller, Post, Body } from '@nestjs/common';
import { ProducerService } from './producer/producer.service';
import { SendMessageDto } from './producer/dto/send-message.dto';

@Controller('messages')
export class AppController {
  constructor(private readonly producerService: ProducerService) {}

  @Post()
  sendMessage(@Body() body: SendMessageDto) {
    return this.producerService.sendMessage('default_queue', body);
  }
}
