import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';

/**
 * UpdatePostDto defines the data structure for updating an existing post.
 * It extends CreatePostDto using PartialType, which makes all fields
 * from CreatePostDto optional. This allows a client to send only the
 * fields they want to change.
 */
export class UpdatePostDto extends PartialType(CreatePostDto) {}
//export class UpdatePostDto {
  