import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from '../../entities/email/create-email.dto';
import { Email } from '../../entities/email/email.entity';
import { EmailRepository } from 'src/infrastructure/repositories/prisma/email.repository';
import IEmailSender from './email-sender.interface';

@Injectable()
export class EmailService {
  constructor(
    private emailSender: IEmailSender,
    private emailRepository: EmailRepository,
  ) {
    this.emailRepository = emailRepository;
  }

  async create(createEmailDto: CreateEmailDto): Promise<string> {
    return this.emailRepository.save(Email.newEmailWithDTO(createEmailDto));
  }

  async findAll(): Promise<Email[]> {
    return this.emailRepository.findAll();
  }

  async findById(id: string): Promise<Email> {
    return this.emailRepository.findById(id);
  }

  async findBySender(senderId: string): Promise<Email[]> {
    return this.emailRepository.findBySender(senderId);
  }

  async findByRecipient(recipientId: string): Promise<Email[]> {
    return this.emailRepository.findByRecipient(recipientId);
  }

  async send(email: Email) {
    await this.emailSender.send(email);
  }

  sendMany(emails: Email[]) {
    return this.emailSender.send(emails);
  }

  remove(id: number) {
    return `This action removes a #${id} email`;
  }
}
