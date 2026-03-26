import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ScoresService {
  constructor(private prisma: PrismaService) {}

  async addScore(userId: string, value: number) {
    // Get existing scores
    const scores = await this.prisma.score.findMany({
      where: { userId },
      orderBy: { date: 'asc' }, // oldest first
    });

    // If already 5 scores → delete oldest
    if (scores.length >= 5) {
      await this.prisma.score.delete({
        where: {
          id: scores[0].id,
        },
      });
    }

    // Create new score
    return this.prisma.score.create({
      data: {
        value,
        date: new Date(),
        userId,
      },
    });
  }

  async getMyScores(userId: string) {
    return this.prisma.score.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });
  }
}
