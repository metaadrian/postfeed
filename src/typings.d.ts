import { JSX as LocalJSX } from '@haiilo/catalyst';
import { HTMLAttributes } from 'react';

declare module "*.png" {
    const value: string;
    export default value;
}


declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PUBLIC_URL: string;
        }
    };
}

