import React, { Children } from 'react';
import ContextNav from './ContextNav';
import ContextNavGroup from './ContextNavGroup';
import ContextNavItem from './ContextNavItem';
import { ContextGroupProps } from './ContextGroup';
import ContextSection from './ContextSection';

type Props = {
    children: Array<React.ReactElement<ContextGroupProps> | null>;
};

export default function ContextSections({ children }: Props) {
    return (
        <>
            <nav className="hidden sm:block min-w-[8rem] flex-none mr-10 lg:mr-20">
                <div className="sticky top-[7.5rem]">
                    <ContextNav>
                        {Children.map(children, (group) => (
                            <>
                                {group && (
                                    <ContextNavGroup title={group.props.title}>
                                        {Children.map(group.props.children, (section) => (
                                            <>
                                                {section && section.type === ContextSection && (
                                                    <ContextNavItem icon={section.props.icon}>
                                                        {section.props.title}
                                                    </ContextNavItem>
                                                )}
                                            </>
                                        ))}
                                    </ContextNavGroup>
                                )}
                            </>
                        ))}
                    </ContextNav>
                </div>
            </nav>
            <div className="overflow-hidden grid grid-cols-1 gap-px flex-grow">{children}</div>
        </>
    );
}
