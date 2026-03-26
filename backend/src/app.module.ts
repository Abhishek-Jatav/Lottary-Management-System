import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { ScoresModule } from './scores/scores.module';
import { CharityModule } from './charity/charity.module';
import { DrawModule } from './draw/draw.module';
import { WinnerModule } from './winner/winner.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    SubscriptionModule,
    ScoresModule,
    CharityModule,
    DrawModule,
    WinnerModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
