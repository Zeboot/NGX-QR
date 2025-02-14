import { createContext, useContext, useState } from "react";
type GenerationContextParameters = {
    prefix: string,
    length: number,
    startingNumber: number,
    startingLabel: number,
    labelCount: number;
}

type GenerationContextType = {current: GenerationContextParameters, set: (val: Partial<GenerationContextParameters>) => void};

const GenerationContext = createContext<GenerationContextType|null>(null);

export function GenerationContextProvider({children}: React.PropsWithChildren) {
    const [context, setContext] = useState<GenerationContextParameters>({
        prefix: "ASN", 
        length: 5, 
        startingNumber: 1,
        startingLabel: 1,
        labelCount: 189
    });

    const updateContext = (val: Partial<GenerationContextParameters>) => {
        setContext(old => {
            return {...old, ...val};
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
