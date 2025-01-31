import { PartialType } from '@nestjs/mapped-types';
import { CreateEmailDto } from './create-email.dto';
import { Sender } from '../sender/sender.entity';
import { Recipient } from '../recipients/recipient.entity';

export class UpdateEmailDto extends PartialType(CreateEmailDto) {
  id: number;
  from: Sender;
  to: Recipient[];
  name: string;
  email: string;
  message: string;
  html: string;
}
