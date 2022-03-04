import React from 'react';
declare type Props = {
    children: Array<React.ReactElement | false>;
};
declare type Tab = {
    name: string | React.ReactElement;
    count: number;
    component: React.ComponentType<any>;
};
declare function DebugTabs({ children }: Props): JSX.Element;
declare namespace DebugTabs {
    var Tab: (_props: Tab) => null;
}
export default DebugTabs;
