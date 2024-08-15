import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { TagsService } from 'src/tags/providers/tags.service';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class CreatePostProvider {
  constructor(
    private readonly tagsService: TagsService,
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    private userService: UsersService,
  ) {}
  public async create(createPostDto: CreatePostDto, user: ActiveUserData) {
    let author = undefined;
    let tags = undefined;
    try {
      // Find author from db based on authorId
      author = await this.userService.findOneById(user.sub);

      // Find tags
      tags = await this.tagsService.findMultipleTags(createPostDto.tags);
    } catch (error) {
      throw new ConflictException(error);
    }

    if (createPostDto.tags.length !== tags.length) {
      throw new BadRequestException('Please check your tags IDs');
    }

    // Create post
    let post = this.postsRepository.create({
      ...createPostDto,
      author: author,
      tags: tags,
    });

    try {
      //return the post
      return await this.postsRepository.save(post);
    } catch (error) {
      throw new ConflictException(error, {
        description: 'Ensure post slug is unique',
      });
    }
  }
}
