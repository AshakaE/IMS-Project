import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import MailController from './mail.controller'
import MailService from './mail.service'
import AuthService from '../Auth/auth.service'
import UserRepository from '../Users/user.repository'

@Module({
  controllers: [MailController],
  providers: [MailService, AuthService, UserRepository, JwtService],
  exports: [MailService],
})
class MailModule {}

export default MailModule
