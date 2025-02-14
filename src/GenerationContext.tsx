import { createContext, useContext, useState } from "react";
interface GenerationContextType {
    prefix: string,
    length: number,
    startingNumber: number
}
const GenerationContext = createContext<GenerationContextType|null>(null);

export function GenerationContextProvider({children}: React.PropsWithChildren) {
    const [startingNumber, setStartingNumber] = useState(1);
    const [prefix, setPrefix] = useState("ASN");
    const [length, setLength] = useState(5);
    const contextValue = {
        startingNumber,
        setStartingNumber,
        prefix,
        setPrefix,
        length,
        setLength
      };
    return <GenerationContext.Provider value={contextValue}>
        {children}
    </GenerationContext.Provider>
}

export function useGenerationContext(): GenerationContextType{
    return useContext(GenerationContext);
}