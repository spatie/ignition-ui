import React from 'react';
import { ErrorFrame } from '../../../types';
import DefinitionList from 'components/ui/DefinitionList';

export default function FrameArguments({ frame }: { frame: ErrorFrame; }) {
    return (
        <DefinitionList className="pl-6 pr-4 pb-4 lg:pl-4">
            {frame.arguments?.map((argument, key) => (
                <DefinitionList.Row
                    key={key}
                    label={
                        <div className="font-mono">
                            <span>
                                <span className="text-sm ~text-gray-700" title="by reference">{argument.is_variadic && '…'}</span>
                                <span className="text-sm ~text-gray-700">{argument.passed_by_reference && '&'}</span>
                                <span className="text-sm ~text-gray-700" title="variadic">$</span>
                                {argument.name}
                            </span>
                            <span className="text-xs pl-px">:{argument.original_type}{argument.truncated && ' - truncated'}</span>
                        </div>
                    }
                    value={argument.value}

                />
            ))}
        </DefinitionList>
    )
}
