import React from 'react';
import { HeadersContext, RequestContext, RequestDataContext } from '../../../types';
declare type Props = {
    request: RequestContext;
    requestData: RequestDataContext | null;
    headers: HeadersContext | null;
};
export default function Request({ request, requestData, headers }: Props): React.JSX.Element;
export {};
