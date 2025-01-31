import CreateRecipientDto from '../entities/recipients/create-recipient.dto';
import { Recipient } from '../entities/recipients/recipient.entity';

export default interface IRecipientRepository {
  create(recipient: CreateRecipientDto): Promise<Recipient>;
  findById(id: string): Promise<Recipient>;
  findByEmail(email: string): Promise<Recipient>;
  update(id: string, data: CreateRecipientDto): Promise<Recipient>;
  delete(id: string): Promise<Recipient>;
}
