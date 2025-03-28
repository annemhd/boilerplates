
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { UsersService } from './users.service';
import { User } from './user.interface';
import { Public } from 'src/decorators/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const errors: string[] = []

    const emailNotAvailable = await this.usersService.findByEmail(createUserDto.email)
    const usernameNotAvailable = await this.usersService.findByUsername(createUserDto.username)

    if (usernameNotAvailable || emailNotAvailable){
      
      if (emailNotAvailable) {
        errors.push('cette email est déjà utilisé')
      }
      if (usernameNotAvailable) {
        errors.push('ce nom d\'utilisateur est indisponible')
      }

      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'CONFLICT',
         description: errors
        }, HttpStatus.CONFLICT, {
        cause: errors,
      })
    }
    else {
      this.usersService.create(createUserDto)
    }
  }

  // This action get all users
  @Public()
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      await this.usersService.update(
        id,
        updateUserDto,
      );
      return {
        success: true,
        message: 'User Updated Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.usersService.remove(id)
  }
}
