import QueryRecipientDto from './query-recipient.dto';

export class Recipient {
  private constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
    this.validade();
  }

  static newRecipient(name: string, email: string) {
    return new Recipient(name, email);
  }

  static convertQueryToRecipient(query: QueryRecipientDto): Recipient {
    const recipient = new Recipient(query.name, query.email);
    recipient.id = query.id;
    return recipient;
  }

  private validade() {
    if (!this.email.includes('@')) {
      throw new Error('Invalid email');
    }

    if (!this.name.trim()) {
      throw new Error('Invalid name');
    }
  }

  private id: string;
  private name: string;
  private email: string;

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
    this.validade();
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(email: string): void {
    this.email = email;
    this.validade();
  }
}
