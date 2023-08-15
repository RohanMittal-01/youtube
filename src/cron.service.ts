import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { YoutubeService } from './youtube.service';

@Injectable()
export class CronService {
  constructor(private youtubeService: YoutubeService) {}

  @Cron('0 */2 * * *') // Every 2 hours
  async handleCron() {
    try {
      const videos = await this.youtubeService.fetchLatestVideos(); 
      await this.youtubeService.saveVideosToDatabase(videos); 
      console.log('Fetched and stored videos:', videos);
    } catch (error) {
      console.error('Error fetching or storing videos:', error.message);
    }
  }
}
