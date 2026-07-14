import { Controller, Get, Patch, Param, Req, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { RequestWithUser } from '../auth/interfaces/request-with-user.interface';

@JwtAuthGuard()
@Controller('notifications')
export class NotificationsController 


{
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  async getNotifications(@Req() req: RequestWithUser) {
    return this.notificationsService.getUserNotifications(req.user.userId);
  }

  @Patch('read-all')
  async markAllAsRead(@Req() req: RequestWithUser) {
    return this.notificationsService.markAllAsRead(req.user.userId);
  }

  @Patch(':id/read')
  async markAsRead(@Req() req: RequestWithUser, @Param('id') id: string) {
    return this.notificationsService.markAsRead(id, req.user.userId);
  }
}
