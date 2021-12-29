import React, { useContext } from 'react';
import DefinitionList from '../../ui/DefinitionList';
import ErrorOccurrenceContext from '../../../contexts/ErrorOccurrenceContext';
import { getContextValues } from '../../../util';
import { RouteContext } from '../../../types';
import UnorderedList from '../../ui/UnorderedList';

export default function Routing() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);
    const route = getContextValues(errorOccurrence, 'route') as RouteContext;

    return (
        <>
            <DefinitionList.Row value={route.controllerAction} label="Controller" />
            {route.route && <DefinitionList.Row value={route.route} label="Route name" />}
            {Object.entries(route.routeParameters).length > 0 && (
                <DefinitionList.Row
                    value={
                        <DefinitionList>
                            {Object.entries(route.routeParameters || []).map(([key, parameter]) => (
                                <DefinitionList.Row key={key} label={key} value={parameter as string} />
                            ))}
                        </DefinitionList>
                    }
                    label="Route parameters"
                />
            )}
            {route.middleware && (
                <DefinitionList.Row
                    value={
                        <UnorderedList>
                            {(route.middleware || []).map((middleware: string, i: number) => (
                                <UnorderedList.Item key={i} value={middleware} />
                            ))}
                        </UnorderedList>
                    }
                    label="Middleware"
                />
            )}
        </>
    );
}
