import md5 from 'md5';
import React, { useContext } from 'react';
import ErrorOccurrenceContext from '../../../contexts/ErrorOccurrenceContext';
import { getContextValues, jsonStringify } from '../../../util';
import CodeSnippet from '../../ui/CodeSnippet';

export default function User() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);
    const user = getContextValues(errorOccurrence, 'user');

    return (
        <>
            {user.email && (
                <div className="mb-2 flex items-center gap-3">
                    <div>
                        <img
                            className="inline-block h-9 w-9 rounded-full"
                            alt={user.email}
                            src={`https://gravatar.com/avatar/${md5(user.email)}/?s=240`}
                        />
                    </div>
                    <div className="leading-tight">
                        {user.name && (
                            <p className="font-semibold">
                                {user.name}
                            </p>
                        )}
                        <p className="text-sm">{user.email}</p>
                    </div>
                </div>
            )}
            <CodeSnippet value={jsonStringify(user)} />
        </>
    );
}
