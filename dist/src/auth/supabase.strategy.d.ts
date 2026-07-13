import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
declare const SupabaseStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class SupabaseStrategy extends SupabaseStrategy_base {
    constructor(configService: ConfigService);
    validate(payload: {
        sub: string;
        email?: string;
        user_metadata?: {
            role?: string;
        };
    }): {
        id: string;
        email: string;
        role: string;
    };
}
export {};
