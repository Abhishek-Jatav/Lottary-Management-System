import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';

import { ScoresService } from './scores.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CreateScoreDto } from './dto/create-score.dto';

@Controller('scores')
export class ScoresController {
  constructor(private scoresService: ScoresService) {}

  @UseGuards(JwtAuthGuard)
  @Post('add')
  addScore(@Req() req, @Body() dto: CreateScoreDto) {
    return this.scoresService.addScore(req.user.userId, dto.value);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  getMyScores(@Req() req) {
    return this.scoresService.getMyScores(req.user.userId);
  }
}
