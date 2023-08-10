import React, { ButtonHTMLAttributes } from 'react';
declare type Props = {
    children: React.ReactNode;
    className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;
export default function Button({ children, className, disabled, ...props }: Props): React.JSX.Element;
export {};
