import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';

@Module({
  imports:[SequelizeModule.forFeature([User]),
JwtModule.register({}),
MailModule
],

  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
