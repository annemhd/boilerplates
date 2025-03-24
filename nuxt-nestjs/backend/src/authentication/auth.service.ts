import { HttpException, HttpStatus, Injectable,  } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findByEmail(email);

    const { createHmac } = await import('node:crypto');
    const secret = 'abcdefg';
    const hash = createHmac('sha256', secret)
               .update(pass)
      .digest('hex')

    if (user?.password !== hash) {
      throw new HttpException({
              status: HttpStatus.UNAUTHORIZED,
              error: 'Unauthorized',
               description: 'Identifiants incorrects'
              }, HttpStatus.UNAUTHORIZED, {
              cause: 'Identifiants incorrects',
            })
    }
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
