import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { LoginUserDto } from './dto/login-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { find } from 'rxjs';
import { Op } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepo: typeof User,
    private jwtService: JwtService,
    private readonly mailerService: MailService,
  ) {}

  /****************************************getTokens*****************************************/
  async getTokens(user: User) {
    const payload = {
      id: user.id,
      is_active: user.is_active,
      is_owner: user.is_owner,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
  /****************************************registration***************************************/
  async registration(createUserDto: CreateUserDto, res: Response) {
    const user = await this.userRepo.findOne({
      where: { email: createUserDto.email },
    });
    if (user) {
      throw new BadRequestException('Bunday foydalanuvchi mavjud');
    }
    if (createUserDto.password !== createUserDto.confirm_password) {
      throw new BadRequestException('Parollar mos emas');
    }
    const hashed_password = await bcrypt.hash(createUserDto.password, 7);
    const newUser = await this.userRepo.create({
      ...createUserDto,
      hashed_password,
    });
    const tokens = await this.getTokens(newUser);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const activation_link = v4();

    const updatedUser = await this.userRepo.update(
      { hashed_refresh_token, activation_link },
      { where: { id: newUser.id }, returning: true },
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    try {
      await this.mailerService.sendMail(updatedUser[1][0]);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Xatni yuborishda xatolik');
    }
    const response = {
      message: 'User registred',
      user: updatedUser[1][0],
      tokens,
    };
    return response;
  }
  /*************************************activate*****************************************/
  async activate(link: string) {
    if (!link) {
      throw new BadRequestException('Activation link not found');
    }
    const updateUser = await this.userRepo.update(
      { is_active: true },
      { where: { activation_link: link, is_active: false }, returning: true },
    );

    if (!updateUser[1][0]) {
      throw new BadRequestException('Activation link not found');
    }
    const response = {
      message: 'User is activate successfully',
      user: updateUser[1][0].is_active,
    };
    return response;
  }
  /**************************************login********************************************/
  async login(loginUserDto: LoginUserDto, res: Response) {
    const { email, password } = loginUserDto;
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user.is_active) {
      throw new BadRequestException('User is not activate');
    }
    const isMatchPass = await bcrypt.compare(password, user.hashed_password);
    if (!isMatchPass) {
      throw new BadRequestException('Password do not match');
    }

    const tokens = await this.getTokens(user);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updatedUser = await this.userRepo.update(
      { hashed_refresh_token },
      { where: { id: user.id }, returning: true },
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'User logged in',
      user: updatedUser[1][0],
      tokens,
    };
    return response;
  }
  /*************************************logout********************************************/
  async logout(refreshToken: string, res: Response) {
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!userData) {
      throw new ForbiddenException('User not verified');
    }
    const updateUser = await this.userRepo.update(
      {
        hashed_refresh_token: null,
      },
      {
        where: { id: userData.id },
        returning: true,
      },
    );
    res.clearCookie('refresh_token');
    const response = {
      message: 'User logged out successfully',
      user_refresh_token: updateUser[1][0].hashed_refresh_token,
    };
    return response;
  }
  /***********************************refreshToken*********************************************/
  async refreshToken(userId: number, refreshToken: string, res: Response) {
    const decodedToken = await this.jwtService.decode(refreshToken);
    if (userId !== decodedToken['id']) {
      throw new BadRequestException('ser not found');
    }
    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (!user || !user.hashed_refresh_token) {
      throw new BadRequestException('user not found');
    }
    const tokenMatch = await bcrypt.compare(
      refreshToken,
      user.hashed_refresh_token,
    );

    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }

    const tokens = await this.getTokens(user);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);

    const updatedUser = await this.userRepo.update(
      { hashed_refresh_token },
      { where: { id: user.id }, returning: true },
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'User refreshedToken',
      user: updatedUser[1][0],
      tokens,
    };
    return response;
  }

  /******************************************************************************/
  async findUser(findUserDto: FindUserDto) {
    const where = {};
    if (findUserDto.full_name) {
      where['full_name'] = {
        [Op.like]: `%${findUserDto.full_name}%`,
      };
    }
    if (findUserDto.email) {
      where['email'] = {
        [Op.like]: `%${findUserDto.email}%`,
      };
    }
    if (findUserDto.phone) {
      where['phone'] = {
        [Op.like]: `%${findUserDto.phone}%`,
      };
    }
    if (findUserDto.tg_link) {
      where['tg_link'] = {
        [Op.like]: `%${findUserDto.tg_link}%`,
      };
    }
    console.log(where);

    const users = await this.userRepo.findAll({ where });
    if (users.length == 0) {
      throw new BadRequestException('User not found');
    }
    return users;
  }

  /****************************************************************************/

  async findAll() {
    return this.userRepo.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

/*************************************************************************/