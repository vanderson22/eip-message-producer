import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SendMessageDto } from './dto/send-message.dto';
import { catchError, retry, timeout } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class ProducerService {
  constructor(@Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy) {}

  async sendMessage(
    queue: string,
    payload: SendMessageDto,
    retryParam = 3,
    timeoutParam = 5000,
  ): Promise<void> {
    console.log('Enviando mensagem para a fila:', queue);
  
    return this.client
      .emit(queue, { data: payload.message }) // `queue` e `pattern` precisam ser iguais
      .pipe(
        timeout(timeoutParam),
        retry(retryParam),
        catchError((err) => {
          console.error('Erro ao enviar mensagem:', err.message);
          return throwError(() => err);
        }),
      )
      .toPromise();
  }
}