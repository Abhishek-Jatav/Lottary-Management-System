import { Module } from '@nestjs/common';
import { WinnerController } from './winner.controller';
import { WinnerService } from './winner.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[AuthModule],
  controllers: [WinnerController],
  providers: [WinnerService],
})
export class WinnerModule {}
