import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';

import { PaymentService } from './payment.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { PayDto } from './dto/pay.dto';
import { VerifyPaymentDto } from './dto/verify-payment.dto';

@Controller()
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  // User payment
  @UseGuards(JwtAuthGuard)
  @Post('payment/pay')
  pay(@Req() req, @Body() dto: PayDto) {
    return this.paymentService.pay(req.user.userId, dto.amount, dto.method);
  }

  // Admin verifies
  @UseGuards(JwtAuthGuard)
  @Post('admin/payment/verify')
  verify(@Body() dto: VerifyPaymentDto) {
    return this.paymentService.verifyPayment(dto.paymentId, dto.status);
  }

  // Payment history
  @UseGuards(JwtAuthGuard)
  @Get('payment/history')
  history(@Req() req) {
    return this.paymentService.getHistory(req.user.userId);
  }
}
