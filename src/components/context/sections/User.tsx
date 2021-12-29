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
                <div className="flex items-center col-span-2">
                    <div>
                        <img
                            className="inline-block h-9 w-9 rounded-full"
                            alt={user.email}
                            src={`https://gravatar.com/avatar/${md5(user.email)}/?s=240`}
                        />
                    </div>
                    <div className="ml-3">
                        {user.name && (
                            <p className="text-base font-semibold text-gray-700 group-hover:text-gray-900">
                                {user.name}
                            </p>
                        )}
                        <p className="text-sm font-semibold text-gray-500 group-hover:text-gray-700">{user.email}</p>
                    </div>
                </div>
            )}
            <div className="col-span-2">
                <CodeSnippet value={jsonStringify(user)} />
            </div>
        </>
    );
}
