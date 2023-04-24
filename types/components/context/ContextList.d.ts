/// <reference types="react" />
declare type Props = {
    items: Record<string, string | object | boolean>;
};
export default function ContextList({ items }: Props): JSX.Element;
export {};
