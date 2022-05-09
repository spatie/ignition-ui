export declare type IgnitionConfig = {
    editor: string;
    editorOptions: {
        [editor: string]: {
            label: string;
            url: string;
        };
    };
    remoteSitesPath: string;
    localSitesPath: string;
    theme: 'light' | 'dark' | 'auto';
    enableShareButton: boolean;
    directorySeparator: string;
    shareEndpoint: string;
};
export declare type ErrorFrame = {
    class?: string;
    method: string;
    code_snippet: Record<string | number, string>;
    file: string;
    relative_file: string;
    line_number: number;
    application_frame: boolean;
};
export declare type ErrorOccurrence = {
    type: 'web' | 'cli' | 'queue' | null;
    entry_point: string;
    exception_message: string;
    exception_class: string;
    application_path: string;
    application_version: string | null;
    notifier_client_name: string;
    language_version?: string;
    framework_version?: string;
    stage: string;
    context_items: {
        env: EnvContext;
        dumps: null | DumpContext;
        request: null | RequestContext;
        request_data: null | RequestDataContext;
        logs: null | LogContext;
        queries: null | QueryContext;
        livewire: null | LivewireContext;
        view: null | ViewContext;
        headers: null | HeadersContext;
        session: null | SessionContext;
        cookies: null | CookiesContext;
        user: null | UserContext;
        route: null | RouteContext;
        git: null | GitContext;
    };
    first_frame_class: string;
    first_frame_method: string;
    glows: Array<ErrorGlow>;
    solutions: Array<ErrorSolution>;
    documentation_links: Array<string>;
    frames: Array<ErrorFrame>;
};
export declare type HeadersContext = Record<string, string>;
export declare type SessionContext = Record<string, string>;
export declare type CookiesContext = Record<string, string | object | boolean>;
export declare type RequestContext = {
    url: string;
    ip: string | null;
    method: string;
    useragent: string;
};
export declare type RequestDataContext = {
    queryString: Record<string, string>;
    body: null | string | Record<string, string>;
    files: null | string | Array<any>;
};
export declare type EnvContext = {
    laravel_version?: string;
    laravel_locale?: string;
    laravel_config_cached?: boolean;
    app_debug?: boolean;
    app_env?: string;
    php_version?: string;
    [key: string]: any;
};
export declare type UserContext = {
    [key: string]: string | null;
};
export declare type GitContext = {
    hash: string;
    message: string;
    tag: string;
    remote: string;
    isDirty: boolean;
};
export declare type RouteContext = {
    route: string | null;
    routeParameters: Record<string, number | string | null>;
    controllerAction: string | null;
    middleware: Array<string>;
};
export declare type ViewContext = {
    view: string;
    data: Record<string, string>;
};
export declare type LivewireContext = {
    component_alias: string;
    component_class: string;
    component_id: string;
    data: Record<string, string | object>;
    updates: Array<{
        payload: Record<string, any>;
        type: string;
    }>;
};
export declare type QueryContext = Array<QueryDebug>;
export declare type DumpContext = Array<DumpDebug>;
export declare type LogContext = Array<LogDebug>;
export declare type ErrorGlow = {
    message_level: LogLevel;
    meta_data: Record<string, string | object>;
    microtime: number;
    name: string;
    time: number;
};
export declare type ErrorSolution = {
    class: string;
    title: string;
    description: string;
    links: {
        [label: string]: string;
    };
    is_runnable: boolean;
    action_description?: string;
    run_button_text?: string;
    execute_endpoint?: string;
    run_parameters?: string;
};
export declare type FrameType = 'application' | 'vendor' | 'unknown';
export declare type StackFrameGroupType = {
    type: FrameType;
    relative_file: string;
    expanded: boolean;
    frames: Array<ErrorFrame & {
        frame_number: number;
        selected: boolean;
    }>;
};
export declare type Tabname = 'stackTraceTab' | 'requestTab' | 'appTab' | 'userTab' | 'contextTab' | 'debugTab';
export declare type SharePostData = {
    tabs?: Array<Tabname>;
    selectedTabNames: Array<Tabname>;
    lineSelection: string;
};
export declare type QueryDebug = {
    bindings: Array<{
        type: 'string' | 'int' | 'float' | 'bool' | 'null';
        value: string;
    }>;
    microtime: number;
    sql: string;
    time: number;
    connection_name: string;
};
export declare type DumpDebug = {
    html_dump: string;
    file: string;
    line_number: number;
    microtime: number;
};
export declare type LogLevel = 'debug' | 'info' | 'notice' | 'warning' | 'error' | 'critical' | 'alert' | 'emergency' | 'warn';
export declare type LogDebug = {
    context: Record<string, string | object>;
    level: LogLevel;
    message: string;
    microtime: number;
};
