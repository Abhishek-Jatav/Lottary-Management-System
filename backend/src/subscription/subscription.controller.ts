import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';

import { SubscriptionService } from './subscription.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@Controller('subscription')
export class SubscriptionController {
  constructor(private subscriptionService: SubscriptionService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Req() req, @Body() dto: CreateSubscriptionDto) {
    return this.subscriptionService.createSubscription(
      req.user.userId,
      dto.plan,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('status')
  status(@Req() req) {
    return this.subscriptionService.getStatus(req.user.userId);
  }
}
