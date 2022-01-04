import React, { useContext } from 'react';
import ContextNav from './ContextNav';
import ContextNavGroup from './ContextNavGroup';
import ContextNavItem from './ContextNavItem';
import ContextGroup from './ContextGroup';
import ContextSection from './ContextSection';
import Request from './sections/Request';
import Headers from './sections/Headers';
import QueryString from './sections/QueryString';
import Body from './sections/Body';
import Files from './sections/Files';
import Session from './sections/Session';
import Cookies from './sections/Cookies';
import LivewireData from './sections/LivewireData';
import LivewireComponent from './sections/LivewireComponent';
import LivewireUpdates from './sections/LivewireUpdates';
import ErrorOccurrenceContext from '../../contexts/ErrorOccurrenceContext';
import Routing from './sections/Routing';
import View from './sections/View';
import User from './sections/User';
import Git from './sections/Git';
import Versions from './sections/Versions';
import { getContextValues } from '../../util';

export default function Context() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);
    const context = errorOccurrence.context_items;
    const files = getContextValues(errorOccurrence, 'files');
    const requestData = getContextValues(errorOccurrence, 'request_data');

    return (
        <section className="2xl:row-span-4">
            <a id="context" className="z-50 absolute top-[-7.5rem] " />

            <div className="flex items-stretch">
                <nav className="hidden sm:block min-w-[8rem] flex-none mr-10 lg:mr-20">
                    <div className="sticky top-[7.5rem]">
                        <ContextNav>
                            <ContextNavGroup title="Request">
                                <ContextNavItem icon="fas fa-exchange-alt">Headers</ContextNavItem>
                                {!!requestData.queryString.length && (
                                    <ContextNavItem icon="fas fa-question-circle">Query String</ContextNavItem>
                                )}
                                <ContextNavItem icon="fas fa-code">Body</ContextNavItem>
                                {!!files.length && <ContextNavItem icon="far fa-file">Files</ContextNavItem>}
                                <ContextNavItem icon="fas fa-hourglass-half">Session</ContextNavItem>
                                <ContextNavItem icon="fas fa-cookie-bite">Cookies</ContextNavItem>
                            </ContextNavGroup>
                            <ContextNavGroup title="App">
                                {context.route && <ContextNavItem icon="fas fa-random">Routing</ContextNavItem>}
                                {context.view && <ContextNavItem icon="fas fa-paint-roller">Views</ContextNavItem>}
                            </ContextNavGroup>
                            {context.livewire && (
                                <ContextNavGroup title="Livewire">
                                    <ContextNavItem icon="fas fa-eye">Component</ContextNavItem>
                                    <ContextNavItem icon="fas fa-eye">Updates</ContextNavItem>
                                    <ContextNavItem icon="fas fa-eye">Data</ContextNavItem>
                                </ContextNavGroup>
                            )}
                            <ContextNavGroup title="User">
                                {context.user && <ContextNavItem icon="fas fa-user">User</ContextNavItem>}
                                <ContextNavItem icon="far fa-window-maximize">Client</ContextNavItem>
                            </ContextNavGroup>
                            <ContextNavGroup title="Context">
                                {context.git && <ContextNavItem icon="fas fa-code-branch">Git</ContextNavItem>}
                                <ContextNavItem icon="far fa-info-circle">Versions</ContextNavItem>
                            </ContextNavGroup>
                        </ContextNav>
                    </div>
                </nav>
                <div className="overflow-hidden grid grid-cols-1 gap-px flex-grow">
                    <ContextGroup title="Request">
                        <Request />
                        <ContextSection title="Headers" icon="fas fa-exchange-alt" children={<Headers />} />
                        {!!requestData.queryString.length && (
                            <ContextSection
                                title="Query String"
                                icon="fas fa-question-circle"
                                children={<QueryString />}
                            />
                        )}
                        <ContextSection title="Body" icon="fas fa-code" children={<Body />} />
                        {!!files.length && <ContextSection title="Files" icon="far fa-file" children={<Files />} />}
                        <ContextSection title="Session" icon="fas fa-hourglass-half" children={<Session />} />
                        <ContextSection title="Cookies" icon="fas fa-cookie-bite" children={<Cookies />} />
                    </ContextGroup>
                    <ContextGroup title="App">
                        {context.route && (
                            <ContextSection title="Routing" icon="fas fa-random" children={<Routing />} />
                        )}
                        {context.view && (
                            <ContextSection title="Views" icon="fas fa-paint-roller" children={<View />} />
                        )}
                    </ContextGroup>
                    {context.livewire && (
                        <ContextGroup title="Livewire">
                            <ContextSection title="Component" icon="fas fa-eye" children={<LivewireComponent />} />
                            <ContextSection title="Updates" icon="fas fa-eye" children={<LivewireUpdates />} />
                            <ContextSection title="Data" icon="fas fa-eye" children={<LivewireData />} />
                        </ContextGroup>
                    )}
                    <ContextGroup title="User">
                        {context.user && <ContextSection title="User" icon="fas fa-user" children={<User />} />}
                        <ContextSection title="Client" icon="far fa-window-maximize" children={<div>Client</div>} />
                    </ContextGroup>
                    <ContextGroup title="Context">
                        {context.git && <ContextSection title="Git" icon="fas fa-code-branch" children={<Git />} />}
                        <ContextSection title="Versions" icon="far fa-info-circle" children={<Versions />} />
                    </ContextGroup>
                </div>
            </div>
        </section>
    );
}
