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
import { faExchangeAlt, faQuestionCircle, faCode, faFile, faHourglassHalf, faCookieBite, faRandom, faPaintRoller, faWindowMaximize, faUser, faCodeBranch, faInfoCircle, faEye } from '@fortawesome/free-solid-svg-icons';
import InViewContextProvider from '../../contexts/InViewContextProvider';

export default function Context() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);
    const context = errorOccurrence.context_items;
    const files = getContextValues(errorOccurrence, 'files');
    const requestData = getContextValues(errorOccurrence, 'request_data');

    return (
        <section>
            <a id="context" className="z-50 absolute top-[-7.5rem] " />

            <div className="flex items-stretch">
                <InViewContextProvider>
                    <ContextSections>
                        <ContextGroup title="Request">
                            <Request />
                            <ContextSection
                                title="Headers"
                                icon={<FontAwesomeIcon fixedWidth icon={faExchangeAlt} />}
                                children={<Headers />}
                            />
                            {!!requestData.queryString.length && (
                                <ContextSection
                                    title="Query String"
                                    icon={<FontAwesomeIcon fixedWidth icon={faQuestionCircle} />}
                                    children={<QueryString />}
                                />
                            )}
                            <ContextSection title="Body" icon={<FontAwesomeIcon fixedWidth icon={faCode} />} children={<Body />} />
                            {!!files.length && <ContextSection title="Files" icon={<FontAwesomeIcon fixedWidth icon={faFile} />} children={<Files />} />}
                            <ContextSection title="Session" icon={<FontAwesomeIcon fixedWidth icon={faHourglassHalf} />} children={<Session />} />
                            <ContextSection title="Cookies" icon={<FontAwesomeIcon fixedWidth icon={faCookieBite} />} children={<Cookies />} />
                        </ContextGroup>
                        <ContextGroup title="App">
                            {context.route && (
                                <ContextSection title="Routing" icon={<FontAwesomeIcon fixedWidth icon={faRandom} />} children={<Routing />} />
                            )}
                            {context.view && (
                                <ContextSection title="Views" icon={<FontAwesomeIcon fixedWidth icon={faPaintRoller} />} children={<View />} />
                            )}
                        </ContextGroup>
                        {context.livewire && (
                            <ContextGroup title="Livewire">
                                <ContextSection title="Component" icon={<FontAwesomeIcon fixedWidth icon={faEye} />} children={<LivewireComponent />} />
                                <ContextSection title="Updates" icon={<FontAwesomeIcon fixedWidth icon={faEye} />} children={<LivewireUpdates />} />
                                <ContextSection title="Data" icon={<FontAwesomeIcon fixedWidth icon={faEye} />} children={<LivewireData />} />
                            </ContextGroup>
                        )}
                        <ContextGroup title="User">
                            {context.user && <ContextSection title="User" icon={<FontAwesomeIcon fixedWidth icon={faUser} />} children={<User />} />}
                            <ContextSection title="Client" icon={<FontAwesomeIcon fixedWidth icon={faWindowMaximize} />} children={<div>Client</div>} />
                        </ContextGroup>
                        <ContextGroup title="Context">
                            {context.git && <ContextSection title="Git" icon={<FontAwesomeIcon fixedWidth icon={faCodeBranch} />} children={<Git />} />}
                            <ContextSection title="Versions" icon={<FontAwesomeIcon fixedWidth icon={faInfoCircle} />} children={<Versions />} />
                        </ContextGroup>
                    </ContextSections>
                </InViewContextProvider>
            </div>
        </section>
    );
}
