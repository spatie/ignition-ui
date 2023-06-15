import React from 'react';
import {ErrorFrame} from '../../../types';
import DefinitionList from "components/ui/DefinitionList";

type Props = {
    frame: ErrorFrame;
};

/* @ts-ignore */
export default function FrameArguments({frame}: Props) {
    console.log(frame.arguments);

    return (
        <>
            <div className="p-4">
                <div className="text-xl mb-2">Arguments</div>
                <DefinitionList>
                    {frame.arguments?.map((argument, key) => (
                        <DefinitionList.Row key={key} label={<div>
                            <div>{argument.is_variadic && '...'}{argument.passed_by_reference && '&'}{argument.name}</div>
                            <div className="text-xs">{argument.original_type}{argument.truncated && ' - truncated'}</div>
                        </div>} value={argument.value} />
                    ))}
                </DefinitionList>
            </div>
        </>
    )
}
