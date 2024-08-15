import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { SignInDto } from '../dtos/signin.dto';
import { SignInProvider } from './sign-in.provider';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    /**
     * Infect SignInProvider
     */
    private readonly signInProvider: SignInProvider,
  ) {}
  public async signIn(signInDto: SignInDto) {
    return await this.signInProvider.signIm(signInDto);
  }
  public isAuth() {
    return true;
  }
}
