import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DrawResult } from '@prisma/client';

@Injectable()
export class DrawService {
  constructor(private prisma: PrismaService) {}

  // 🎲 Generate 5 unique random numbers (1–50)
  generateNumbers(): number[] {
    const numbers: number[] = [];

    while (numbers.length < 5) {
      const num = Math.floor(Math.random() * 50) + 1;

      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }

    return numbers;
  }

  // 🚀 Run new draw
  async runDraw() {
    const numbers = this.generateNumbers();

    return this.prisma.draw.create({
      data: {
        numbers,
      },
    });
  }

  // 📊 Get latest draw
  async getLatestDraw() {
    return this.prisma.draw.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // 🧮 Calculate results (match logic)
  async calculateResults(): Promise<DrawResult[]> {
    // 1️⃣ Get latest draw
    const latestDraw = await this.prisma.draw.findFirst({
      orderBy: { createdAt: 'desc' },
    });

    if (!latestDraw) {
      throw new Error('No draw found');
    }

    const drawNumbers = latestDraw.numbers;

    // 2️⃣ Get all users with scores
    const users = await this.prisma.user.findMany({
      include: {
        scores: true,
      },
    });

    const results: DrawResult[] = [];

    // 3️⃣ Compare each user
    for (const user of users) {
      const userScores = user.scores.map((s) => s.value);

      // 4️⃣ Count matches
      const matches = userScores.filter((num) =>
        drawNumbers.includes(num),
      ).length;

      // 5️⃣ Store only if match >= 3
      if (matches >= 3) {
        const result = await this.prisma.drawResult.create({
          data: {
            drawId: latestDraw.id,
            userId: user.id,
            match: matches,
          },
        });

        results.push(result);
      }
    }

    return results;
  }
}
