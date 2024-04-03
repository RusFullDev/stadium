import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '../users/models/user.model';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  async sendMail(user: User) {
    const url = `${process.env.API_HOST}:${process.env.PORT}/api/users/activate/${user.activation_link}`;
    console.log(url);
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to stadium App! Comfirmation your email',
      template: './confirmation',
      context: {
        name: user.full_name,
        url,
      },
    });
  }
}
