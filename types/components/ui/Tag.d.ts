import React from 'react';
declare type Props = {
    children: React.ReactNode;
    className?: string;
    color?: 'red' | 'orange' | 'green' | 'blue' | 'purple' | 'gray' | undefined;
};
export default function Tag({ children, className, color }: Props): React.JSX.Element;
export {};
