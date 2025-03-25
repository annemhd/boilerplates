import { CreateUserDto, UpdateUserDto } from './user.dto';
import { UsersService } from './users.service';
import { User } from './user.interface';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<void>;
    findAll(): Promise<User[]>;
    findOne(id: string): string;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): string;
}
