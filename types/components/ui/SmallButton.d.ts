import React, { ButtonHTMLAttributes } from 'react';
declare type Props = {
    children: React.ReactNode;
    className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;
export default function SmallButton({ children, className, ...props }: Props): React.JSX.Element;
export {};
