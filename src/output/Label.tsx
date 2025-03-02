import Typography from "@material-tailwind/react/components/Typography";
import { useQRSettings } from "../context/QRContext";
import { LabelSettings } from "../settings/Layout";
import QR from "./QR";

export default function Label({settings, value} : {settings: LabelSettings, value?: string}) {
    const QRContext = useQRSettings();
    return <div className={`${settings.width} ${settings.height} border-1 rounded print:border-0 flex justify-center items-center`}>
            <div className={`${settings.inner_width || settings.width} ${settings.inner_height || settings.height} flex items-center ${settings.vertical ? "flex-col" : "flex-row"} mx-auto ${settings.gap}`}>
                {value && <>
                    <QR value={value} settings={QRContext} size={settings.qr_size}/>
                    <Typography className={`flex-grow ${typeof(settings.text_size) === "function" ? settings.text_size(value) : settings.text_size}`}>{value}</Typography>
                </>}
            </div>
        </div>;

}