import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: User) { 
    const { createHmac } = await import('node:crypto');
    const secret = 'abcdefg';
    const hash = createHmac('sha256', secret)
               .update(user.password)
      .digest('hex')
    
    this.usersRepository.save({email: user.email, username: user.username, password: hash});
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  findByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }

  async update(id: string, updateUserDto: Partial<User>): Promise<User> {
    const existingUser = await this.usersRepository.findOneBy({ id });

    if (!existingUser) {
      throw new Error(`User with ID ${id} not found`);
    }

    const filteredUpdateData: Partial<User> = {};
    for (const key in updateUserDto) {
      if (updateUserDto[key] !== null && updateUserDto[key] !== undefined) {
        filteredUpdateData[key] = updateUserDto[key];
      }
    }

    if (filteredUpdateData.password) {
      const { createHmac } = await import('node:crypto');
      const secret = 'abcdefg';
      const hash = createHmac('sha256', secret)
        .update(filteredUpdateData.password)
        .digest('hex');
      filteredUpdateData.password = hash;
    }

    const userData = this.usersRepository.merge(existingUser, filteredUpdateData);

    return await this.usersRepository.save(userData);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
