import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Connection } from 'typeorm';

import { UserRepository } from './auth.repository';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './auth.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private userRepository: UserRepository;

  constructor(private readonly connection: Connection) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'AKSJDHCNCQHFoqwvqokvnqo',
    });
    this.userRepository = this.connection.getCustomRepository(UserRepository);
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;
    const user = this.userRepository.findOne({ username });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
