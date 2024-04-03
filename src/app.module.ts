import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { User } from './users/models/user.model';
import { ComfortModule } from './comfort/comfort.module';
import { Comfort } from './comfort/models/comfort.model';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/models/category.model';
import { DistrictModule } from './district/district.module';
import { RegionModule } from './region/region.module';
import { Region } from './region/models/region.models';
import { District } from './district/models/district.models';
import { AdminModule } from './admin/admin.module';
import { Admin } from './admin/models/admin.models';
import { MailModule } from './mail/mail.module';
import { BotModule } from './bot/bot.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { BOT_NAME } from './add.constants';

@Module({
  imports: [
    TelegrafModule.forRootAsync({botName:BOT_NAME,
    useFactory:()=>({
      token:process.env.BOT_TOKEN,
      middlewares:[],
      include:[],
    })}),
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      models: [
        User,
        Comfort,
        Category,
        Admin,
        District,
        Region, 
      ],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    UsersModule,
    ComfortModule,
    CategoriesModule,
    DistrictModule,
    RegionModule,
    AdminModule,
    MailModule,
    BotModule,
  ],
})
export class AppModule {}
