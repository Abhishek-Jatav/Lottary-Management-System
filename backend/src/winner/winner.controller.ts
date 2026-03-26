import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';

import { WinnerService } from './winner.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UploadProofDto } from './dto/upload-proof.dto';
import { VerifyWinnerDto } from './dto/verify-winner.dto';

@Controller()
export class WinnerController {
  constructor(private winnerService: WinnerService) {}

  // Upload proof
  @UseGuards(JwtAuthGuard)
  @Post('winner/upload-proof')
  upload(@Req() req, @Body() dto: UploadProofDto) {
    return this.winnerService.uploadProof(
      req.user.userId,
      dto.drawId,
      dto.proof,
    );
  }

  // Admin verify
  @UseGuards(JwtAuthGuard)
  @Post('admin/winner/verify')
  verify(@Body() dto: VerifyWinnerDto) {
    return this.winnerService.verifyWinner(dto.winnerId, dto.status);
  }

  // Get my winners
  @UseGuards(JwtAuthGuard)
  @Get('winner/my')
  getMy(@Req() req) {
    return this.winnerService.getMyWinners(req.user.userId);
  }
}
