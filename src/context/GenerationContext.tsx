import { createContext, useContext, useState } from "react";
import { GenerationSettings } from "../settings/GenerationSettings";


type GenerationContextType = {current: GenerationSettings, set: (val: Partial<GenerationSettings>) => void};

const GenerationContext = createContext<GenerationContextType|null>(null);

export function GenerationContextProvider({children}: React.PropsWithChildren) {
    const [context, setContext] = useState<GenerationSettings>({
        layout: 0,
        prefix: "ASN", 
        length: 5, 
        startingNumber: 1,
        startingLabel: 1,
        labelCount: 189
    });

    const updateContext = (val: Partial<GenerationSettings>) => {
        setContext(old => {
            Object.keys(val).forEach(key => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                old[key] = val[key];
            });
            return old;
        });
    };

    const contextValue: GenerationContextType = {
        current: context,
        set: updateContext
      };
    return <GenerationContext.Provider value={contextValue}>
        {children}
    </GenerationContext.Provider>
}

export function useGenerationContext(): GenerationContextType{
    return useContext(GenerationContext) as unknown as GenerationContextType;
}

export function useGenerationSettings(): GenerationSettings {
    return useGenerationContext().current;
}
