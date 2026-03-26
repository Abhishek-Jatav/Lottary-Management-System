import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';

import { CharityService } from './charity.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { SelectCharityDto } from './dto/select-charity.dto';

@Controller('charity')
export class CharityController {
  constructor(private charityService: CharityService) {}

  @Get('all')
  getAll() {
    return this.charityService.getAllCharities();
  }

  @UseGuards(JwtAuthGuard)
  @Post('select')
  select(@Req() req, @Body() dto: SelectCharityDto) {
    return this.charityService.selectCharity(req.user.userId, dto.charityId);
  }
}
