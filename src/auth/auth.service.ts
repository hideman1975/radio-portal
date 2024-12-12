import { forwardRef, Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { IUser } from 'src/types/types';
import { StationService } from 'src/station/station.service';

@Injectable()
export class AuthService {
    constructor( 
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    // @Inject(forwardRef(() => StationService))
    // private stationService: StationService,
    private jwtService: JwtService
    ) { }

  //   async signIn(
  //       email: string,
  //       pass: string
  //   ): Promise<{ access_token: string }> {
  //     const user = await this.usersService.findOne(email);
  //     if ( !argon2.verify(user.password, pass)) {
  //       throw new UnauthorizedException();
  //     }
  //     const payload = { sub: user.id, username: user.email };
  //   return {
  //     access_token: await this.jwtService.signAsync(payload),
  //   };
  //  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    const passwordIsMatch = await argon2.verify(user.password, pass);
    if(user && passwordIsMatch) {
      return user;
    }
    return null;
  }

  async login(user: IUser) {
    const { id, email } = user;
    return {
      id,
      email,
      access_token: this.jwtService.sign({id: id, email: email}),
    };
  }

}
