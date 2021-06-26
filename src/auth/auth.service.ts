import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Connection } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { AuthDto } from './dto/auth-credentials.dto';
import { UserRepository } from './auth.repository';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  private userRepository: UserRepository;
  constructor(
    private readonly connection: Connection,
    private jwtService: JwtService,
  ) {
    this.userRepository = this.connection.getCustomRepository(UserRepository);
  }

  async register(authDto: AuthDto): Promise<void> {
    return await this.userRepository.register(authDto);
  }

  async login(authDto: AuthDto): Promise<{ accessToken: string }> {
    const username = await this.userRepository.validateUserPassword(authDto);

    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { username };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
