import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification, NotificationType } from './notification.entity';

@Injectable()
export class NotificationsService 


{
  constructor(
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
  ) {}

  async createNotification(
    recipientId: string,
    senderId: string,
    type: NotificationType,
    postId?: string,
    commentId?: string,
  ) 
  
  
  {
    if (recipientId === senderId) return; 

    const notification = this.notificationsRepository.create({
      recipientId,
      senderId,
      type,
      postId,
      commentId,
    });


    return this.notificationsRepository.save(notification);
  }

  async getUserNotifications(userId: string): Promise<Notification[]> 
  
  
  {
    return this.notificationsRepository.find({
      where: { recipientId: userId },
      relations: { sender: true, post: true, comment: true },
      order: { createdAt: 'DESC' },
      take: 20,
    });
  }


  async markAsRead(id: string, userId: string)
  
  
  {
    await this.notificationsRepository.update(
      { id, recipientId: userId },
      { isRead: true },
    );
    return { success: true };
  }


  ////////////////////////

  async markAllAsRead(userId: string) {
    await this.notificationsRepository.update(
      { recipientId: userId, isRead: false },
      { isRead: true },
    );
    return { success: true };
  }
}
