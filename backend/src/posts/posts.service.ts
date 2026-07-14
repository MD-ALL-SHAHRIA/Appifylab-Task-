import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan, In } from 'typeorm';
import { Post } from './post.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

import { Like } from '../likes/like.entity';
import { Comment } from '../comments/comment.entity';

@Injectable()
export class PostsService 


{
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @InjectRepository(Like)
    private likesRepository: Repository<Like>,
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) 
  
  {}

  async create(
    authorId: string,
    content: string,
    images: string[] = [],
    visibility: 'PUBLIC' | 'PRIVATE' = 'PUBLIC',
  ): Promise<Post> {
    const post = this.postsRepository.create({
      authorId,
      content,
      images,
      visibility,
    });
    const saved = await this.postsRepository.save(post);
    await this.cacheManager.del('feed_first_page');
    return saved;
  }

  
  
  async getFeed(limit: number = 10, cursor?: Date, userId?: string) 
  
  {
    if (!cursor) {
      const cached: any = await this.cacheManager.get(`feed_first_page`);

      if (cached) 
        
        {
        let skipCache = false;
        if (userId) {
          const recentPrivate = await this.postsRepository.findOne({
            where: { authorId: userId, visibility: 'PRIVATE' },
            order: { createdAt: 'DESC' }
          });
          if (recentPrivate && cached.items.length > 0) {
            const oldestCached = new Date(cached.items[cached.items.length - 1].createdAt);
            if (new Date(recentPrivate.createdAt) >= oldestCached) {
              skipCache = true;
            }
          } else if (recentPrivate && cached.items.length === 0) {
            skipCache = true;
          }
        }

        if (!skipCache) {
          if (userId && cached.items.length > 0) 
            
            
            {
            
            const userReactions = await this.likesRepository.find({
              where: { postId: In(cached.items.map((p: any) => p.id)), userId }
            });
            cached.items = cached.items.map((post: any) => ({
              ...post,
              userReaction: userReactions.find(r => r.postId === post.id)?.reactionType || null
            }));
          }

          return cached;
        }
      }
    }

    const whereCondition: any = [];
    if (cursor) {
      whereCondition.push({ createdAt: LessThan(cursor), visibility: 'PUBLIC' });
      if (userId) {
        whereCondition.push({ createdAt: LessThan(cursor), authorId: userId, visibility: 'PRIVATE' });
      }
    } else {
      whereCondition.push({ visibility: 'PUBLIC' });
      if (userId) {
        whereCondition.push({ authorId: userId, visibility: 'PRIVATE' });
      }
    }

    const posts = await this.postsRepository.find({
      where: whereCondition,
      order: { createdAt: 'DESC' },
      take: limit + 1,
      relations: { author: true },
    });

    const postIds = posts.map(p => p.id);
    
    let allComments: any[] = [];
    if (postIds.length > 0) {
      allComments = await this.commentsRepository.find({
        where: { postId: In(postIds) },
        relations: { author: true, likes: true }
      });
    }

    const buildTree = (comments: any[], parentId: string | null = null): any[] => 
      
    {
      const children = comments.filter(c => c.parentId === parentId);
      children.forEach(c => {
        c.replies = buildTree(comments, c.id);
        c.replies.sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      });
      return children.sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    };

    const optimizedPosts = await Promise.all(posts.map(async (post) =>
      
    {
      const likesCount = await this.likesRepository.count({ where: { postId: post.id } });
      
      const recentLikes = await this.likesRepository.find({ 
        where: { postId: post.id }, 
        take: 5, 
        relations: { user: true } 
      });
      
      const userReaction = userId 
        ? await this.likesRepository.findOne({ where: { postId: post.id, userId } }).then(l => l?.reactionType || null)
        : null;
      
      const postComments = allComments.filter(c => c.postId === post.id);
      const comments = buildTree(postComments);

     
     
      return {
        ...post,
        likesCount,
        commentsCount: postComments.length,
        userReaction,
        recentLikes,
        comments
      };
    }));

    /////

    const hasNextPage = optimizedPosts.length > limit;
    const items = hasNextPage ? optimizedPosts.slice(0, -1) : optimizedPosts;
    const nextCursor = hasNextPage ? items[items.length - 1].createdAt : null;

    const result = 
    
    {
      items,
      nextCursor,
    };

    if (!cursor) {
      const publicItems = items.filter(p => p.visibility === 'PUBLIC');
      const cacheResult = {
        items: publicItems.map(post => ({ ...post, userReaction: null })),
        nextCursor: publicItems.length > 0 ? publicItems[publicItems.length - 1].createdAt : null,
      };
      await this.cacheManager.set(`feed_first_page`, cacheResult, 60000); 
    }

    return result;
  }

  async getById(id: string): Promise<Post> 
  
  {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: { 
        author: true, 
        likes: true, 
        comments: {
          author: true,
          likes: true
        } 
      },
    });
    
    if (post && post.comments) 
      
      
      {
      const buildTree = (comments: any[], parentId: string | null = null): any[] => {
        const children = comments.filter(c => c.parentId === parentId);
        children.forEach(c => {
          c.replies = buildTree(comments, c.id);
          c.replies.sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        });
        return children.sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      };


      
      post.comments = buildTree(post.comments);



    }



    ////
    if (!post) 
      
      {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async updatePost(userId: string, postId: string, updates: { content?: string; visibility?: 'PUBLIC' | 'PRIVATE' }): Promise<Post> {
    const post = await this.postsRepository.findOne({ where: { id: postId, authorId: userId } });
    if (!post) {
      throw new NotFoundException('Post not found or you are not the author');
    }

    if (updates.content !== undefined) {
      post.content = updates.content;
    }
    if (updates.visibility !== undefined) {
      post.visibility = updates.visibility;
    }

    const saved = await this.postsRepository.save(post);
    await this.cacheManager.del('feed_first_page');
    return saved;
  }

  async deletePost(userId: string, postId: string): Promise<void> {
    const post = await this.postsRepository.findOne({ where: { id: postId, authorId: userId } });
    if (!post) {
      throw new NotFoundException('Post not found or you are not the author');
    }

    await this.postsRepository.remove(post);
    await this.cacheManager.del('feed_first_page');
  }
}
