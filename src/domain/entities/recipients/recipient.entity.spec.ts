import { Recipient } from './recipient.entity';

describe('Recipient', () => {
  it('should create a new recipient with valid name and email', () => {
    const recipient = Recipient.newRecipient(
      'John Doe',
      'john.doe@example.com',
    );
    expect(recipient).toBeInstanceOf(Recipient);
    expect(recipient.getName()).toBe('John Doe');
    expect(recipient.getEmail()).toBe('john.doe@example.com');
  });

  it('should throw an error for invalid email', () => {
    expect(() => {
      Recipient.newRecipient('John Doe', 'invalid-email');
    }).toThrow('Invalid email');
  });

  it('should throw an error for empty name', () => {
    expect(() => {
      Recipient.newRecipient('', 'john.doe@example.com');
    }).toThrow('Invalid name');
  });

  it('should throw an error for name with only spaces', () => {
    expect(() => {
      Recipient.newRecipient('   ', 'john.doe@example.com');
    }).toThrow('Invalid name');
  });
});
