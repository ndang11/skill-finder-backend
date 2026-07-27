import { type UploadApiResponse } from 'cloudinary';
export declare class CloudinaryService {
    uploadImage(file: Express.Multer.File, folder?: string): Promise<UploadApiResponse>;
    deleteImage(publicId: string): Promise<any>;
    generateSignature(folder: string): {
        signature: string;
        timestamp: number;
        apiKey: string;
        cloudName: string;
    };
}
