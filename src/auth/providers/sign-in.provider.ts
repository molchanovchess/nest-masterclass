import {
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { SignInDto } from '../dtos/signin.dto';
import { UsersService } from 'src/users/providers/users.service';
import { HashingProvider } from './hashing.provider';
import { GenerateTokensProvider } from './generate-tokens.provider';

@Injectable()
export class SignInProvider {
  constructor(
    /**
     * Inject UsersService
     */
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    /**
     * Inject HashingProvider
     */
    private readonly hashingProvider: HashingProvider,
    /**
     * Inject generateTokensProvider
     */
    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}
  public async signIm(signInDto: SignInDto) {
    // Find the user using email ID

    // Throw exception is user not found
    let user = await this.usersService.findOneByEmail(signInDto.email);

    // Compare password to hash
    let isEqual: boolean = false;

    try {
      isEqual = await this.hashingProvider.comparePassword(
        signInDto.password,
        user.password,
      );
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'Could not compare passwords',
      });
    }

    if (!isEqual) {
      throw new UnauthorizedException('Incorrect password');
    }
    // Generate Access and Refresh tokens
    return await this.generateTokensProvider.generateTokens(user);
  }
}
