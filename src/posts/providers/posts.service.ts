import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchPostDto } from '../dtos/patch-post.dto';

@Injectable()
export class PostsService {
  constructor(
    /**
     * Injecting UsersService
     */
    private readonly usersService: UsersService,
    /**
     * Inject postsRepository
     */
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    /**
     * Inject metaOptionsRepository
     */
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,

    /**
     * Inject TagsService
     */
    private readonly tagsService: TagsService,
  ) {}

  /**
   * Creating new post
   */
  public async create(createPostDto: CreatePostDto) {
    // Find author from db based on authorId
    let author = await this.usersService.findOneById(createPostDto.authorId);

    // Find tags
    let tags = await this.tagsService.findMultipleTags(createPostDto.tags);

    // Create post
    let post = this.postsRepository.create({
      ...createPostDto,
      author: author,
      tags: tags,
    });

    //return the post
    return await this.postsRepository.save(post);
  }

  public async findAll(userId: string) {
    let posts = await this.postsRepository.find({
      relations: {
        metaOptions: true,
        // author: true,
        // tags: true,
      },
    });
    return posts;
  }

  public async delete(id: number) {
    // Delete the post
    await this.postsRepository.delete(id);

    // confirmation
    return { deleted: true, id };
  }

  public async update(patchPostDto: PatchPostDto) {
    // Find the tags
    let tags = await this.tagsService.findMultipleTags(patchPostDto.tags);

    // Find the post
    let post = await this.postsRepository.findOneBy({ id: patchPostDto.id });

    // Update the properties
    post.title = patchPostDto.title ?? post.title;
    post.content = patchPostDto.content ?? post.content;
    post.status = patchPostDto.status ?? post.status;
    post.postType = patchPostDto.postType ?? post.postType;
    post.slug = patchPostDto.slug ?? post.slug;
    post.featuredImageUrl =
      patchPostDto.featuredImageUrl ?? post.featuredImageUrl;
    post.publishedOn = patchPostDto.publishedOn ?? post.publishedOn;

    // Assign the new tags
    post.tags = tags;

    // Save the post and return
    return await this.postsRepository.save(post);
  }
}
