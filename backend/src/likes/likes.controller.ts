import { Controller, Post, Req, UseGuards, Param, Body } from '@nestjs/common';
import { LikesService } from './likes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { RequestWithUser } from '../auth/interfaces/request-with-user.interface';

@JwtAuthGuard()
@Controller('posts/:postId/like')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  async toggleLike(
    @Req() req: RequestWithUser,
    @Param('postId') postId: string,
    @Body('reactionType') reactionType?: string,
  ) 
  
  
  {
    const userId = req.user.userId;
    return this.likesService.toggleLike(userId, postId, reactionType);
  }
}
