// jest-dom.d.ts

import 'react';

declare module 'react' {
    namespace JSX {
        interface IntrinsicElements {
            'cat-card': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            'cat-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { icon: string };
            'cat-scrollable': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }
}
