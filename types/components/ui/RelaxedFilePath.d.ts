<<<<<<< HEAD
import React from 'react';
=======
/// <reference types="react" />
>>>>>>> 0626d75 (Types?)
type Props = {
    path: string;
    lineNumber?: null | number;
};
export default function RelaxedFilePath({ path: fullPath, lineNumber }: Props): React.JSX.Element;
export {};
