import { Module } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { PostsController } from './posts.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { TagsModule } from 'src/tags/tags.module';

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [
    UsersModule,
    TagsModule,
    TypeOrmModule.forFeature([Post, MetaOption]),
  ],
})
export class PostsModule {}
