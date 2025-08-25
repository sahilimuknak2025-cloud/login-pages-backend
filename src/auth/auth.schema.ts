import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuthDocument = Auth & Document;

@Schema({ timestamps: true })
export class Auth {
    @Prop({ required: true, unique:true})
    email: string;

    @Prop({ required: true})
    password: string;

    @Prop ({required: true, unique:true})
    phone: string;
}


export const AuthSchema = SchemaFactory.createForClass(Auth);
