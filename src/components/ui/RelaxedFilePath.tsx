import React, { useContext } from 'react';
import ErrorOccurrenceContext from '../../contexts/ErrorOccurrenceContext';

type Props = {
    path: string;
    lineNumber?: null | number;
    partClass?: string;
};

export default function RelaxedFilePath({ path: fullPath, lineNumber = null, partClass = '' }: Props) {
    const { application_path } = useContext(ErrorOccurrenceContext);
    const path = fullPath.replace(application_path + '/', '');
    const parts = path.split('/');
    const fileParts = parts.pop()?.split('.') || [];
    const extension = fileParts.pop();
    const fileName = fileParts.join('.');

    return (
        <span className="group">
            {parts.map((part, index) => (
                <React.Fragment key={index}>
                    <span key={index} className={partClass}>
                        {part}
                    </span>
                    <span className="mx-0.5">/</span>
                    <wbr />
                </React.Fragment>
            ))}
            <span className={`${partClass} font-semibold`}>{fileName}</span>
            <span className={partClass}>.{extension}</span>

            {lineNumber && (
                <>
                    <span className="mx-0.5">:</span>
                    <span>{lineNumber}</span>
                </>
            )}
        </span>
    );
}
