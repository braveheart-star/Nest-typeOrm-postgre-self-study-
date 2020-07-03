import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Get,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import RegisterDto from './dto/register.dto';
import RequestUser from './requestUser.interface';
import { LocalAuthGuard } from './localAuth.guard';
import { JwtAuthGuard } from './jwtAuth.guard';

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async register(@Body() registUser: RegisterDto) {
    return await this.authService.register(registUser);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async logIn(@Req() req: RequestUser) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  authenticate(@Req() request: RequestUser) {
    const { user } = request;
    return user;
  }
}
