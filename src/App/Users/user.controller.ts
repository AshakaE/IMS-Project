import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import { ApiTags } from '@nestjs/swagger'
import UserService, { CreateUserDto } from './user.service'

@ApiTags('Users')
@Controller('users')
class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async registerUser(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ) {
    // console.log(createUserDto)
    const { user, token } = await this.userService.createUser(createUserDto)
    const { password, ...destinationObject } = user

    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      data: destinationObject,
      token,
    })
  }

  //   @Post('register/user')
  //   async registerUser(@Body() createUserDto: CreateUserDto): Promise<User> {
  //     return this.userService.createOrganizer(createUserDto)
  //   }

  //   @UseGuards(JwtAuthGuard, RolesGuard)
  //   @SetMetadata('roles', [Role.USER])
  //   @Post('/update')
  //   async updateUser(@Body() createUserDto: CreateUserDto) {
  //     return this.userService.updateUser(createUserDto)
  //   }

  //   @UseGuards(JwtAuthGuard, RolesGuard)
  //   @SetMetadata('roles', [Role.ADMIN])
  //   @Post('/disable')
  //   async disableUser(@Request() req: any, @Body() createUserDto: CreateUserDto) {
  //     return this.userService.disableUser(createUserDto.email)
  //   }

  // @Post('/reset-password')
  // async resetPassword(@Body() createUserDto: CreateUserDto): Promise<User> {
  //   return this.userService.resetPassword()
  // }
}

export default UserController
