import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Comment } from './comment.entity';

@Entity('comment_likes')
@Index(['userId', 'commentId'], { unique: true })
export class CommentLike 

{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  commentId: string;

  @ManyToOne(() => User, (user) => user.commentLikes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Comment, (comment) => comment.likes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'commentId' })
  comment: Comment;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  
}
