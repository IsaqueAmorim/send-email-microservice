import { PrismaClient } from '@prisma/client';
import CreateRecipientDto from 'src/domain/entities/recipients/create-recipient.dto';
import { Recipient } from 'src/domain/entities/recipients/recipient.entity';
import IRecipientRepository from 'src/domain/repositories/recipient-repository.interface';

export default class RecipientRepository implements IRecipientRepository {
  constructor(private prisma: PrismaClient) {}

  async create(recipient: CreateRecipientDto): Promise<Recipient> {
    return this.prisma.recipient.create({ data: recipient });
  }

  async findById(id: string): Promise<Recipient> {
    const recipient = await this.prisma.recipient.findUnique({ where: { id } });

    if (!recipient) {
      throw new Error('Recipient not found');
    }
    return recipient;
  }

  async findByEmail(email: string): Promise<Recipient> {
    const recipient = await this.prisma.recipient.findUnique({
      where: { email },
    });

    if (!recipient) {
      throw new Error('Recipient not found');
    }

    return recipient;
  }

  async update(id: string, data: CreateRecipientDto): Promise<Recipient> {
    return this.prisma.recipient.update({ where: { id }, data });
  }

  async delete(id: string): Promise<Recipient> {
    return this.prisma.recipient.delete({ where: { id } });
  }
}
