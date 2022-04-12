import { ErrorFrame } from '../../../types';
export declare type Row = Node[];
declare type Node = {
    type: string;
    tagName?: string;
    properties: {
        className: null | string;
    };
    children: Node[];
};
declare type Props = {
    frame: ErrorFrame;
};
export default function FrameCodeSnippet({ frame }: Props): JSX.Element;
export {};
