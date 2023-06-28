import React from 'react';
import { HeadersContext, RequestContext, RequestDataContext } from '../../../types';
type Props = {
    request: RequestContext;
    requestData: RequestDataContext;
    headers: HeadersContext;
};
export default function Request({ request, requestData, headers }: Props): React.JSX.Element;
export {};
