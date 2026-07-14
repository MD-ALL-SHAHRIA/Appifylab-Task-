import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  UseGuards,
  Param,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateCommentDto } from './dto/create-comment.dto';
import type { RequestWithUser } from '../auth/interfaces/request-with-user.interface';

@JwtAuthGuard()
@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async addComment(
    @Req() req: RequestWithUser,
    @Param('postId') postId: string,
    @Body() body: CreateCommentDto,
  )
  
  
  {
    const userId = req.user.userId;
    return this.commentsService.create(
      userId,
      postId,
      body.content,
      body.parentId,
    );
  }

  @Get()
  async getComments(@Param('postId') postId: string) {
    return this.commentsService.getByPost(postId);
  }

  @Post(':commentId/like')
  async toggleLike(
    @Req() req: RequestWithUser,
    @Param('postId') postId: string,
    @Param('commentId') commentId: string,
  ) {
    const userId = req.user.userId;
    return this.commentsService.toggleLike(userId, commentId);
  }
}
