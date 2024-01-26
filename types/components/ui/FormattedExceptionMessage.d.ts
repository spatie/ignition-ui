import React from 'react';
type Props = {
    message: string;
    exceptionClass: string;
    className?: string;
};
export default function FormattedExceptionMessage({ message, exceptionClass, className }: Props): React.JSX.Element;
export {};
