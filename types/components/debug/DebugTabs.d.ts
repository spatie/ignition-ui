import React from 'react';
declare type Props = {
    children: Array<React.ReactElement | false>;
    className?: string;
};
declare type Tab = {
    name: string | React.ReactElement;
    count: number;
    component: React.ComponentType<any>;
};
declare function DebugTabs({ children, className }: Props): JSX.Element;
declare namespace DebugTabs {
    var Tab: (_props: Tab) => null;
}
export default DebugTabs;
