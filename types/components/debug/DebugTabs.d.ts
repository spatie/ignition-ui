import React from 'react';
type Props = {
    children: Array<React.ReactElement | false>;
};
type Tab = {
    name: string | React.ReactElement;
    count: number;
    component: React.ComponentType<any>;
};
declare function DebugTabs({ children }: Props): React.JSX.Element;
declare namespace DebugTabs {
    var Tab: (_props: Tab) => null;
}
export default DebugTabs;
