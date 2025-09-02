// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule} from './posts/posts.module';
 
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://pranadoc113:SinBZUeYnvwqQHLN@cluster0.v9zs0tr.mongodb.net/posts?retryWrites=true&w=majority&appName=Cluster0'

    ),
    PostsModule,
  ],
})
export class AppModule {}

