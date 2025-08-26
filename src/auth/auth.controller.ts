import { Controller, Body, Post, Param, Delete, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from './auth.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


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

  @Post('users')
  async getAllUsers(): Promise<Auth[]> {
    return this.authService.getAllUsers();
  }

  @Post('updateById')
  async updateById(@Body('id') id: string, @Body() data: Partial<Auth>): Promise<Auth> {
    return this.authService.updateUser(id, data);
  }


  @Post('deleteById')
  async deleteById(@Body('id') id: string) {
    return this.authService.deleteUser(id);
  }

}