import React from 'react';
type Props = {
    value: string;
    className?: string;
    alwaysVisible?: boolean;
    direction?: 'left' | 'right';
};
export default function CopyButton({ value, className, alwaysVisible, direction }: Props): React.JSX.Element;
export {};
