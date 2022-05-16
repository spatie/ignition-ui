export type IgnitionConfig = {
    editor: string;
    editorOptions: { [editor: string]: { label: string; url: string } };
    remoteSitesPath: string;
    localSitesPath: string;
    theme: 'light' | 'dark' | 'auto';
    enableShareButton: boolean;
    directorySeparator: string;
    shareEndpoint: string;
};

export type ErrorFrame = {
    class?: string;
    method: string;
    code_snippet: { [lineNumber: string]: string };
    file: string;
    relative_file: string;
    line_number: number;
    application_frame: boolean;
};

export type ErrorOccurrence = {
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
        env: null | EnvContext;
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

export type HeadersContext = Record<string, string>;
export type SessionContext = Record<string, string>;
export type CookiesContext = Record<string, string | object | boolean>;

export type RequestContext = {
    url: string;
    ip: string | null;
    method: string;
    useragent: string;
};

export type RequestDataContext = {
    queryString: Record<string, string>;
    body: null | string | Record<string, string>;
    files: null | string | Array<any>; // TODO: figure out what this is
};

export type EnvContext = {
    laravel_version?: string;
    laravel_locale?: string;
    laravel_config_cached?: boolean;
    app_debug?: boolean;
    app_env?: string;
    php_version?: string;
    [key: string]: any;
};

export type UserContext = {
    [key: string]: string | null;
};

export type GitContext = {
    hash: string;
    message: string;
    tag: string;
    remote: string;
    isDirty: boolean;
};

export type RouteContext = {
    route: string | null;
    routeParameters: null | Record<string, number | string | null>;
    controllerAction: string | null;
    middleware: Array<string>;
};

export type ViewContext = {
    view: string;
    data: Record<string, string>;
};

export type LivewireContext = {
    component_alias: string;
    component_class: string;
    component_id: string;
    data: Record<string, string | object>;
    updates: Array<{
        payload: Record<string, any>;
        type: string;
    }>;
};

export type QueryContext = Array<QueryDebug> | { [key: string]: QueryDebug };

export type DumpContext = Array<DumpDebug> | { [key: string]: DumpDebug };

export type LogContext = Array<LogDebug> | { [key: string]: LogDebug };

export type ErrorGlow = {
    message_level: LogLevel;
    meta_data: Record<string, string | object>;
    microtime: number;
    name: string;
};

export type ErrorSolution = {
    class: string;
    title: string;
    description: string;
    links: { [label: string]: string };
    is_runnable: boolean;
    action_description?: string;
    run_button_text?: string;
    execute_endpoint?: string;
    run_parameters?: string;
};

export type FrameType = 'application' | 'vendor' | 'unknown';

export type StackFrameGroupType = {
    type: FrameType;
    relative_file: string;
    expanded: boolean;
    frames: Array<ErrorFrame & { frame_number: number; selected: boolean }>;
};

export type Tabname = 'stackTraceTab' | 'requestTab' | 'appTab' | 'userTab' | 'contextTab' | 'debugTab';

export type SharePostData = {
    tabs?: Array<Tabname>;
    selectedTabNames: Array<Tabname>;
    lineSelection: string;
};

export type QueryDebug = {
    bindings: Array<{
        type: 'string' | 'int' | 'float' | 'bool' | 'null';
        value: string;
    }>;
    microtime: number;
    sql: string;
    time: number;
    connection_name: string;
};

export type DumpDebug = {
    html_dump: string;
    file: string;
    line_number: number;
    microtime: number;
};

export type LogLevel = 'debug' | 'info' | 'notice' | 'warning' | 'error' | 'critical' | 'alert' | 'emergency' | 'warn';

export type LogDebug = {
    context: Record<string, string | object>;
    level: LogLevel;
    message: string;
    microtime: number;
};
