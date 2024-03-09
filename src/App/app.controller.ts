import { IsNotEmpty, IsString } from 'class-validator'
import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common'
import { Response } from 'express'
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger'
import AuthService from './Auth/auth.service'
import JwtAuthGuard from './Auth/jwt-auth.guard'
import UserRepository from './Users/user.repository'

class SignInDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  email!: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  pass!: string
}

@ApiBearerAuth()
@ApiTags('/')
@Controller()
class AppController {
  constructor(
    private authService: AuthService,
    private userRepository: UserRepository,
  ) {}

  //   @UseGuards(LocalAuthGuard)
  //   @Post('auth/login')
  //   async login(@Request() req: any) {
  //     return this.authService.login(req.user)
  //   }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    const user = await this.authService.signIn(signInDto.email, signInDto.pass)
    console.log('the user', user)
    return user
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/profile')
  async getProfile(@Request() req: any, @Res() res: Response) {
    const { email, active } = req.user
    const user = await this.userRepository.getUserByEmail(email)
    if (!active) {
      return res.status(HttpStatus.FORBIDDEN).json({
        message: 'User is disabled',
      })
    }

    return res.status(HttpStatus.CREATED).json({
      data: user,
    })
  }

  @Get('status')
  status() {
    return 'API is online'
  }
}

export default AppController
