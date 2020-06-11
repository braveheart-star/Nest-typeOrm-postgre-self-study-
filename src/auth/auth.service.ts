import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import RegisterDto from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import PostgresErrorCode from './postgresErrorCodes.enum';
import { JwtService } from '@nestjs/jwt';
// import { ConfigService } from '@nestjs/config';
// import TokenPayload from './tokenPayload.interface';
@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService,
    ){}

    public async register(regiData:RegisterDto) {
        const hashedPassword = await bcrypt.hash(regiData.password,10);
        try {
            const createdUser = await this.usersService.create({
                ...regiData,
                password:hashedPassword
            });
            createdUser.password = undefined;
            return createdUser;
        } catch (error) {
          // console.log(error)
            if(error?.code === PostgresErrorCode.UniqueViolation) {
                throw new HttpException('User with that email already exists',HttpStatus.BAD_REQUEST);
            }
            throw new HttpException('Something went wrong',HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async validateUser(email: string, plainTextPassword: string) {
        try {
          const user = await this.usersService.getByEmail(email);
          await this.verifyPassword(plainTextPassword, user.password);
          user.password = undefined;
          return user;
        } catch (error) {
          throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
        }
      }
       
      private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
        const isPasswordMatching = await bcrypt.compare(
          plainTextPassword,
          hashedPassword
        );
        if (!isPasswordMatching) {
          throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
        }
      }


      async login(user: any) {
        const payload = { username: user.name, sub: user.id };
        return {
          access_token: this.jwtService.sign(payload),
        };
      
  }






}
