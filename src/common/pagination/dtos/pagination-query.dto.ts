import { IsOptional, IsPositive } from 'class-validator';
import { IntersectionType } from '@nestjs/swagger';
import { GetPostsBaseDto } from 'src/posts/dtos/get-posts.dto';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  limit?: number = 10;

  @IsOptional()
  @IsPositive()
  page?: number = 1;
}

export class GetPostsDto extends IntersectionType(
  GetPostsBaseDto,
  PaginationQueryDto,
) {}
