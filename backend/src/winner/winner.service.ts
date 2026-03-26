import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WinnerService {
  constructor(private prisma: PrismaService) {}

  // User uploads proof
  async uploadProof(userId: string, drawId: string, proof: string) {
    return this.prisma.winner.create({
      data: {
        userId,
        drawId,
        proof,
        status: 'PENDING',
      },
    });
  }

  // Admin verifies winner
  async verifyWinner(winnerId: string, status: string) {
    return this.prisma.winner.update({
      where: { id: winnerId },
      data: { status },
    });
  }

  // Get user's winners
  async getMyWinners(userId: string) {
    return this.prisma.winner.findMany({
      where: { userId },
    });
  }
}
