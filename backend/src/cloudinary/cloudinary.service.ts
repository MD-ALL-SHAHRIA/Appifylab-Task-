import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import * as streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {
    const cloudinaryUrl = this.configService.get<string>('CLOUDINARY_URL');
    if (cloudinaryUrl) 
      
      
      {
      try {
        const parsed = new URL(cloudinaryUrl);
        cloudinary.config({
          cloud_name: parsed.host,
          api_key: parsed.username,
          api_secret: parsed.password,
        });


      } catch (e) 
      
      {
        console.error('Invalid CLOUDINARY_URL format', e);  
      }
    }
  }

  uploadFile(file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse> 
  
  {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'appifylab_posts',
        },
        (error, result) => {
          if (error) return reject(error);
          if (result) resolve(result);
          else reject(new Error('Unknown upload error'));
        },
      );


      
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}
