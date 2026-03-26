import { Controller, Post, Get, UseGuards } from '@nestjs/common';

import { DrawService } from './draw.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('draw')
export class DrawController {
  constructor(private drawService: DrawService) {}

  // 🎲 Run new draw
  @UseGuards(JwtAuthGuard)
  @Post('run')
  run() {
    return this.drawService.runDraw();
  }

  // 📊 Get latest draw
  @Get('latest')
  latest() {
    return this.drawService.getLatestDraw();
  }

  // 🧮 Calculate results
  @UseGuards(JwtAuthGuard)
  @Post('calculate')
  calculate() {
    return this.drawService.calculateResults();
  }
}
