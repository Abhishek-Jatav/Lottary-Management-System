import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CharityService {
  constructor(private prisma: PrismaService) {}

  // Get all charities
  async getAllCharities() {
    return this.prisma.charity.findMany();
  }

  // Select charity for user
  async selectCharity(userId: string, charityId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        charityId,
      },
    });
  }
}
