import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(email: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashed,
        role: 'USER',
      },
    });

    return user;
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) throw new UnauthorizedException('User not found');

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) throw new UnauthorizedException('Invalid password');

    const token = this.jwt.sign({
      userId: user.id,
      email: user.email,
      role: user.role, // <--- ADD THIS
    });

    return {
      access_token: token,
    };
  }
}
