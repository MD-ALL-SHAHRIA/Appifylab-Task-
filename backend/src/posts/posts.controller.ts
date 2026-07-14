import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  UseGuards,
  Query,
  Param,
  UseInterceptors,
  UploadedFiles,
  Patch,
  Delete,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import type { RequestWithUser } from '../auth/interfaces/request-with-user.interface';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@JwtAuthGuard()
@Controller('posts')
export class PostsController 


{
  constructor(
    private readonly postsService: PostsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 5, 
      
    {
      storage: memoryStorage(),
    }),
  )


  async createPost(
    @Req() req: RequestWithUser,
    @Body() body: CreatePostDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) 
  
  {
    const userId = req.user.userId;
    
    try {
      
      const uploadPromises = (files || []).map(file => this.cloudinaryService.uploadFile(file));
      const uploadResults = await Promise.all(uploadPromises);
      const imageUrls = uploadResults.map(result => result.secure_url);

      return await this.postsService.create(userId, body.content, imageUrls, body.visibility);
    } 
    

    ////
    
    catch (error) {
      console.error('CLOUDINARY UPLOAD ERROR:', error);
      throw error;
    }


  }

  @Get('feed')
  async getFeed(
    @Req() req: RequestWithUser,
    @Query('limit') limitStr?: string,
    @Query('cursor') cursorStr?: string,
  ) {
    const limit = limitStr ? parseInt(limitStr, 10) : 10;
    const cursor = cursorStr ? new Date(cursorStr) : undefined;
    return this.postsService.getFeed(limit, cursor, req.user?.userId);
  }

  @Get(':id')
  async getPost(@Param('id') id: string) {
    return this.postsService.getById(id);
  }

  @Patch(':id')
  async updatePost(
    @Req() req: RequestWithUser,
    @Param('id') id: string,
    @Body() body: { content?: string; visibility?: 'PUBLIC' | 'PRIVATE' },
  ) {
    return this.postsService.updatePost(req.user.userId, id, body);
  }

  @Delete(':id')
  async deletePost(
    @Req() req: RequestWithUser,
    @Param('id') id: string,
  ) {
    return this.postsService.deletePost(req.user.userId, id);
  }
}
