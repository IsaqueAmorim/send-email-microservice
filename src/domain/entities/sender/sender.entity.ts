import QuerySenderDto from './query-sender.dto';

export class Sender {
  private constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
    this.validade();
  }

  static getDefaultSender(): Sender {
    return new Sender('Default Sender', 'default.sender@email.com');
  }

  static convertQueryToSender(query: QuerySenderDto): Sender {
    const sender = new Sender(query.name, query.email);
    sender.id = query.id;
    return sender;
  }

  static newSender(name: string, email: string): Sender {
    return new Sender(name, email);
  }

  private validade() {
    if (!this.email.includes('@')) {
      throw new Error('Invalid email');
    }

    if (!this.name) {
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

  public getEmail(): string {
    return this.email;
  }

  public setName(name: string): void {
    this.name = name;
    this.validade();
  }

  public setEmail(email: string): void {
    this.email = email;
    this.validade();
  }
}
