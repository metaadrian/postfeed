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
    // namespace JSX {
    //     interface IntrinsicElements {
    //         'cat-card': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    //         'cat-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { icon: string };
    //     }
    // }
}

