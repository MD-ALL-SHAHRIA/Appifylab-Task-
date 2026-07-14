import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { LikesProcessor } from './likes.processor';
import { Like } from './like.entity';
import { NotificationsModule } from '../notifications/notifications.module';
import { Post as PostEntity } from '../posts/post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Like, PostEntity]),
    BullModule.registerQueue({
      name: 'likes-queue',
    }),
    NotificationsModule,
  ],
  providers: [LikesService, LikesProcessor],
  controllers: [LikesController],
  exports: [LikesService],
})
export class LikesModule {}
