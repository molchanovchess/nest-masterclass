import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:id?')
  public getUsers(
    @Param() getUsersParamDto: GetUsersParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.usersService.findAll(getUsersParamDto, limit, page);
  }
  @Post()
  public createUsers(@Body() createUserDto: CreateUserDto) {
    console.log('createUserDto:', createUserDto instanceof CreateUserDto);
    return 'You sent a POST request to users endpoint';
  }
  //   @Post()
  //   public createUsers(@Req() request: Request) {
  //     console.log('request:', request);
  //     return 'You sent a POST request to users endpoint';
  //   }

  @Patch()
  public patchUser(@Body() patchUserDto: PatchUserDto) {
    return patchUserDto;
  }

  //   @Get()
  //   public getUsers() {
  //     return 'You sent a get request to users endpoint';
  //   }

  //   @Get()
  //   public getUsers() {
  //     return 'You sent a get request to users endpoint';
  //   }
}
