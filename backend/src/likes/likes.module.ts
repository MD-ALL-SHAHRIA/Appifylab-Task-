import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { LikesProcessor } from './likes.processor';
import { Like } from './like.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Like]),
    BullModule.registerQueue({
      name: 'likes-queue',
    }),
  ],
  providers: [LikesService, LikesProcessor],
  controllers: [LikesController],
  exports: [LikesService],
})
export class LikesModule {}
