import { ErrorOccurrence } from './types';

export function copyToClipboard(text: string) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}

// TODO: Move to context dir? 👇

export function curlCommand(request: any, requestData: any, headers: any): null | string {
    if (!request.url || !request.method) {
        return null;
    }

    const curlLines = [`curl "${request.url}"`];

    curlLines.push(`   -X ${request.method}`);

    Object.entries(headers || {}).map(function ([key, value]) {
        curlLines.push(`   -H '${key}: ${value}'`);
    });

    const curlBodyString = curlBody(requestData, headers);

    if (curlBodyString) {
        curlLines.push(curlBodyString);
    }

    return curlLines.join(' \\\n').trimEnd().replace(/\s\\$/g, ';');
}

function curlBody(requestData: any, headers: any) {
    if (!requestData.body) {
        return null;
    }

    if (headers['content-type']?.[0]?.includes('application/json')) {
        return `   -d ${JSON.stringify(requestData.body)}`;
    }

    const formValues = Object.entries(requestData.body || {}).map(function ([key, value]) {
        return `-F '${key}=${value}'`;
    });

    return `   ${formValues.join(' ')}`;
}

export function unixToDate(timestamp: number) {
    return new Date(timestamp * 1000);
}

export function jsonStringify(value: any): string {
    return JSON.stringify(value, null, 4);
}

export function hasDebugInfo(errorOccurrence: ErrorOccurrence) {
    if (errorOccurrence.glows.length) {
        return true;
    }

    if (Object.values(errorOccurrence.context_items.dumps || []).length) {
        return true;
    }

    if (Object.values(errorOccurrence.context_items.logs || []).length) {
        return true;
    }

    if (Object.values(errorOccurrence.context_items.queries || []).length) {
        return true;
    }

    return false;
}
