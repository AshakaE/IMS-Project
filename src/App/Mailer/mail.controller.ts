import { Body, Controller, Param, Post, Request, Res } from '@nestjs/common'
import { ApiProperty, ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { IsEmail, IsNotEmpty } from 'class-validator'
import MailService from './mail.service'

class EmailRevalidateDTO {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email!: string
}

@ApiTags('Mail')
@Controller('mail')
class MailController {
  constructor(private readonly service: MailService) {}

  @Post('verify/:token')
  async verifyUser(
    @Request() req: any,
    @Param('token') token: string,
    @Res() res: Response,
  ) {
    await this.service.verifyOrResendToken(token, true)
    return res.json({ message: 'Email verified successfully!' })
  }

  @Post('revalidate')
  async sendVerification(
    @Request() req: any,
    @Body() data: EmailRevalidateDTO,
    @Res() res: Response,
  ) {
    const token = await this.service.verifyOrResendToken(data.email, false)
    if (!token) {
      return res.json({ verification: 'User has been verified' })
    }
    return res.json({ verification: token })
  }
}

export default MailController
