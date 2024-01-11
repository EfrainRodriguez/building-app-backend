import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { UserType } from '../types/user.type';

@Schema({
  timestamps: true
})
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  type: UserType;
}

export const UserSchema = SchemaFactory.createForClass(User);
