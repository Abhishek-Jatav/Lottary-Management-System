import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // ✅ FAST ping (NO DB) → for frontend wake-up
  @Get('ping')
  ping() {
    return {
      status: 'ok',
      message: 'pong 🏓',
      time: new Date().toISOString(),
    };
  }

  // ✅ Full health check (WITH DB)
  @Get('health')
  async health() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;

      return {
        status: 'healthy',
        db: 'connected',
        uptime: Math.floor(process.uptime()),
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        status: 'degraded',
        db: 'disconnected',
        uptime: Math.floor(process.uptime()),
        timestamp: new Date().toISOString(),
      };
    }
  }
}
