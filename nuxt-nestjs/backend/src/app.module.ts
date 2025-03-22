import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'database',
      entities: [User],
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule, UsersModule
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}