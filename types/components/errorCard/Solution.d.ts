import React from 'react';
import { ErrorSolution } from '../../types';
declare type Props = {
    solution: ErrorSolution;
    isOpen?: boolean;
    isCollapsible?: boolean;
    canExecute: boolean;
};
export default function Solution({ solution, isOpen: initialIsOpen, isCollapsible, canExecute, }: Props): React.JSX.Element;
export {};
