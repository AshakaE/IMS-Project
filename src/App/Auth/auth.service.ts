import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import UserRepository from '../Users/user.repository'

@Injectable()
class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    // console.log('Validate user')
    const user = await this.userRepository.getUserByEmail(email)
    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND)
    }

    const valid = await bcrypt.compare(password, user?.password as string)
    if (!valid) {
      throw new HttpException(
        'Check your login credentials and try again',
        HttpStatus.UNPROCESSABLE_ENTITY,
      )
    }
    const { ...result } = user
    return result
  }

  async login(user: any) {
    // console.log('Login user')
    const payload = {
      id: user.id,
      email: user.email,
      roles: user.roles,
    }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async generateVerificationToken(email: string) {
    const payload = {
      email,
    }
    return this.jwtService.signAsync(payload, {
      secret: 'checkCheck',
      expiresIn: '30m',
    })
  }

  async verfiyNewlyRegisteredEmail(token: string) {
    try {
      const decoded = this.jwtService.verify(token, { secret: 'checkCheck' })
      const user = await this.userRepository.getUserByEmail(decoded.email)
      if (!user) {
        throw new HttpException('User does not exist', HttpStatus.NOT_FOUND)
      }
      if (!user.status) {
        await this.userRepository
          .createQueryBuilder()
          .update()
          .set({ status: true })
          .where({ email: decoded.email })
          .execute()
        return true
      }
      return false
    } catch (e: any) {
      if (e.name === 'JsonWebTokenError') {
        throw new HttpException(e.message, HttpStatus.UNPROCESSABLE_ENTITY)
      }
      if (e.name === 'TokenExpiredError') {
        throw new HttpException(
          'Verification failed, signature has expired. Request a new one.',
          HttpStatus.FORBIDDEN,
        )
      }

      return false
    }
  }

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const validate = await this.validateUser(email, pass)
    const payload = {
      sub: validate.email,
      id: validate.id,
      roles: validate.roles,
    }
    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }
}

export default AuthService
