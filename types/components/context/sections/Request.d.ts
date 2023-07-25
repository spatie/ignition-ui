/// <reference types="react" />
import { HeadersContext, RequestContext, RequestDataContext } from '../../../types';
declare type Props = {
    request: RequestContext;
    requestData: RequestDataContext | null;
    headers: HeadersContext | null;
};
export default function Request({ request, requestData, headers }: Props): JSX.Element;
export {};
