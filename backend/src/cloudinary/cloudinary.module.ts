import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CloudinaryService } from './cloudinary.service';
import { v2 as cloudinary } from 'cloudinary';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'CLOUDINARY',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const cloudinaryUrl = configService.get<string>('CLOUDINARY_URL');
        if (cloudinaryUrl) {
          cloudinary.config({
            cloudinary_url: cloudinaryUrl
          });
        }
        return cloudinary;
      },
    },
    CloudinaryService,
  ],
  exports: [CloudinaryService, 'CLOUDINARY'],
})
export class CloudinaryModule {}
