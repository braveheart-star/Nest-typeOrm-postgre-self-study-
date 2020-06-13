import { Body, Req, Controller, HttpCode, Post, UseGuards, Get } from '@nestjs/common';
import { HttpException, HttpStatus, } from '@nestjs/common';

import { AuthService } from './auth.service';
import RegisterDto from './dto/register.dto';
import RequestUser from './requestUser.interface';
import { LocalAuthGuard } from './localAuth.guard';
import {JwtAuthGuard} from './jwtAuth.guard';
 
@Controller('')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}
 
  @Post('signup')
  async register(@Body() registUser: RegisterDto) {
    
    return await this.authService.register(registUser)
    // try {
      // const user = await this.authService.register(registUser)
      // return this.authService.login(user)
    // } 
    // catch (error) {
    //       if(error.message == 'User with that email already exists') {
    //         throw new HttpException('User with that email already exists',HttpStatus.BAD_REQUEST);
    //       } else {
    //         throw new HttpException('Something went wrong',HttpStatus.INTERNAL_SERVER_ERROR);
    //       }
    //     }
  }
 
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async logIn(@Req() request: RequestUser) {
    const {user} = request;
    return this.authService.login(user)
  }


  @UseGuards(JwtAuthGuard)
  @Get()
  authenticate(@Req() request: RequestUser) {
    const {user} = request;
    return user;
  }


}