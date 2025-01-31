import { Sender } from './sender.entity';

describe('Sender Entity', () => {
  it('should create a default sender', () => {
    const sender = Sender.getDefaultSender();
    expect(sender.name).toBe('Default Sender');
    expect(sender.email).toBe('default.sender@email.com');
  });

  it('should create a new sender with valid name and email', () => {
    const sender = Sender.newSender('John Doe', 'john.doe@example.com');
    expect(sender.name).toBe('John Doe');
    expect(sender.email).toBe('john.doe@example.com');
  });

  it('should throw an error for invalid email', () => {
    expect(() => {
      Sender.newSender('John Doe', 'invalid-email');
    }).toThrow('Invalid email');
  });

  it('should throw an error for empty name', () => {
    expect(() => {
      Sender.newSender('', 'john.doe@example.com');
    }).toThrow('Invalid name');
  });
});
