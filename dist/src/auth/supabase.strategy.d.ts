import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
declare const SupabaseStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithoutRequest] | [opt: import("passport-jwt").StrategyOptionsWithRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class SupabaseStrategy extends SupabaseStrategy_base {
    private readonly logger;
    constructor(configService: ConfigService);
    validate(payload: {
        sub: string;
        email?: string;
        user_metadata?: {
            role?: string;
            fullname?: string;
        };
        app_metadata?: {
            role?: string;
        };
    }): {
        id: string;
        email: string;
        role: string;
    };
}
export {};
