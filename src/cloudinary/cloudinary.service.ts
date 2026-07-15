import { Injectable, BadRequestException } from '@nestjs/common';
import { v2 as cloudinary, type UploadApiResponse, type UploadApiErrorResponse } from 'cloudinary';
import { Readable } from 'node:stream'; 

@Injectable()
export class CloudinaryService {
  /**
   * Uploads an image buffer directly to Cloudinary
   * @param file Express.Multer.File object from your controller
   * @param folder Destination folder path inside Cloudinary
   */
  async uploadImage(
    file: Express.Multer.File, 
    folder: string = 'skill-finder/profiles'
  ): Promise<UploadApiResponse> {
    if (!file) {
      throw new BadRequestException('No file provided for upload');
    }

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'auto',
        },
        (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
          if (error) return reject(error);
          if (!result) return reject(new Error('Cloudinary upload returned undefined result'));
          resolve(result);
        }
      );

      // Create a readable stream from the file buffer and pipe it to Cloudinary
      Readable.from(file.buffer).pipe(uploadStream);
    });
  }

  /**
   * Deletes an asset from Cloudinary using its public ID
   * @param publicId The identifier of the image (e.g., 'skill-finder/profiles/abc1234')
   */
  async deleteImage(publicId: string): Promise<any> {
    try {
      return await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      throw new BadRequestException(`Failed to delete image: ${error instanceof Error ? error.message : 'Unknown Error'}`);
    }
  }

  /**
   * Generates a secure upload signature for direct-to-Cloudinary uploads
   * @param folder Destination folder path inside Cloudinary
   */
  generateSignature(folder: string): {
    signature: string;
    timestamp: number;
    apiKey: string;
    cloudName: string;
  } {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const apiSecret = cloudinary.config().api_secret || process.env.CLOUDINARY_API_SECRET || '';
    
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        folder,
      },
      apiSecret
    );

    return {
      signature,
      timestamp,
      apiKey: (cloudinary.config().api_key || process.env.CLOUDINARY_API_KEY || '') as string,
      cloudName: (cloudinary.config().cloud_name || process.env.CLOUDINARY_CLOUD_NAME || '') as string,
    };
  }
}