import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  // 💰 User makes payment
  async pay(userId: string, amount: number, method: string) {
    return this.prisma.payment.create({
      data: {
        userId,
        amount,
        method,
        status: 'PENDING',
      },
    });
  }

  // ✅ Admin verifies payment
  async verifyPayment(paymentId: string, status: string) {
    return this.prisma.payment.update({
      where: { id: paymentId },
      data: { status },
    });
  }

  // 📜 Get payment history
  async getHistory(userId: string) {
    return this.prisma.payment.findMany({
      where: { userId },
      orderBy: { id: 'desc' }, // 🔥 optional improvement
    });
  }
}
