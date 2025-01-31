import QueryRecipientDto from '../recipients/query-recipient.dto';
import QuerySenderDto from '../sender/query-sender.dto';
import QueryTemplateDto from '../template/query-template.dto';

export default class QueryEmailDto {
  constructor(
    id: string,
    recipients: QueryRecipientDto[],
    sender: QuerySenderDto,
    sendedAt: Date,
    subject: string,
    message: string,
    template: QueryTemplateDto,
  ) {
    this.id = id;
    this.recipients = recipients;
    this.sender = sender;
    this.sendedAt = sendedAt;
    this.subject = subject;
    this.message = message;
    this.template = template;
  }

  id: string;
  recipients: QueryRecipientDto[];
  sender: QuerySenderDto;
  sendedAt: Date;
  subject: string;
  message: string;
  template: QueryTemplateDto;
}
