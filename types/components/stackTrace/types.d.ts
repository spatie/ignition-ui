import { ErrorFrame } from '../../types';
export declare type State = {
    frames: Array<ErrorFrame>;
    selected: number;
    expanded: Array<number>;
};
export declare type Action = {
    type: 'EXPAND_FRAMES';
    frames: Array<number>;
} | {
    type: 'EXPAND_ALL_VENDOR_FRAMES';
} | {
    type: 'COLLAPSE_ALL_VENDOR_FRAMES';
} | {
    type: 'SELECT_FRAME';
    frame: number;
} | {
    type: 'SELECT_NEXT_FRAME';
} | {
    type: 'SELECT_PREVIOUS_FRAME';
};
//# sourceMappingURL=types.d.ts.map