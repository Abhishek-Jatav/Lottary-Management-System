import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwt: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers['authorization'];

    if (!authHeader) throw new UnauthorizedException();

    const token = authHeader.split(' ')[1];

    try {
      const payload = this.jwt.verify(token, {
        secret: 'supersecretkey',
      });

      request.user = payload;

      return true;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
