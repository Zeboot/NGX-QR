import { useState, useContext, createContext } from "react";
import { QRSettings, qrStyle } from "../settings/QRSettings";

type QRSetters = {
    [K in keyof QRSettings as `set${Capitalize<string & K>}`]: (value: QRSettings[K]) => void;
}

type QRSettingsContextType = QRSettings & QRSetters;

const QRContext = createContext<QRSettingsContextType|null>(null);
export function QRContextProvider({children}: React.PropsWithChildren) {
    const [fgColor, setFgColor] = useState("#000000");
    const [logoModifier, setLogoModifier] = useState(0.33);
    const [qrStyle, setQrStyle] = useState<qrStyle>("fluid");
    const contextValue: QRSettingsContextType = {
        fgColor,
        setFgColor,
        logoModifier,
        setLogoModifier,
        qrStyle,
        setQrStyle
      };
    return <QRContext.Provider value={contextValue}>
        {children}
    </QRContext.Provider>
}

export function useQRContext(): QRSettingsContextType{
    return useContext(QRContext) as unknown as QRSettingsContextType;
}

export function useQRSettings(): QRSettings{
    return useContext(QRContext) as unknown as QRSettings;
}