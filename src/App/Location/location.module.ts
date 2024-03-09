import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import LocationsController from './location.controller'
import LocationsRepository from './location.repository'
import LocationsService from './location.service'
import UsersModule from '../Users/user.module'
import UsersRepository from '../Users/user.repository'
import UserService from '../Users/user.service'
import MailModule from '../Mailer/mail.module'
import AuthService from '../Auth/auth.service'

@Module({
  controllers: [LocationsController],
  imports: [UsersModule, MailModule],
  providers: [LocationsService, LocationsRepository, UsersRepository, UserService, AuthService, JwtService],
})
class LocationsModule {}

export default LocationsModule
