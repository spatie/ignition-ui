import React from 'react';
declare type Props = {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode | Array<React.ReactNode>;
};
declare function DefinitionList({ children, className, ...props }: Props): JSX.Element | null;
declare namespace DefinitionList {
    var Row: typeof DefinitionListRow;
}
export default DefinitionList;
declare type Value = string | React.ReactNode | Array<any> | Object | boolean | number;
declare type DefinitionListRowProps = {
    value?: Value;
    label?: string | React.ReactNode;
    className?: string;
    stacked?: boolean;
    type?: string;
};
declare function DefinitionListRow({ value, label, className, stacked, type }: DefinitionListRowProps): JSX.Element;
