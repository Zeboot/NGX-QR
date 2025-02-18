import { useContext, createContext } from "react";
import { EYE_FORM, QRSettings } from "../settings/QRSettings";
import { useLocalStorage } from "@uidotdev/usehooks";


export type QRSettingsContextType = {current: QRSettings, set: (val: Partial<QRSettings>) => void};

const QRContext = createContext<QRSettingsContextType|null>(null);
export function QRContextProvider({children}: React.PropsWithChildren) {
    const [context, setContext] = useLocalStorage<QRSettings>("qr_settings", {
            fgColor: "#000000",
            logoModifier: 0.3,
            qrStyle: "squares",
            eye_form: EYE_FORM.ROUNDED_SQUARE,
            ecLevel: "H",
            icon: null,
            iconColor: '#0000FF',
            logoOpacity: 1
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