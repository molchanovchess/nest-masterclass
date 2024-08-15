import {
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindOneUserByEmailProvider {
  constructor(
    /**
     * Inject UsersRepository
     */
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  public async findOneByEmail(email: string) {
    let user: User | undefined = undefined;

    try {
      // null id user is not found
      user = await this.usersRepository.findOneBy({
        email: email,
      });
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'Could not fetch the user',
      });
    }
    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }
    return user;
  }
}
