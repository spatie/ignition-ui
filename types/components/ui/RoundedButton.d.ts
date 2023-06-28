import React, { ButtonHTMLAttributes } from 'react';
type Props = {
    children: React.ReactNode;
    className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;
export default function RoundedButton({ children, className, ...props }: Props): React.JSX.Element;
export {};
