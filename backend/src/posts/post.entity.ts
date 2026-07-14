import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Comment } from '../comments/comment.entity';
import { Like } from '../likes/like.entity';

@Entity('posts')
@Index(['authorId', 'createdAt'])
@Index(['createdAt'])
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  content: string;

  @Column({ type: 'text', array: true, default: '{}' })
  images: string[];

  @Index()
  @Column()
  authorId: string;

  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'authorId' })
  author: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];

  @Column({ type: 'varchar', default: 'PUBLIC' })
  visibility: 'PUBLIC' | 'PRIVATE';

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
