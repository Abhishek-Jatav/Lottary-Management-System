import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SubscriptionService {
  constructor(private prisma: PrismaService) {}

  async createSubscription(userId: string, plan: string) {
    const startDate = new Date();

    let endDate = new Date();

    if (plan === 'MONTHLY') {
      endDate.setMonth(endDate.getMonth() + 1);
    }

    if (plan === 'YEARLY') {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }

    return this.prisma.subscription.upsert({
      where: { userId },

      update: {
        status: 'ACTIVE',
        plan,
        startDate,
        endDate,
      },

      create: {
        userId,
        status: 'ACTIVE',
        plan,
        startDate,
        endDate,
      },
    });
  }

  async getStatus(userId: string) {
    return this.prisma.subscription.findUnique({
      where: { userId },
    });
  }
}
