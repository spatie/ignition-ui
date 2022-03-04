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
declare type DefinitionListRowProps = {
    value?: string | React.ReactNode | Array<any> | Object | boolean;
    label?: string | React.ReactNode;
    className?: string;
    stacked?: boolean;
};
declare function DefinitionListRow({ value, label, className, stacked }: DefinitionListRowProps): JSX.Element;
