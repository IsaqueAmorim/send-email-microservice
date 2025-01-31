import { Email } from './email.entity';
import { Recipient } from '../recipients/recipient.entity';
import { Sender } from '../sender/sender.entity';
import { Template } from '../template/template.entity';

describe('Email Entity', () => {
  let recipient: Recipient;
  let sender: Sender;

  beforeEach(() => {
    recipient = Recipient.newRecipient(
      'Recipient Name',
      'recipient@example.com',
    );

    sender = Sender.getDefaultSender();
  });

  it('should create a new email instance', () => {
    const email = Email.newEmail(
      [recipient],
      sender,
      'Test Subject',
      'Test Message',
      Template.newTemplate('Test Template', '<p>Test HTML</p>'),
    );

    expect(email).toBeInstanceOf(Email);
    expect(email.getRecipients()).toEqual([recipient]);
    expect(email.getSender()).toEqual(sender);
    expect(email.getSubject()).toBe('Test Subject');
    expect(email.getMessage()).toBe('Test Message');
    expect(email.getTemplate().getHtml()).toBe('<p>Test HTML</p>');
    expect(email.getSendedAt()).toBeInstanceOf(Date);
  });

  it('should set the sendedAt date to the current date', () => {
    const email = Email.newEmail(
      [recipient],
      sender,
      'Test Subject',
      'Test Message',
      Template.newTemplate('Test Template', '<p>Test HTML</p>'),
    );

    const now = new Date();
    expect(email.getSendedAt().getTime()).toBeCloseTo(now.getTime(), -2);
  });
});
