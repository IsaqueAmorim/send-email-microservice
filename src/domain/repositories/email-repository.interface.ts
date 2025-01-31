import { Email } from '../entities/email/email.entity';

export interface IEmailRepository {
  save(email: Email): Promise<string>;
  findAll(): Promise<Email[]>;
  findById(id: string): Promise<Email>;
  findBySender(senderId: string): Promise<Email[]>;
  findByRecipient(recipientId: string): Promise<Email[]>;
}

export const IEmailRepository = Symbol('IEmailRepository');
