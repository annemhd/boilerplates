import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
    // id: string;

    @IsNotEmpty({ message: 'Saissisez votre nom d\'utilisateur'})
    @MinLength(2, { message: 'Le mot de passe doit faire minimum 2 caractères' })
    username: string;

    @IsNotEmpty({ message: 'Saissisez votre email'})
    @IsEmail({}, { message: 'L\'email est invalide'})
    email: string;

    @IsNotEmpty({ message: 'Saissisez un mot de passe'})
    @MinLength(8, { message: 'Le mot de passe doit faire minimum 8 caractères' })
    password: string; 
}

export class UpdateUserDto {
    username: string;
    email: string;
}

export default { CreateUserDto, UpdateUserDto }
