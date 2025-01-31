import { Email } from '../../entities/email/email.entity';

export default interface IEmailSender {
  send(email: Email): Promise<void>;
  send(emails: Email[]): Promise<void>;
}
