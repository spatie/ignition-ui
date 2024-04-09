<<<<<<< HEAD
<<<<<<< HEAD
import React from 'react';
=======
/// <reference types="react" />
>>>>>>> 0626d75 (Types?)
=======
import React from 'react';
>>>>>>> 4f883d5 (Update types)
type Props = {
    message: string;
    exceptionClass: string;
    className?: string;
};
export default function FormattedExceptionMessage({ message, exceptionClass, className }: Props): React.JSX.Element;
export {};
