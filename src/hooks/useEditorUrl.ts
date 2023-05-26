import {useContext} from 'react';
import IgnitionConfigContext from '../contexts/IgnitionConfigContext';

type Props = {
    file: string;
    lineNumber?: number;
};

export default function useEditorUrl({file, lineNumber = 1}: Props) {
    const {ignitionConfig: config} = useContext(IgnitionConfigContext);
    const selectedEditor = config.editor;
    const editorConfig = config.editorOptions[selectedEditor];
    const result = {
        url: '',
        onClick: (e) => {}
    };

    if (!editorConfig) {
        console.warn(
            `Ignition editor '${selectedEditor}' is not supported. `
            + `Supported editors are: ${Object.keys(config.editorOptions).join(', ')}`
        );

        return result;
    }

    if (config.remoteSitesPath) {
        file = file.replace(config.remoteSitesPath, config.localSitesPath);
    }

    if (editorConfig.openInBackground) {
        result.onClick = (e) => {
            e.preventDefault();
            const backgroundRequest = new XMLHttpRequest();
            backgroundRequest.open("get", e.target.href);
            backgroundRequest.send();
        }
    }

    result.url = editorConfig.url
        .replace('%path', encodeURIComponent(file))
        .replace('%line', encodeURIComponent(lineNumber));

    return result;
}
