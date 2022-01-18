import React from 'react';
// @ts-ignore
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
// @ts-ignore
import sql from 'react-syntax-highlighter/dist/esm/languages/hljs/sql';
// @ts-ignore
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
// @ts-ignore
import curl from 'highlightjs-curl';

SyntaxHighlighter.registerLanguage('sql', sql);
SyntaxHighlighter.registerLanguage('curl', curl);
SyntaxHighlighter.registerLanguage('json', json);

type Props = {
    children: React.ReactNode;
    language: 'sql' | 'curl' | 'json';
};

export default function HighlightedCode({ children, language }: Props) {

    return (
        <SyntaxHighlighter language={language} customStyle={{background:'transparent'}}>
            {children}
        </SyntaxHighlighter>
    );
}
