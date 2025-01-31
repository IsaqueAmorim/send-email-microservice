import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { EmailService } from '../../domain/services/email/email.service';
import { CreateEmailDto } from '../../domain/entities/email/create-email.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  create(@Body() createEmailDto: CreateEmailDto) {
    return this.emailService.create(createEmailDto);
  }

  @Get()
  findAll() {
    return this.emailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emailService.findById(id);
  }

  @Get('sender/:senderId')
  findBySender(@Param('senderId') senderId: string) {
    return this.emailService.findBySender(senderId);
  }

  @Get('recipient/:recipientId')
  findByRecipient(@Param('recipientId') recipientId: string) {
    return this.emailService.findByRecipient(recipientId);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateEmailDto: UpdateEmailDto) {
  //   return this.emailService.update(+id, updateEmailDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emailService.remove(+id);
  }
}
