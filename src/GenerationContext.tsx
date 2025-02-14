import { createContext, useContext, useState } from "react";
type GenerationContextParameters = {
    prefix: string,
    length: number,
    startingNumber: number
}

type GenerationContextType = {current: GenerationContextParameters, set: (val: GenerationContextParameters) => void};

const GenerationContext = createContext<GenerationContextType|null>(null);

export function GenerationContextProvider({children}: React.PropsWithChildren) {
    const [context, setContext] = useState<GenerationContextParameters>({prefix: "ASN", length: 5, startingNumber: 1});
    const contextValue: GenerationContextType = {
        current: context,
        set: setContext
      };
    return <GenerationContext.Provider value={contextValue}>
        {children}
    </GenerationContext.Provider>
}

export function useGenerationContext(): GenerationContextType{
    return useContext(GenerationContext) as unknown as GenerationContextType;
}
