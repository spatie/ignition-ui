import { ErrorFrame } from '../../../types';
import { Row } from './FrameCodeSnippet';
declare type Props = {
    highlight: boolean;
    frame: ErrorFrame;
    lineNumber: number;
    row: Row;
};
export default function FrameCodeSnippetLine({ highlight, row, frame, lineNumber }: Props): JSX.Element;
export {};
