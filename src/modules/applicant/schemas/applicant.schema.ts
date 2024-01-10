import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

import { Project } from 'src/modules/project/schemas/project.schema';
import { User } from 'src/modules/user/schemas/user.schema';

@Schema({
  timestamps: true
})
export class Applicant extends Document {
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: User.name })
  provider: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: Project.name, required: true })
  project: string;

  @Prop({
    type: [{ name: String, unitValue: Number, proposedValue: Number }],
    default: []
  })
  items: { name: string; unitValue: number; proposedValue: number }[];
}

export const ApplicantSchema = SchemaFactory.createForClass(Applicant);
