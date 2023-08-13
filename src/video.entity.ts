import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  publishedAt: Date;

  @Column()
  thumbnailUrl: string;

  @Column()
  videoUrl: string;
}
