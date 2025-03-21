
export class CreateUserDto {
    id: number
    username: string;
    email: string;
    password: string; 
}

export class UpdateUserDto {
    username: string;
    email: string;
}

export default { CreateUserDto, UpdateUserDto }
