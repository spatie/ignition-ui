import { HeadersContext, RequestContext, RequestDataContext } from "../../../types";
declare type Props = {
    request: RequestContext;
    requestData: RequestDataContext;
    headers: HeadersContext;
};
export default function Request({ request, requestData, headers }: Props): JSX.Element;
export {};
