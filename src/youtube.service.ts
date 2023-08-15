import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './video.entity';

@Injectable()
export class YoutubeService {
  constructor(
    @InjectRepository(Video)
    private videoRepository: Repository<Video>,
  ) {}

  async fetchLatestVideos(): Promise<YouTubeVideo[]> {
    const API_KEY = process.env.API_KEY;
    const VIDEO_ID = 'ZMe5m538crQ';

    const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos`, {
      params: {
        part: 'snippet,contentDetails,statistics',
        id: VIDEO_ID,
        key: API_KEY,
      },
      headers: {
        Accept: 'application/json',
      },
    });

    const videoData = response.data.items[0];
    const video: YouTubeVideo = {
      title: videoData.snippet.title,
      description: videoData.snippet.description,
      publishedAt: videoData.snippet.publishedAt,
      thumbnailUrl: videoData.snippet.thumbnails.default.url,
      videoUrl: `https://www.youtube.com/watch?v=${VIDEO_ID}`,
    };

    return [video];
  }

  async saveVideosToDatabase(videos: YouTubeVideo[]): Promise<void> {
    const videoEntities = videos.map(video => {
      const entity = new Video();
      entity.title = video.title;
      entity.description = video.description;
      entity.publishedAt = new Date(video.publishedAt);
      entity.thumbnailUrl = video.thumbnailUrl;
      entity.videoUrl = video.videoUrl;
      return entity;
    });

    await this.videoRepository.save(videoEntities);
  }
}

interface YouTubeVideo {
  title: string;
  description: string;
  publishedAt: string;
  thumbnailUrl: string;
  videoUrl: string;
}
