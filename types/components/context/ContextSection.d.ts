import React from 'react';
export type ContextSectionProps = {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
    anchor: string;
};
export default function ContextSection({ icon, title, children, anchor }: ContextSectionProps): JSX.Element;
