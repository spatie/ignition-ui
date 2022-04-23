import React, { useEffect, useState } from 'react';
import IgnitionConfigContext from './IgnitionConfigContext';
import { IgnitionConfig } from '../types';
import { useColorScheme } from 'use-color-scheme';

type Props = {
    children: React.ReactNode;
    ignitionConfig: IgnitionConfig;
};

export default function IgnitionConfigContextProvider({ children, ignitionConfig: initialIgnitionConfig }: Props) {
    const [ignitionConfig, setIgnitionConfig] = useState<IgnitionConfig>(initialIgnitionConfig);
    const { scheme } = useColorScheme();

    const theme = ignitionConfig.theme === 'auto' ? (scheme !== 'none' ? scheme : 'light') : ignitionConfig.theme;

    useEffect(() => {
        document.documentElement.classList.remove('light', 'dark', 'auto');
        document.documentElement.classList.add(theme);
    }, [theme]);

    return (
        <IgnitionConfigContext.Provider value={{ ignitionConfig, setIgnitionConfig, theme }}>
            {children}
        </IgnitionConfigContext.Provider>
    );
}
