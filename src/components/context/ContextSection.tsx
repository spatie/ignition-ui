import React from 'react';

type Props = {
    icon: string;
    title: string;
    children: React.ReactNode;
};

export default function ContextSection({icon, title, children}: Props) {
    return (
        <div className="contents">
            <h1 className="py-2 col-span-2 font-semibold text-lg ~text-indigo-600">
                {title}
                <i className={`ml-2 fa-fw text-sm opacity-50 ${icon}`}/>
            </h1>
            {children}
        </div>
    )
}
