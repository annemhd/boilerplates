import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
    // id: string;

    @IsNotEmpty({ message: 'saissisez votre nom d\'utilisateur'})
    @MinLength(2, { message: 'le mot de passe doit faire minimum 2 caractères' })
    username: string;

    @IsNotEmpty({ message: 'saissisez votre email'})
    @IsEmail({}, { message: 'l\'email est invalide'})
    email: string;

    @IsNotEmpty({ message: 'saissisez un mot de passe'})
    @MinLength(8, { message: 'le mot de passe doit faire minimum 8 caractères' })
    password: string; 
}

export class UpdateUserDto {
    username: string;
    email: string;
}

export default { CreateUserDto, UpdateUserDto }
