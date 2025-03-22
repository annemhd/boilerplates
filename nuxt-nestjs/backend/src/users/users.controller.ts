
import { Controller, Get, Post, Body, Put, Param, Delete, HttpStatus, HttpException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
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
        errors.push('Cette email est déjà utilisé')
      }
      if (usernameNotAvailable) {
        errors.push('Ce nom d\'utilisateur est indisponible')
      }

      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'CONFLICT',
         description: `${errors.join(", ")}`
        }, HttpStatus.CONFLICT, {
        cause: errors,
      })
    }
    else this.usersService.create(createUserDto)
  }

  // This action get all users
  @Public()
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    console.log(updateUserDto)
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
