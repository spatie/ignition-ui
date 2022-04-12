import { StackFrameGroupType } from '../../../types';
declare type Props = {
    frameGroup: StackFrameGroupType;
    onExpand: () => void;
    onSelect: (frameNumber: number) => void;
};
export default function FrameGroup({ frameGroup, onExpand, onSelect }: Props): JSX.Element;
export {};
