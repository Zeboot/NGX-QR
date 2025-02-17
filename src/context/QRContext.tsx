import { useState, useContext, createContext } from "react";
import { QRSettings } from "../settings/QRSettings";


type QRSettingsContextType = {current: QRSettings, set: (val: Partial<QRSettings>) => void};

const QRContext = createContext<QRSettingsContextType|null>(null);
export function QRContextProvider({children}: React.PropsWithChildren) {
    const [context, setContext] = useState<QRSettings>({
            fgColor: "#000000",
            logoModifier: 0.3,
            qrStyle: "fluid"
        });
    const updateContext = (val: Partial<QRSettings>) => {
        setContext(old => {
            return {...old, ...val};
        });
    };
    const contextValue: QRSettingsContextType = {
        current: context,
        set: updateContext
      };
    return <QRContext.Provider value={contextValue}>
        {children}
    </QRContext.Provider>
}

export function useQRContext(): QRSettingsContextType{
    return useContext(QRContext) as unknown as QRSettingsContextType;
}

export function useQRSettings(): QRSettings{
    return useQRContext().current;
}