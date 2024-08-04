import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Headers,
  Ip,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { PatchUserDto } from './dtos/patch-user.dto';

@Controller('users')
export class UsersController {
  @Get('/:id?')
  public getUsers(
    @Param() getUsersParamDto: GetUsersParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    console.log('getUsersParamDto:', getUsersParamDto);
    return 'You sent a GET request to users endpoint';
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
