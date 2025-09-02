import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

/**
 * Controller responsible for handling incoming requests for the /posts endpoint.
 * It routes the requests to the appropriate service methods.
 */
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  /**
   * Handles POST requests to /posts to create a new post.
   * @param createPostDto - The data for the new post, validated by the DTO.
   */
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  /**
   * Handles GET requests to /posts to retrieve all posts.
   */
  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  /**
   * Handles GET requests to /posts/:id to retrieve a single post by its ID.
   * @param id - The ID of the post to retrieve.
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  /**
   * Handles PATCH requests to /posts/:id to update an existing post.
   * @param id - The ID of the post to update.
   * @param updatePostDto - The data to update the post with.
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    return this.postsService.update(id,dto);
  }

  /**
   * Handles DELETE requests to /posts/:id to delete a post.
   * @param id - The ID of the post to delete.
   */
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}