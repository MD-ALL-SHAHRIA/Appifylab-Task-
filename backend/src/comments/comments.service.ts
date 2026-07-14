import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Comment } from './comment.entity';
import { Post } from '../posts/post.entity';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationType } from '../notifications/notification.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { Inject } from '@nestjs/common';

@Injectable()
export class CommentsService 


{
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @InjectQueue('comments-queue') private commentsQueue: Queue,
    private notificationsService: NotificationsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}


  async create(
    authorId: string,
    postId: string,
    content: string,
    parentId?: string,
  ) 
  
  
  {
    const comment = this.commentsRepository.create({
      authorId,
      postId,
      content,
      parentId,
    });
    const savedComment = await this.commentsRepository.save(comment);

    if (parentId) 
      
      
      {
      
      const parentComment = await this.commentsRepository.findOne({ where: { id: parentId } });
      if (parentComment && parentComment.authorId !== authorId) {
        await this.notificationsService.createNotification(
          parentComment.authorId,
          authorId,
          NotificationType.REPLY,
          postId,
          savedComment.id,
        );
      }
    } 
    
    
    else 
    
    
    {
      
      const post = await this.postsRepository.findOne({ where: { id: postId } });
      if (post && post.authorId !== authorId) {
        await this.notificationsService.createNotification(
          post.authorId,
          authorId,
          NotificationType.COMMENT,
          postId,
          savedComment.id,
        );
      }
    }
    
    
    await this.cacheManager.del('feed_first_page');

    return this.commentsRepository.findOne({
      where: { id: savedComment.id },
      relations: { author: true },
    });
  }

  async getByPost(postId: string): Promise<Comment[]> {
    return this.commentsRepository.find({
      where: { postId, parentId: IsNull() },
      relations: {
        author: true,
        likes: true,
        replies: {
          author: true,
          likes: true
        }
      },
      order: { createdAt: 'ASC' },
    });
  }



  async toggleLike(userId: string, commentId: string) 
  
  {
    await this.commentsQueue.add('toggle-comment-like', { userId, commentId });
    return { success: true, message: 'Comment like queued for processing' };
  }
}
