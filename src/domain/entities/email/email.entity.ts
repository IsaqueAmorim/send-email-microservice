import { CreateEmailDto } from './create-email.dto';
import { Recipient } from '../recipients/recipient.entity';
import { Sender } from '../sender/sender.entity';
import { Template } from '../template/template.entity';
import QueryEmailDto from './query-email.dto';

export class Email {
  private constructor(
    recipients: Recipient[],
    sender: Sender,
    subject: string,
    message: string,
    template: Template,
  ) {
    this.recipients = recipients;
    this.sender = sender;
    this.subject = subject;
    this.message = message;
    this.template = template;
    this.sendedAt = new Date();
  }

  static newEmail(
    recipients: Recipient[],
    sender: Sender,
    subject: string,
    message: string,
    template: Template,
  ): Email {
    return new Email(recipients, sender, subject, message, template);
  }

  static newEmailWithDTO(createEmailDto: CreateEmailDto): Email {
    return new Email(
      createEmailDto.recipients,
      createEmailDto.sender,
      createEmailDto.subject,
      createEmailDto.message,
      createEmailDto.template,
    );
  }

  static convertQueryToEmail(query: QueryEmailDto): Email {
    const email = new Email(
      query.recipients.map((recipient) =>
        Recipient.convertQueryToRecipient(recipient),
      ),
      Sender.convertQueryToSender(query.sender),
      query.subject,
      query.message,
      Template.convertQueryToTemplate(query.template),
    );
    email.id = query.id;
    return email;
  }

  private id: string;
  private recipients: Recipient[];
  private sender: Sender;
  private sendedAt: Date;
  private subject: string;
  private message: string;
  private template: Template;

  public getId(): string {
    return this.id;
  }

  public getRecipients(): Recipient[] {
    return this.recipients;
  }

  public setRecipients(recipients: Recipient[]): void {
    this.recipients = recipients;
  }

  public getSender(): Sender {
    return this.sender;
  }

  public setSender(sender: Sender): void {
    this.sender = sender;
  }

  public getSendedAt(): Date {
    return this.sendedAt;
  }

  public getSubject(): string {
    return this.subject;
  }

  public setSubject(subject: string): void {
    this.subject = subject;
  }

  public getMessage(): string {
    return this.message;
  }

  public setMessage(message: string): void {
    this.message = message;
  }

  public getTemplate(): Template {
    return this.template;
  }
}
