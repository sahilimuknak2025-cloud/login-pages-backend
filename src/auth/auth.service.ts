import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthDocument } from './auth.schema';
import { Model } from 'mongoose'
import { promises } from 'dns';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Auth.name) private authModel: Model<AuthDocument>
    ){}

    async createUser(data: Partial<Auth>): Promise<Auth>{
      const existingUser = await this.authModel.findOne({email:data.email}).exec();
      if(existingUser) {
        throw new BadRequestException('Email already exists');
      }

         const existingPhone = await this.authModel.findOne({phone:data.phone}).exec();
      if(existingPhone) {
        throw new BadRequestException('Mobile Number already exists');
      }

        const newUser = new this.authModel(data);
        return newUser.save();
    }


     async login(email: string, password: string) {
    const user = await this.authModel.findOne({ email }).exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.password !== password) {
      throw new UnauthorizedException('Password  is incorrect');
    }
    return { message: 'User Login Successfully', user };
  }


  async getAllUsers(): Promise<Auth[]> {
    return this.authModel.find().exec();
  }


  async updateUser(id: string, data: Partial<Auth>): Promise<Auth> {
    const updatedUser = await this.authModel.findByIdAndUpdate(id, data, { new: true }).exec();
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  async deleteUser(id: string): Promise<any>{
    return this.authModel.findByIdAndDelete(id).exec();
  }
}

