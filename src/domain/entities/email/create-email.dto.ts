import { Recipient } from '../recipients/recipient.entity';
import { Sender } from '../sender/sender.entity';
import { Template } from '../template/template.entity';

export class CreateEmailDto {
  subject: string;
  message: string;
  sender: Sender;
  send_at: Date;
  recipients: Recipient[];
  template: Template;
}
