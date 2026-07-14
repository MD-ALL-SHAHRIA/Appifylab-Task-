import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentLikesProcessor } from './comment-likes.processor';
import { Comment } from './comment.entity';
import { CommentLike } from './comment-like.entity';
import { NotificationsModule } from '../notifications/notifications.module';
import { Post } from '../posts/post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, CommentLike, Post]),
    BullModule.registerQueue({
      name: 'comments-queue',
    }),
    NotificationsModule,
  ],
  providers: [CommentsService, CommentLikesProcessor],
  controllers: [CommentsController],
  exports: [CommentsService],
})
export class CommentsModule {}
