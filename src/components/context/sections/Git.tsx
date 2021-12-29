import React, { useContext } from 'react';
import ErrorOccurrenceContext from '../../../contexts/ErrorOccurrenceContext';
import { getContextValues } from '../../../util';
import { GitContext } from '../../../types';
import DefinitionList from '../../ui/DefinitionList';
import CodeSnippet from '../../ui/CodeSnippet';
import Alert from '../../ui/Alert';
import LinkButton from '../../ui/LinkButton';
import GitUrlParse from 'git-url-parse';

type GitInfo = { resource: string | null; repoUrl: string | null; commitUrl: string | null };

function getGitInfo(remote?: string, hash?: string): GitInfo {
    if (!remote) {
        return {
            resource: null,
            repoUrl: null,
            commitUrl: null,
        };
    }

    const repoInfo = GitUrlParse(remote);
    const repoUrl = GitUrlParse.stringify({ ...repoInfo, git_suffix: false }, 'https');
    return {
        repoUrl,
        resource: repoInfo.resource,
        commitUrl: `${repoUrl}/commit/${hash}`,
    };
}

export default function Git() {
    const errorOccurrence = useContext(ErrorOccurrenceContext);

    const git = getContextValues(errorOccurrence, 'git') as GitContext;

    const { commitUrl } = getGitInfo(git.remote, git.hash);

    return (
        <>
            {git.hash && git.message && (
                <div className="col-span-2 flex space-between">
                    <div>
                        <span className="text-gray-700">{git.message}</span>
                        <span className="text-sm text-gray-500">
                            <CodeSnippet value={git.hash} />
                        </span>
                    </div>
                    {commitUrl && (
                        <div>
                            <LinkButton href={commitUrl} target="_blank">
                                {git.hash.substr(0, 7)}
                                <i className="fas fa-external-link-square" />
                            </LinkButton>
                        </div>
                    )}
                </div>
            )}
            {git.isDirty && (
                <div className="col-span-2">
                    <Alert className="inline-block">
                        Last commit is dirty. (Un)staged changes have been made since this commit.
                    </Alert>
                </div>
            )}
            {git.tag && <DefinitionList.Row label="Latest tag" value={git.tag} />}
        </>
    );
}
