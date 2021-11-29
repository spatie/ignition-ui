type Props = {
    file: string;
    lineNumber?: number;
};

export default function useOpenEditorUrl({ file, lineNumber = 1 }: Props) {
    const editor = 'vscode';

    const editors: Record<string, string> = {
        sublime: 'subl://open?url=file://%path&line=%line',
        textmate: 'txmt://open?url=file://%path&line=%line',
        emacs: 'emacs://open?url=file://%path&line=%line',
        macvim: 'mvim://open/?url=file://%path&line=%line',
        phpstorm: 'phpstorm://open?file=%path&line=%line',
        idea: 'idea://open?file=%path&line=%line',
        vscode: 'vscode://file/%path:%line',
        'vscode-insiders': 'vscode-insiders://file/%path:%line',
        'vscode-remote': 'vscode://vscode-remote/%path:%line',
        'vscode-insiders-remote': 'vscode-insiders://vscode-remote/%path:%line',
        atom: 'atom://core/open/file?filename=%path&line=%line',
        nova: 'nova://core/open/file?filename=%path&line=%line',
        netbeans: 'netbeans://open/?f=%path:%line',
        xdebug: 'xdebug://%path@%line',
    };

    // TODO: fix this with config context provider
    // file =
    //     (config.remoteSitesPath || '').length > 0 && (config.localSitesPath || '').length > 0
    //         ? file.replace(config.remoteSitesPath, config.localSitesPath)
    //         : file;

    if (!Object.keys(editors).includes(editor)) {
        console.error(`'${editor}' is not supported. Support editors are: ${Object.keys(editors).join(', ')}`);

        return null;
    }

    return editors[editor].replace('%path', encodeURIComponent(file)).replace('%line', encodeURIComponent(lineNumber));
}

