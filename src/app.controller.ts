import { Controller } from '@nestjs/common';
import {
  MessagePattern,
  RmqContext,
  Ctx,
  Payload
} from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}  
  @MessagePattern('EnvioCreado')
  public async execute(
    @Payload() data: any,
    @Ctx() context: RmqContext
  ) {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage()
    console.log('data received by the notifications service', data);
    channel.ack(orginalMessage);
  }
}