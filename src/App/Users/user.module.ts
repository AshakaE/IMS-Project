import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import UserController  from './user.controller'
import UsersRepository from './user.repository'
import UserService from './user.service'
import AuthService from '../Auth/auth.service'
import MailModule from '../Mailer/mail.module'

@Module({
  controllers: [UserController],
  providers: [UserService, UsersRepository, AuthService, JwtService],
  imports: [MailModule],
  exports: [UserService, UsersRepository],
})
class UsersModule {}

export default UsersModule
