
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Role } from '#/roles/role.enum';
import { Roles } from '#/roles/roles.decorator';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(
    Name: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByName(Name);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { 
      sub: user.id, 
      Name: user.Name, 
      role: user.role.name, 
      email: user.email, 
      num: user.phoneNum
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
