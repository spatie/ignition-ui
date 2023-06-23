import React from 'react';
type Props = {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode | Array<React.ReactNode>;
};
declare function DefinitionList({ children, className, ...props }: Props): React.JSX.Element | null;
declare namespace DefinitionList {
    var Row: typeof DefinitionListRow;
}
export default DefinitionList;
type Value = string | React.ReactNode | Array<any> | Object | boolean | number;
type DefinitionListRowProps = {
    value?: Value;
    label?: string | React.ReactNode;
    className?: string;
    stacked?: boolean;
    type?: string;
};
declare function DefinitionListRow({ value, label, className, stacked, type }: DefinitionListRowProps): React.JSX.Element;
