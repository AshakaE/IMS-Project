import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_CONSTANT'),
    })
  }

  async validate(payload: any) {
    // console.log('Validate payload',payload)
    return {
      id: payload.id,
      email: payload.sub,
      roles: payload.roles,
    }
  }
}

export default JwtStrategy
