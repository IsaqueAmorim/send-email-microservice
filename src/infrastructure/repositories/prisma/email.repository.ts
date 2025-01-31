import { PrismaClient } from '@prisma/client';
import { Email } from '../../../domain/entities/email/email.entity';
import { IEmailRepository } from '../../../domain/repositories/email-repository.interface';
import { Injectable } from '@nestjs/common';
import QueryEmailDto from 'src/domain/entities/email/query-email.dto';
import QueryRecipientDto from 'src/domain/entities/recipients/query-recipient.dto';

@Injectable()
export class EmailRepository implements IEmailRepository {
  constructor(private prisma: PrismaClient) {
    this.prisma = prisma;
  }

  findAll(): Promise<Email[]> {
    throw new Error('Method not implemented.');
  }

  async findById(id: string): Promise<Email> {
    const result = await this.prisma.email.findFirst({
      where: { id },
      include: { sender: true, template: true, recipients: true },
    });

    if (!result) {
      throw new Error('Email not found');
    }

    const emailDto = new QueryEmailDto(
      result.id,
      result.recipients.map(
        (recipient) =>
          new QueryRecipientDto(
            recipient.id,
            recipient.name,
            recipient.email,
            recipient.created_at,
            recipient.updated_at,
          ),
      ),
      result.sender,
      result.send_at,
      result.subject,
      result.message,
      result.template,
    );

    return Email.convertQueryToEmail(emailDto);
  }
  findBySender(senderId: string): Promise<Email[]> {
    const mails = this.prisma.email.findMany({
      where: { sender_id: senderId },
      include: { sender: true, template: true, recipients: true },
    });

    if (mails == null) {
      throw new Error('Emails not found');
    }

    const mailsDto = mails.then((mails) =>
      mails.map(
        (mail) =>
          new QueryEmailDto(
            mail.id,
            mail.recipients.map(
              (recipient) =>
                new QueryRecipientDto(
                  recipient.id,
                  recipient.name,
                  recipient.email,
                  recipient.created_at,
                  recipient.updated_at,
                ),
            ),
            mail.sender,
            mail.send_at,
            mail.subject,
            mail.message,
            mail.template,
          ),
      ),
    );
    return mailsDto.then((mailsDto) =>
      mailsDto.map((mailDto) => Email.convertQueryToEmail(mailDto)),
    );
  }

  findByRecipient(recipientId: string): Promise<Email[]> {
    const mails = this.prisma.email.findMany({
      where: {
        recipients: {
          some: {
            id: recipientId,
          },
        },
      },
      include: {
        sender: true,
        template: true,
        recipients: { where: { id: recipientId } },
      },
    });

    if (mails == null) {
      throw new Error('Emails not found');
    }

    const mailsDto = mails.then((mails) =>
      mails.map(
        (mail) =>
          new QueryEmailDto(
            mail.id,
            mail.recipients.map(
              (recipient) =>
                new QueryRecipientDto(
                  recipient.id,
                  recipient.name,
                  recipient.email,
                  recipient.created_at,
                  recipient.updated_at,
                ),
            ),
            mail.sender,
            mail.send_at,
            mail.subject,
            mail.message,
            mail.template,
          ),
      ),
    );
    return mailsDto.then((mailsDto) =>
      mailsDto.map((mailDto) => Email.convertQueryToEmail(mailDto)),
    );
  }

  async save(email: Email): Promise<string> {
    const result = await this.prisma.email.create({
      data: {
        id: email.getId(),
        subject: email.getSubject(),
        message: email.getMessage(),
        sender: {
          create: {
            id: email.getSender().getId(),
            name: email.getSender().getName(),
            email: email.getSender().getEmail(),
          },
        },
        send_at: email.getSendedAt(),
        recipients: {
          create: email.getRecipients().map((recipient) => ({
            name: recipient.getName(),
            email: recipient.getEmail(),
          })),
        },
        template: {
          create: {
            id: email.getTemplate().getId(),
            name: email.getTemplate().getName(),
            html: email.getTemplate().getHtml(),
          },
        },
      },
    });

    return result.id;
  }
}
