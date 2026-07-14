import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class LikesService {
  constructor(@InjectQueue('likes-queue') private likesQueue: Queue) {}

  async toggleLike(userId: string, postId: string, reactionType: string = 'LIKE') 
  
  {
    await this.likesQueue.add('toggle-like', { userId, postId, reactionType });

    
    return { success: true, message: 'Like is being processed in background' };
  }
}
