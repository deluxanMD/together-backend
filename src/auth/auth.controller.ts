import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';

import { AuthDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  register(@Body(ValidationPipe) authDto: AuthDto): Promise<void> {
    return this.authService.register(authDto);
  }

  @Post('/login')
  login(
    @Body(ValidationPipe) authDto: AuthDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.login(authDto);
  }
}
