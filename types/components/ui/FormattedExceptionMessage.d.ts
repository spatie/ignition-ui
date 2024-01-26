<<<<<<< HEAD
import React from 'react';
=======
/// <reference types="react" />
>>>>>>> 0626d75 (Types?)
type Props = {
    message: string;
    exceptionClass: string;
    className?: string;
};
export default function FormattedExceptionMessage({ message, exceptionClass, className }: Props): React.JSX.Element;
export {};
