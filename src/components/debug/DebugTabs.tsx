import React, { Children, useState } from 'react';

type Props = {
    children: Array<React.ReactElement | false>;
};

type Tab = {
    name: string | React.ReactElement;
    count: number;
    component: React.ComponentType<any>;
};

export default function DebugTabs({ children }: Props) {
    const [currentTabIndex, setCurrentTabIndex] = useState(0);

    const validChildren = children.filter((child) => child !== false) as Array<React.ReactElement>;

    const tabs: Array<Tab> = Children.map(validChildren, (child) => {
        return {
            name: child.props.name,
            component: child.props.component,
            count: child.props.count,
            checked: child.props.checked,
            onChange: child.props.onChange,
        };
    }).filter((tab) => tab.count);

    const Tab = tabs[currentTabIndex].component;

    return (
        <div className="bg-gray-300/50 dark:bg-black/10 shadow-inner">
            <nav className="flex justify-center items-center">
                <ul className="-my-5 flex justify-start items-center rounded-full shadow-lg bg-indigo-400 text-white space-x-px">
                    {tabs.map((tab, i) => (
                        <li
                            key={i}
                            className={`
                                    ${i === currentTabIndex ? 'bg-indigo-500' : '~bg-white text-gray-500'}
                                    ${i === 0 ? 'rounded-l-full' : ''}
                                    ${i === tabs.length - 1 ? 'rounded-r-full' : ''}
                                `}
                        >
                            <button
                                onClick={() => setCurrentTabIndex(i)}
                                className="group flex items-center px-3 sm:px-5 h-10 uppercase tracking-wider text-xs font-medium "
                            >
                                <span className="mr-1.5 inline-flex items-center justify-center px-1 min-w-[1rem] h-4 bg-gray-900/30 text-white rounded-full text-xs">
                                    {tab.count}
                                </span>
                                <span>{tab.name}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
            
            <div className="grid grid-cols-1 gap-px">
                <Tab />
            </div>
        </div>
    );
}

DebugTabs.Tab = (_props: Tab) => null;
