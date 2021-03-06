import { ErrorOccurrence } from './types';
export declare function copyToClipboard(text: string): void;
export declare function curlCommand(request: any, requestData: any, headers: any): null | string;
export declare function unixToDate(timestamp: number): Date;
export declare function jsonStringify(value: any): string;
export declare function hasDebugInfo(errorOccurrence: ErrorOccurrence): boolean;
