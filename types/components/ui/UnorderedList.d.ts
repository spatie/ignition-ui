import React from 'react';
declare type Props = {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode | Array<React.ReactNode>;
};
declare function UnorderedList({ children, className, ...props }: Props): JSX.Element;
declare namespace UnorderedList {
    var Item: typeof UnorderedListItem;
}
export default UnorderedList;
declare type UnorderedListItemProps = {
    value?: string | React.ReactNode | Array<any> | Object;
};
declare function UnorderedListItem({ value }: UnorderedListItemProps): JSX.Element;
