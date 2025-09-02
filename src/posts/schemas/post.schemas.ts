import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// This line is added to explicitly export the document type
export type PostDocument = Post & Document;

/**ines the structure of a Post document in the MongoDB database.
 */
@Schema({ timestamps: true }) // Automatically adds createdAt and updatedAt fields
export class Post {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  authorName: string;

  @Prop([String])
  tags: string[];
}

export const PostSchema = SchemaFactory.createForClass(Post);