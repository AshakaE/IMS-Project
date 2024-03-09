import { ConflictException, Injectable } from '@nestjs/common'
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import bcrypt from 'bcrypt'
import User from '../../Database/Entities/user.entity'
import UserRepository from './user.repository'
import MailService from '../Mailer/mail.service'
import AuthService from '../Auth/auth.service'

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  firstName!: string

  @IsString()
  @ApiProperty()
  lastName!: string

  @IsEmail()
  @ApiProperty()
  email!: string

  @IsString()
  @ApiProperty()
  password!: string

  @IsNotEmpty()
  @IsPhoneNumber()
  @ApiProperty()
  phone!: string

  @IsString()
  @ApiProperty()
  company!: string
}
@Injectable()
class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly mailService: MailService,
    private readonly auth: AuthService,
  ) {}

  async createUser(
    args: CreateUserDto,
  ): Promise<{ user: User; token: string }> {
    // console.log(args)
    const { firstName, lastName, email, password, company, phone } = args
    const existUser = await this.userRepository.getUserByEmail(email)
    if (!existUser) {
      const hashedPassword = await bcrypt.hash(password, 11)
      //   console.log(hashedPassword)
      const user = this.userRepository.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        company,
        phone,
      })
      // Send verification email with a 15 seconds timeout
      const token = await this.auth.generateVerificationToken(user.email)
      setTimeout(async () => {
        await this.mailService.sendVerificationEmail(email, token)
      }, 15000)

      return { user: await this.userRepository.save(user), token }
    }
    throw new ConflictException('User with this email already exists')
  }

  //   async createOrganizer(args: CreateUserDto): Promise<User> {
  //     const { companyName, email, password } = args
  //     const existUser = await this.getUserByEmail(email, true)
  //     if (!existUser) {
  //       const hashedPassword = await bcrypt.hash(password, 11)
  //       console.log(hashedPassword)
  //       const user = this.create({
  //         companyName,
  //         email,
  //         password: hashedPassword,
  //         roles: [Role.USER, Role.ORGANIZER],
  //       })
  //       return this.save(user)
  //     }
  //     throw new ConflictException('User with this email already exists')
  //   }

  //   async updateUser(args: CreateUserDto) {
  //     await this.createQueryBuilder()
  //       .update(User)
  //       .set({ ...args })
  //       .where('email = :email', { email: args.email })
  //       .execute()
  //   }

  //   async disableUser(email: string) {
  //     await this.query('UPDATE "user" SET active = $1 where email = $2', [
  //       false,
  //       email,
  //     ])
  //   }

  //   async resetPassword() {}
}

export default UserService
