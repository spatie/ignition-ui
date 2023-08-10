import React from 'react';
declare type Props = {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode | React.ReactNodeArray;
};
declare function UnorderedList({ children, className, ...props }: Props): React.JSX.Element;
declare namespace UnorderedList {
    var Item: typeof UnorderedListItem;
}
export default UnorderedList;
declare type Value = string | React.ReactNode | Array<any> | Object;
declare type UnorderedListItemProps = {
    value?: Value;
};
declare function UnorderedListItem({ value }: UnorderedListItemProps): React.JSX.Element;
