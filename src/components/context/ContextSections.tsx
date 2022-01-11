import React, { Children, useContext } from 'react';
import ContextNav from './ContextNav';
import ContextNavGroup from './ContextNavGroup';
import ContextNavItem from './ContextNavItem';
import { ContextGroupProps } from './ContextGroup';
import ContextSection from './ContextSection';
import InViewContext from '../../contexts/InViewContext';

type Props = {
    children: Array<React.ReactElement<ContextGroupProps> | null>;
};

export default function ContextSections({ children }: Props) {
    const { inView } = useContext(InViewContext);

    return (
        <>
            <nav className="hidden sm:block min-w-[8rem] flex-none mr-10 lg:mr-20">
                <div className="sticky top-[7.5rem]">
                    <ContextNav>
                        {Children.map(children, (group) => (
                            <>
                                {group && (
                                    <ContextNavGroup title={group.props.title} anchor={group.props.anchor}>
                                        {Children.map(group.props.children, (section) => (
                                            <>
                                                {section && section.type === ContextSection && (
                                                    <ContextNavItem
                                                        icon={section.props.icon}
                                                        active={inView[inView.length - 1] === section.props.title}
                                                        title={section.props.title}
                                                        anchor={section.props.anchor}
                                                    />
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
            <div className="overflow-hidden grid grid-cols-1 gap-px shadow-lg flex-grow">{children}</div>
        </>
    );
}
