import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentLike } from './comment-like.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Processor('comments-queue')
export class CommentLikesProcessor extends WorkerHost 

{
  private readonly logger = new Logger(CommentLikesProcessor.name);

  constructor(
    @InjectRepository(CommentLike)
    private commentLikesRepository: Repository<CommentLike>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    super();
  }

  async process(
    job: Job<{ userId: string; commentId: string }, any, string>,
  ): Promise<any> 
  
  {
    if (job.name !== 'toggle-comment-like') return;

    const { userId, commentId } = job.data;

    try {
      const existingLike = await this.commentLikesRepository.findOne({
        where: { userId, commentId },
      });



      if (existingLike) 
        
        {
        await this.commentLikesRepository.remove(existingLike);
        this.logger.log(`Comment Like removed: User ${userId} for Comment ${commentId}`);
      } 
      
      else 
      
      {
        const newLike = this.commentLikesRepository.create({ userId, commentId });
        await this.commentLikesRepository.save(newLike);
        this.logger.log(`Comment Like added: User ${userId} for Comment ${commentId}`);
      }

      
      await this.cacheManager.del('feed_first_page');
    } 
    
    catch (error) 
    
    
    {
      this.logger.error(`Error processing comment like`, error);
      throw error;
    }
  }
}
