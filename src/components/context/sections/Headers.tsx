import React, { useContext } from 'react';
import ContextList from '../ContextList';
import { getContextValues } from '../../../util';
import ErrorOccurrenceContext from '../../../contexts/ErrorOccurrenceContext';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import omitBy from 'lodash/omitBy';

export default function Headers() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);

    let headers = omitBy(getContextValues(errorOccurrence, 'headers'), isNil);
    headers = omitBy(headers, isEmpty);

    return <ContextList items={headers} />;
}
