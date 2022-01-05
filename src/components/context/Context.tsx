import React, { useContext } from 'react';
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
import ContextSections from './ContextSections';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import InViewContextProvider from '../../contexts/InViewContextProvider';

export default function Context() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);
    const context = errorOccurrence.context_items;
    const files = getContextValues(errorOccurrence, 'files');
    const requestData = getContextValues(errorOccurrence, 'request_data');

    return (
        <section className="2xl:row-span-4">
            <a id="context" className="z-50 absolute top-[-7.5rem] " />

            <div className="flex items-stretch">
                <InViewContextProvider>
                    <ContextSections>
                        <ContextGroup title="Request">
                            <Request />
                            <ContextSection
                                title="Headers"
                                icon={<FontAwesomeIcon icon={faExchangeAlt} />}
                                children={<Headers />}
                            />
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
                    </ContextSections>
                </InViewContextProvider>
            </div>
        </section>
    );
}
