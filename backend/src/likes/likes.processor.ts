import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './like.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Processor('likes-queue')
export class LikesProcessor extends WorkerHost 


{
  private readonly logger = new Logger(LikesProcessor.name);

  constructor(
    @InjectRepository(Like)
    private likesRepository: Repository<Like>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    super();
  }

  async process(
    job: Job<{ userId: string; postId: string; reactionType: string }, any, string>,
  ): Promise<any> 
  
  
  {
    const { userId, postId, reactionType } = job.data;

    try 
    
    {
      const existingLike = await this.likesRepository.findOne({
        where: { userId, postId },
      });

      let changed = false;



      if (existingLike) 
        
        {
        if (existingLike.reactionType === reactionType) 
        {
          await this.likesRepository.remove(existingLike);
          this.logger.log(`Like removed: User ${userId} for Post ${postId}`);
          changed = true;
        } 
        
        
        
        else {
          existingLike.reactionType = reactionType;
          await this.likesRepository.save(existingLike);
          this.logger.log(`Reaction updated: User ${userId} for Post ${postId} to ${reactionType}`);
          changed = true;
        }



      } 
      
      
      else 
      
      
      {
        const newLike = this.likesRepository.create({ userId, postId, reactionType });
        await this.likesRepository.save(newLike);
        this.logger.log(`Like added: User ${userId} for Post ${postId} with reaction ${reactionType}`);
        changed = true;
      }



      if (changed)
        
      {
        await this.cacheManager.del('feed_first_page');
      }


    }
    
    catch (error)
    
    
    {
      this.logger.error(`Error processing like`, error);
      throw error;
    }
  }
}
