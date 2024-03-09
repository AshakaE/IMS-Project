import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import * as nodemailer from 'nodemailer'
import { ConfigService } from '@nestjs/config'
import AuthService from '../Auth/auth.service'
import UserRepository from '../Users/user.repository'

@Injectable()
class MailService {
  private readonly apiURL: string

  constructor(
    private readonly auth: AuthService,
    private userRepository: UserRepository,
    private configService: ConfigService,
  ) {
    this.apiURL = this.configService.get<string>('API_URL') as string
  }

  async sendVerificationEmail(to: string, token: string) {
    const t = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, 
      auth: {
        user: 'destinee.breitenberg71@ethereal.email', // TODO: create prod email
        pass: '782A3SYNUUgt1TuUf1',
      },
    })

    const mailOptions = {
      from: 'destinee.breitenberg71@ethereal.email',
      to,
      subject: 'Email Verification',
      html: `<p>Click the following link to verify your email: <a href="${this.apiURL}/verify/${token}">Verify</a></p>`,
    }

    t.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error)
      } else {
        console.log(`Email sent: ${info.response}`)
      }
    })
  }

  async verifyOrResendToken(
    value: string,
    verify: boolean,
  ): Promise<string | boolean> {
    if (verify) {
      return this.auth.verfiyNewlyRegisteredEmail(value)
    }
    const user = await this.userRepository.getUserByEmail(value)
    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND)
    }
    if (user.status) {
      return false
    }
    const token = await this.auth.generateVerificationToken(value)
    await this.sendVerificationEmail(value, token)
    return token
  }
}

export default MailService
