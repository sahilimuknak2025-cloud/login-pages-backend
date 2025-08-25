import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from './auth.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('create')
  async createUser(@Body() data: Partial<Auth>) {
    await this.authService.createUser(data);
    return { message: 'Signup successful' }; 
  }


  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    await this.authService.login(body.email, body.password);
    return { message: 'Login successful' }; 
  }
}

