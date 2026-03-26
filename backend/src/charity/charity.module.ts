import { Module } from '@nestjs/common';
import { CharityController } from './charity.controller';
import { CharityService } from './charity.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[AuthModule],
  controllers: [CharityController],
  providers: [CharityService],
})
export class CharityModule {}
