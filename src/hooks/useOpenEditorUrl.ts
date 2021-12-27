import { useContext } from 'react';
import IgnitionConfigContext from '../contexts/IgnitionConfigContext';
import mapValues from 'lodash/mapValues';

type Props = {
    file: string;
    lineNumber?: number;
};

export default function useOpenEditorUrl({ file, lineNumber = 1 }: Props) {
    const { ignitionConfig } = useContext(IgnitionConfigContext);
    const editor = ignitionConfig.editor;

    const editors: Record<string, string> = mapValues(ignitionConfig.editorOptions, (e) => e.url);

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
