import { CloudinaryService } from './cloudinary.service.js';
export declare class CloudinaryController {
    private readonly cloudinaryService;
    constructor(cloudinaryService: CloudinaryService);
    getUploadSignature(folder?: string): any;
}
