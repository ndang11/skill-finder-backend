import { CloudinaryService } from './cloudinary.service.js';
export declare class CloudinaryController {
    private readonly cloudinaryService;
    constructor(cloudinaryService: CloudinaryService);
    getUploadSignature(folder?: string): {
        signature: string;
        timestamp: number;
        apiKey: string;
        cloudName: string;
    };
}
