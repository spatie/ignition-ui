import React from 'react';
export declare type ContextSectionProps = {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
    anchor: string;
};
export default function ContextSection({ icon, title, children, anchor }: ContextSectionProps): React.JSX.Element;
