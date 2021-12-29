import React, { useContext } from 'react';
import ErrorOccurrenceContext from '../../../contexts/ErrorOccurrenceContext';
import { getContextValues } from '../../../util';
import { EnvContext } from '../../../types';
import DefinitionList from '../../ui/DefinitionList';
import startCase from 'lodash/startCase';

export default function Versions() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);

    const env = getContextValues(errorOccurrence, 'env') as EnvContext;

    return (
        <>
            {errorOccurrence.application_version && (
                <DefinitionList.Row key="app_version" value={errorOccurrence.application_version} label="App Version" />
            )}

            {Object.entries(env).map(([key, value]) => (
                <DefinitionList.Row key={key} value={value} label={startCase(key)} />
            ))}
        </>
    );
}
