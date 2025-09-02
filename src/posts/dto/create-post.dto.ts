import { IsNotEmpty, IsString, MinLength } from 'class-validator';

/**
 * CreatePostDto defines the data structure and validation rules for creating a new post.
 * The class-validator decorators automatically validate incoming request bodies.
 */
export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5, { message: 'Title must be at least 5 characters long.' })
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  authorName: string;
}