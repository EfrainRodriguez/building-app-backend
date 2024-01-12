import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true
})
export class Project extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({
    type: [{ name: String, unitValue: Number, proposedValue: Number }],
    default: []
  })
  items: { name: string; unitValue: number; proposedValue?: number }[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
