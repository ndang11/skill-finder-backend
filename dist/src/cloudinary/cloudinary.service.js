var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable, BadRequestException } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'node:stream';
let CloudinaryService = class CloudinaryService {
    async uploadImage(file, folder = 'skill-finder/profiles') {
        if (!file) {
            throw new BadRequestException('No file provided for upload');
        }
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream({
                folder,
                resource_type: 'auto',
            }, (error, result) => {
                if (error)
                    return reject(error);
                if (!result)
                    return reject(new Error('Cloudinary upload returned undefined result'));
                resolve(result);
            });
            Readable.from(file.buffer).pipe(uploadStream);
        });
    }
    async deleteImage(publicId) {
        try {
            return await cloudinary.uploader.destroy(publicId);
        }
        catch (error) {
            throw new BadRequestException(`Failed to delete image: ${error instanceof Error ? error.message : 'Unknown Error'}`);
        }
    }
};
CloudinaryService = __decorate([
    Injectable()
], CloudinaryService);
export { CloudinaryService };
//# sourceMappingURL=cloudinary.service.js.map