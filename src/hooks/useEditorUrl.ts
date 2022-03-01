import {useContext} from 'react';
import IgnitionConfigContext from '../contexts/IgnitionConfigContext';
import mapValues from 'lodash/mapValues';

type Props = {
    file: string;
    lineNumber?: number;
};

export default function useEditorUrl({file, lineNumber = 1}: Props) {
    const {ignitionConfig: config} = useContext(IgnitionConfigContext);
    const editor = config.editor;

    const editors: Record<string, string> = mapValues(config.editorOptions, (e) => e.url);

    file = (config.remoteSitesPath || '').length > 0 && (config.localSitesPath || '').length > 0
        ? file.replace(config.remoteSitesPath, config.localSitesPath)
        : file;

    if (!Object.keys(editors).includes(editor)) {
        console.warn(`Editor '${editor}' is not supported. Support editors are: ${Object.keys(editors).join(', ')}`);

        return null;
    }

    return editors[editor].replace('%path', encodeURIComponent(file)).replace('%line', encodeURIComponent(lineNumber));
}
