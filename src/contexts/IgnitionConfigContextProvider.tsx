import React, { useEffect, useState } from 'react';
import IgnitionConfigContext from './IgnitionConfigContext';
import { IgnitionConfig } from '../types';

type Props = {
    children: React.ReactNode;
    ignitionConfig: IgnitionConfig;
};

export default function IgnitionConfigContextProvider({ children, ignitionConfig: initialIgnitionConfig }: Props) {
    const [ignitionConfig, setIgnitionConfig] = useState<IgnitionConfig>(initialIgnitionConfig);

    useEffect(() => {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(ignitionConfig.theme);
    }, [ignitionConfig.theme]);

    return (
        <IgnitionConfigContext.Provider value={{ ignitionConfig, setIgnitionConfig }}>
            {children}
        </IgnitionConfigContext.Provider>
    );
}
