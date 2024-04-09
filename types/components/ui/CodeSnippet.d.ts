import React from 'react';
type Props = {
    value: string;
    limitHeight?: boolean;
    language?: null | 'sql' | 'curl' | 'json';
    transparent?: boolean;
    overflowX?: boolean;
};
export default function CodeSnippet({ value, limitHeight, language, transparent, overflowX, }: Props): React.JSX.Element;
export {};
