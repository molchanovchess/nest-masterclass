import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ConfigService, ConfigType } from '@nestjs/config';
import profileConfig from '../config/profile.config';
/**
 * Class to connect to Users table and perform business operations
 */
@Injectable()
export class UsersService {
  /**
   * Constructor to inject dependencies
   */
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    /**
     * Injecting profile config
     */
    @Inject(profileConfig.KEY)
    private readonly profileConfiguration: ConfigType<typeof profileConfig>,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    let newUser = this.usersRepository.create(createUserDto);
    newUser = await this.usersRepository.save(newUser);
    return newUser;
  }

  /**
   * The method to GET all the users from the database
   */
  public findAll(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    // test the new config
    console.log(this.profileConfiguration);
    console.log(this.profileConfiguration.apiKey);

    return [
      {
        firstName: 'John',
        email: 'john@doe.com',
      },
      {
        firstName: 'Alice',
        email: 'Alice@doe.com',
      },
    ];
  }
  /**
   * Find a single user using the ID of the user
   */
  public async findOneById(id: number) {
    return await this.usersRepository.findOneBy({
      id,
    });
  }
}
