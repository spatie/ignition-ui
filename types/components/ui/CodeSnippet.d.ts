<<<<<<< HEAD
<<<<<<< HEAD
import React from 'react';
=======
/// <reference types="react" />
>>>>>>> 0626d75 (Types?)
=======
import React from 'react';
>>>>>>> 4f883d5 (Update types)
type Props = {
    value: string;
    limitHeight?: boolean;
    language?: null | 'sql' | 'curl' | 'json';
    transparent?: boolean;
    overflowX?: boolean;
};
export default function CodeSnippet({ value, limitHeight, language, transparent, overflowX, }: Props): React.JSX.Element;
export {};
